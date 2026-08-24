const Course = require("../models/Course");
const Departement = require("../models/Departement");
const Teacher = require("../models/Teacher");
const Inscription = require("../models/Inscription");

exports.getCourses = async (req, res, next) => {
  try {
    const role = req.user?.role;
    const userId = req.user?.id || req.user?._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const rawSearch = req.query.q || req.query.search || req.query.query || "";
    const recherche = rawSearch.trim();
    const niveau = (req.query.niveau || req.query.level || "").trim();

    const query = {};

    if (recherche !== "") {
      query.$or = [
        { title: { $regex: recherche, $options: "i" } },
        { description: { $regex: recherche, $options: "i" } },
        { level: { $regex: recherche, $options: "i" } }
      ];
    }

    if (niveau !== "") {
      query.level = { $regex: niveau, $options: "i" };
    }

    
    const total = await Course.countDocuments(query);

    let coursesQuery = Course.find(query)
      .populate('departement')
      .populate('teacher')
      .skip(skip).limit(limit)
      .sort({ createdAt: -1 });

    
      
    

    const courses = await coursesQuery;

    let enrolledCourseIds = [];
    if (role === 'student' && userId) {
      const myInscriptions = await Inscription.find({ student: userId }).select('course');
      enrolledCourseIds = myInscriptions.map(ins => ins.course ? ins.course.toString() : '');
    }
    const formattedCourses = courses.map(course => {
      const courseObj = course.toObject();
      courseObj.isEnrolled = enrolledCourseIds.includes(course._id.toString());
      return courseObj;
    });

    
    res.status(200).json({ 
      success: true, 
      data: formattedCourses, 
      courses: formattedCourses, 
      total, 
      page,
      pages:  Math.ceil(total / limit) 
    });
  } catch (error) {
    next(error);
  }
};
exports.listerCourses = exports.getCourses;

exports.createCourse = async (req, res, next) => { 
  try { 
    const course = await Course.create({ 
      ...req.body, 
      teacher: req.user._id || req.user.id,
      departement: req.user.departement || req.body.departement,
      ...(req.file && { image: req.file.filename })
    }); 

    res.status(201).json({ success: true, data: course }); 
  } catch (error) { 
    console.error(" ERROR CREATING COURSE:", error);
    next(error); 
  } 
};

exports.updateCourse = async (req, res, next) => { 
  try { 
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.status(200).json({ success: true, data: course }); 
  } catch (error) { next(error); } 
}; 

exports.deleteCourse = async (req, res, next) => { 
  try { 
    await Course.findByIdAndDelete(req.params.id); 
    res.status(200).json({ success: true, message: 'Cours supprimé' }); 
  } catch (error) { next(error); } 
}; 

exports.enrollCourse = async (req, res, next) => { 
  try { 
    const inscription = await Inscription.create({ student: req.user.id, course: req.params.id }); 
    res.status(201).json({ success: true, data: inscription }); 
  } catch (error) { next(error); } 
};