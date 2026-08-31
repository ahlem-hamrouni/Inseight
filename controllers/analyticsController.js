const QuizAttempt = require("../models/QuizAttempt");
const Inscription  = require("../models/Inscription");
const PerformanceMetric = require("../models/PerformanceMetric");
const DashboardData = require("../models/DashboardData");
const Student = require("../models/Student");
const Course = require("../models/Course");
const User = require("../models/User"); 

const filterFromQuery = (query) => {
  const filter = {};
  if (query.department) filter.department = query.department;
  if (query.level) filter.level = query.level;
  if (query.group) filter.group = query.group;
  if (query.isActive !== undefined) filter.isActive = query.isActive === 'true';
  return filter;
};

exports.generateForStudent = async (req, res, next) => {
  try { 
    const studentId = req.user.id; 
    const attempts = await QuizAttempt.find({ student: studentId }); 
    const enrollments = await Inscription.find({ student: studentId }); 
 
    const totalCourses = enrollments.length; 
    const averageScore = attempts.reduce((acc, curr) => acc + curr.score, 0) / 
(attempts.length || 1); 
 
    const dashboard = await DashboardData.findOneAndUpdate( 
      { user: studentId }, 
      { user: studentId, totalCourses, averageScore }, 
      { upsert: true, new: true } 
    ); 
 
    res.status(200).json({ success: true, data: dashboard }); 
  } catch (error) { next(error); } 
};
exports.generateForTeacher = async (req, res, next) => { 
  try { 
    const metrics = await PerformanceMetric.find({ course: req.params.courseId }); 
    res.status(200).json({ success: true, data: metrics }); 
  } catch (error) { next(error); } 
};

exports.generateForAdmin = async (req, res, next) => {
  try {
    const [summary] = await Student.aggregate([
      { $match: filterFromQuery(req.query) },
      { 
        $group: {
          _id: null,
          totalStudents: { $sum: 1 }, 
          activeStudents: { $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] } },
          inactiveStudents: { $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] } }
        }
      },
      {
        $project: {
          _id: 0,
          totalStudents: 1,
          activeStudents: 1,
          inactiveStudents: 1
        }
      }
    ]);

    const [globalScore] = await QuizAttempt.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: "$score" }
        }
      },
      {
        $project: {
          _id: 0,
          averageScore: { $round: ["$averageScore", 2] } 
        }
      }
    ]);

    const totalCourses = await Course.countDocuments();
    const totalUsers = await User.countDocuments();

    
    const studentsCount = await User.countDocuments({ role: "student" });
    const teachersCount = await User.countDocuments({ role: "teacher" });
    const adminsCount = await User.countDocuments({ role: "admin" });

    res.status(200).json({
      success: true,
      data: {
        ...(summary || { totalStudents: 0, activeStudents: 0, inactiveStudents: 0 }),
        totalUsers,
        totalCourses,
        averageScore: globalScore?.averageScore || 0,
        userDistribution: {
          students: studentsCount,
          teachers: teachersCount,
          admins: adminsCount
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getStudentsByLevel = async (req, res, next) => {
  try {
    const data = await Student.aggregate([
      { $match: filterFromQuery(req.query) },
      {
        $group: {
          _id: "$level",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          level: "$_id",
          count: 1
        }
      },
      { $sort: { level: 1 } }
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getStudentsByGroup = async (req, res, next) => {
  try {
    const data = await Student.aggregate([
      { $match: filterFromQuery(req.query) },
      {
        $group: {
          _id: "$group",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          group: "$_id",
          count: 1
        }
      },
      { $sort: { group: 1 } }
    ]);

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

exports.getPlatformGrowth = async (req, res, next) => {
  try {
    const growthData = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const formattedData = growthData.map(item => ({
      month: monthNames[item._id.month - 1],
      count: item.count
    }));

    res.status(200).json({ success: true, data: formattedData });
  } catch (error) {
    next(error);
  }
};