const Course = require('../models/Course');
const Student = require('../models/Student');
const Recommendation = require('../models/Recommendation');
const Inscription = require('../models/Inscription');
const QuizAttempt = require('../models/QuizAttempt');

const levelRank = { L1: 1, L2: 2, L3: 3, M1: 4, M2: 5 };
const relatedKeywords = [
    ['javascript', 'react', 'node', 'express', 'typescript', 'rest'],
    ['react', 'typescript', 'javascript', 'html', 'css'],
    ['node', 'express', 'rest', 'docker'],
    ['express', 'rest', 'node', 'docker'],
    ['mongodb', 'node', 'express', 'rest'],
    ['html', 'css', 'javascript', 'react'],
    ['css', 'html', 'react']
];

const normalize = (value = '') => value.toLowerCase();

const isRelated = (currentCourse, candidate) => {
    if (!currentCourse) return false;
    const current = normalize(`${currentCourse.title || ''}`);
    const target = normalize(`${candidate.title || ''}`);
    return relatedKeywords.some(([keyword, ...targets]) => 
        current.includes(keyword) && targets.some((targetKeyword) => target.includes(targetKeyword))
    );
};

const buildCandidate = (student, currentCourse, course) => {
    const studentLevelRank = levelRank[student.level] || 2;
    const courseLevelRank = levelRank[course.level] || 1;

    
    if (studentLevelRank !== courseLevelRank) {
        return null;
    }

    const related = currentCourse ? isRelated(currentCourse, course) : false;
    const compatible = true; 

    const grade = typeof student.grade === 'number' ? student.grade : 10;
    const performance = grade >= 15 ? 20 : grade >= 12 ? 12 : 6;
    
    const score = Math.min(100, (related ? 40 : 10) + 25 + 15 + performance);

    const courseTitle = course.title || 'ce cours';
    const reason = related
        ? `Votre base constitue une bonne opportunité pour suivre ${courseTitle}.`
        : `Le course ${courseTitle} correspond à votre niveau  ${course.level} et compléte votre parcours.`;

    return { course: course._id, score, reason };
};
const generateRecommendations = async (studentId) => {
    const student = await Student.findById(studentId).lean();
    if (!student) {
        const error = new Error('Étudiant introuvable.');
        error.statusCode = 404;
        throw error;
    }

    const attempts = await QuizAttempt.find({ student: studentId }).lean();
    if (attempts && attempts.length > 0) {
        const totalNote = attempts.reduce((acc, curr) => acc + (curr.score || 0), 0);
        student.grade = totalNote / attempts.length; 
    } else {
        student.grade = 10;
    }

    const activeInscription = await Inscription.findOne({ student: studentId }).populate('course').lean();
    if (activeInscription && activeInscription.course) {
        student.course = activeInscription.course;
    }

    const courses = await Course.find({}).sort({ title: 1 }).lean();
    const currentCourseId = student.course?._id ? String(student.course._id) : null;

    const candidates = courses
        .filter((course) => String(course._id) !== currentCourseId)
        .map((course) => buildCandidate(student, student.course, course))
        .filter(Boolean)
        .sort((left, right) => right.score - left.score)
        .slice(0, 5);

    await Recommendation.deleteMany({ student: student._id });
    if (candidates.length) {
        await Recommendation.insertMany(candidates.map((candidate) => ({ ...candidate, student: student._id })));
    }

    return Recommendation.find({ student: student._id })
        .populate('course', 'title description level duration image')
        .sort({ score: -1 })
        .lean();
};

module.exports = { generateRecommendations };