const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const Departement = require('./models/Departement'); 
const User = require('./models/User');
const Admin = require('./models/Admin');
const Teacher = require('./models/Teacher');
const Student = require('./models/Student');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
const Question = require('./models/Question');
const Choice = require('./models/Choice');
const Quiz = require('./models/Quiz');

const Inscription = require('./models/Inscription');
const QuizAttempt = require('./models/QuizAttempt');
const Answer = require('./models/Answer');
const Notification = require('./models/Notification');
const Recommendation = require('./models/Recommendation');
const PerformanceMetric = require('./models/PerformanceMetric');
const DashboardData = require('./models/DashboardData');
const AuditLog = require('./models/AuditLog');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eduinsight';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(' Connecté à MongoDB pour le seeding...');

    // Nettoyage de la base de données
    await Departement.deleteMany({}); 
    await User.deleteMany({});
    await Course.deleteMany({});
    await Module.deleteMany({});
    await Lesson.deleteMany({});
    await Quiz.deleteMany({});
    await Question.deleteMany({});
    await Choice.deleteMany({});
    await Inscription.deleteMany({});
    await QuizAttempt.deleteMany({});
    await Answer.deleteMany({});
    await Notification.deleteMany({});
    await Recommendation.deleteMany({});
    await PerformanceMetric.deleteMany({});
    await DashboardData.deleteMany({});
    await AuditLog.deleteMany({});
    console.log(' Anciennes données supprimées.');

    const hashedPassword = await bcrypt.hash('Password123!', 10);

  
    const dept1 = await Departement.create({ name: 'Département Informatique 1', description: 'Génie Logiciel' });
    const dept2 = await Departement.create({ name: 'Département Informatique 2', description: 'Web Dev' });
    const dept3 = await Departement.create({ name: 'Département Informatique 3', description: 'Data Science' });
    const dept4 = await Departement.create({ name: 'Département Informatique 4', description: 'Réseaux' });
    const dept5 = await Departement.create({ name: 'Département Informatique 5', description: 'Sécurité' });
    const dept6 = await Departement.create({ name: 'Département Informatique 6', description: 'IA' });
    const dept7 = await Departement.create({ name: 'Département Informatique 7', description: 'Cloud' });
    const dept8 = await Departement.create({ name: 'Département Informatique 8', description: 'IoT' });
    const dept9 = await Departement.create({ name: 'Département Informatique 9', description: 'Systèmes' });
    const dept10 = await Departement.create({ name: 'Département Informatique 10', description: 'Mobile' });

    
    const admin1 = await Admin.create({ firstName: 'Admin1', lastName: 'System', email: 'admin1@gmail.com', password: hashedPassword, permissions: ['ALL_PERMISSIONS'] });
    const admin2 = await Admin.create({ firstName: 'Admin2', lastName: 'System', email: 'admin2@gmail.com', password: hashedPassword, permissions: ['ALL_PERMISSIONS'] });

    
    const t1 = await Teacher.create({ firstName: 'Mounir', lastName: 'ben salah', email: 'teacher1@gmail.com', password: hashedPassword, speciality: 'MERN', office: 'B-101', departement: dept1._id });
    const t2 = await Teacher.create({ firstName: 'Sami', lastName: 'jlassi', email: 'teacher2@gmail.com', password: hashedPassword, speciality: 'React', office: 'B-102', departement: dept2._id });
    const t3 = await Teacher.create({ firstName: 'Ahmed', lastName: 'gaddour', email: 'teacher3@gmail.com', password: hashedPassword, speciality: 'Node.js', office: 'B-103', departement: dept3._id });
    const t4 = await Teacher.create({ firstName: 'Saleh', lastName: 'trabelsi', email: 'teacher4@gmail.com', password: hashedPassword, speciality: 'Python', office: 'B-104', departement: dept4._id });
    const t5 = await Teacher.create({ firstName: 'ali', lastName: 'hamrouni', email: 'teacher5@gmail.com', password: hashedPassword, speciality: 'Java', office: 'B-105', departement: dept5._id });
    const t6 = await Teacher.create({ firstName: 'Amer', lastName: 'kallel', email: 'teacher6@gmail.com', password: hashedPassword, speciality: 'PHP', office: 'B-106', departement: dept6._id });
    const t7 = await Teacher.create({ firstName: 'Fadwa', lastName: 'jlali', email: 'teacher7@gmail.com', password: hashedPassword, speciality: 'DevOps', office: 'B-107', departement: dept7._id });
    const t8 = await Teacher.create({ firstName: 'Houda', lastName: 'souii', email: 'teacher8@gmail.com', password: hashedPassword, speciality: 'SQL', office: 'B-108', departement: dept8._id });
    const t9 = await Teacher.create({ firstName: 'Amira', lastName: 'souissi', email: 'teacher9@gmail.com', password: hashedPassword, speciality: 'Flutter', office: 'B-109', departement: dept9._id });
    const t10 = await Teacher.create({ firstName: 'Manel', lastName: 'sallemi', email: 'teacher10@gmail.com', password: hashedPassword, speciality: 'Angular', office: 'B-110', departement: dept10._id });

    
    const s1 = await Student.create({ firstName: 'Sami', lastName: 'souissi', email: 'student1@gmail.com', password: hashedPassword, studentCode: 'ETU01', level: 'L2', group: 'BI-1', departement: dept1._id });
    const s2 = await Student.create({ firstName: 'Ahmed', lastName: 'ben mansour', email: 'student2@gmail.com', password: hashedPassword, studentCode: 'ETU02', level: 'L2', group: 'BI-1', departement: dept2._id });
    const s3 = await Student.create({ firstName: 'asma', lastName: 'chaffari', email: 'student3@gmail.com', password: hashedPassword, studentCode: 'ETU03', level: 'L2', group: 'BI-1', departement: dept3._id });
    const s4 = await Student.create({ firstName: 'salwa', lastName: 'jlali', email: 'student4@gmail.com', password: hashedPassword, studentCode: 'ETU04', level: 'L2', group: 'BI-1', departement: dept4._id });
    const s5 = await Student.create({ firstName: 'Kenza', lastName: 'sallemi', email: 'student5@gmail.com', password: hashedPassword, studentCode: 'ETU05', level: 'L2', group: 'BI-1', departement: dept5._id });
    const s6 = await Student.create({ firstName: 'Maram', lastName: 'ben amor', email: 'student6@gmail.com', password: hashedPassword, studentCode: 'ETU06', level: 'L2', group: 'BI-1', departement: dept6._id });
    const s7 = await Student.create({ firstName: 'Fatma', lastName: 'borchani', email: 'student7@gmail.com', password: hashedPassword, studentCode: 'ETU07', level: 'L2', group: 'BI-1', departement: dept7._id });
    const s8 = await Student.create({ firstName: 'Sabri', lastName: 'msaed', email: 'student8@gmail.com', password: hashedPassword, studentCode: 'ETU08', level: 'L2', group: 'BI-1', departement: dept8._id });
    const s9 = await Student.create({ firstName: 'Lina', lastName: 'frikha', email: 'student9@gmail.com', password: hashedPassword, studentCode: 'ETU09', level: 'L2', group: 'BI-1', departement: dept9._id });
    const s10 = await Student.create({ firstName: 'Hadil', lastName: 'ismail', email: 'student10@gmail.com', password: hashedPassword, studentCode: 'ETU10', level: 'L2', group: 'BI-1', departement: dept10._id });


    const c1 = await Course.create({ title: 'Cours MERN 1', description: 'Intro Express', departement: dept1._id, teacher: t1._id, duration: 30, level: 'Débutant' });
    const c2 = await Course.create({ title: 'Cours MERN 2', description: 'React Basics', departement: dept2._id, teacher: t2._id, duration: 25, level: 'Intermédiaire' });
    const c3 = await Course.create({ title: 'Cours MERN 3', description: 'MongoDB Intro', departement: dept3._id, teacher: t3._id, duration: 20, level: 'Débutant' });
    const c4 = await Course.create({ title: 'Cours MERN 4', description: 'NodeJS Advanced', departement: dept4._id, teacher: t4._id, duration: 40, level: 'Avancé' });
    const c5 = await Course.create({ title: 'Cours MERN 5', description: 'Redux Toolkit', departement: dept5._id, teacher: t5._id, duration: 15, level: 'Intermédiaire' });
    const c6 = await Course.create({ title: 'Cours MERN 6', description: 'JWT Auth', departement: dept6._id, teacher: t6._id, duration: 10, level: 'Avancé' });
    const c7 = await Course.create({ title: 'Cours MERN 7', description: 'REST APIs', departement: dept7._id, teacher: t7._id, duration: 35, level: 'Débutant' });
    const c8 = await Course.create({ title: 'Cours MERN 8', description: 'Deployment', departement: dept8._id, teacher: t8._id, duration: 12, level: 'Intermédiaire' });
    const c9 = await Course.create({ title: 'Cours MERN 9', description: 'Testing Jest', departement: dept9._id, teacher: t9._id, duration: 18, level: 'Avancé' });
    const c10 = await Course.create({ title: 'Cours MERN 10', description: 'Docker Express', departement: dept10._id, teacher: t10._id, duration: 22, level: 'Avancé' });

    
    const m1 = await Module.create({ titre: 'Module 1', description: 'Bases', order: 1, course: c1._id });
    const m2 = await Module.create({ titre: 'Module 2', description: 'Bases', order: 1, course: c2._id });
    const m3 = await Module.create({ titre: 'Module 3', description: 'Bases', order: 1, course: c3._id });
    const m4 = await Module.create({ titre: 'Module 4', description: 'Bases', order: 1, course: c4._id });
    const m5 = await Module.create({ titre: 'Module 5', description: 'Bases', order: 1, course: c5._id });
    const m6 = await Module.create({ titre: 'Module 6', description: 'Bases', order: 1, course: c6._id });
    const m7 = await Module.create({ titre: 'Module 7', description: 'Bases', order: 1, course: c7._id });
    const m8 = await Module.create({ titre: 'Module 8', description: 'Bases', order: 1, course: c8._id });
    const m9 = await Module.create({ titre: 'Module 9', description: 'Bases', order: 1, course: c9._id });
    const m10 = await Module.create({ titre: 'Module 10', description: 'Bases', order: 1, course: c10._id });

    
    await Lesson.create({ title: 'Leçon 1', content: 'Intro 1', order: 1, module: m1._id });
    await Lesson.create({ title: 'Leçon 2', content: 'Intro 2', order: 1, module: m2._id });
    await Lesson.create({ title: 'Leçon 3', content: 'Intro 3', order: 1, module: m3._id });
    await Lesson.create({ title: 'Leçon 4', content: 'Intro 4', order: 1, module: m4._id });
    await Lesson.create({ title: 'Leçon 5', content: 'Intro 5', order: 1, module: m5._id });
    await Lesson.create({ title: 'Leçon 6', content: 'Intro 6', order: 1, module: m6._id });
    await Lesson.create({ title: 'Leçon 7', content: 'Intro 7', order: 1, module: m7._id });
    await Lesson.create({ title: 'Leçon 8', content: 'Intro 8', order: 1, module: m8._id });
    await Lesson.create({ title: 'Leçon 9', content: 'Intro 9', order: 1, module: m9._id });
    await Lesson.create({ title: 'Leçon 10', content: 'Intro 10', order: 1, module: m10._id });

    
    const qz1 = await Quiz.create({ course: c1._id, title: 'Quiz 1', description: 'Test 1', duration: 10, passingScore: 50, isPublished: true, createdBy: t1._id });
    const qz2 = await Quiz.create({ course: c2._id, title: 'Quiz 2', description: 'Test 2', duration: 10, passingScore: 50, isPublished: true, createdBy: t2._id });
    const qz3 = await Quiz.create({ course: c3._id, title: 'Quiz 3', description: 'Test 3', duration: 10, passingScore: 50, isPublished: true, createdBy: t3._id });
    const qz4 = await Quiz.create({ course: c4._id, title: 'Quiz 4', description: 'Test 4', duration: 10, passingScore: 50, isPublished: true, createdBy: t4._id });
    const qz5 = await Quiz.create({ course: c5._id, title: 'Quiz 5', description: 'Test 5', duration: 10, passingScore: 50, isPublished: true, createdBy: t5._id });
    const qz6 = await Quiz.create({ course: c6._id, title: 'Quiz 6', description: 'Test 6', duration: 10, passingScore: 50, isPublished: true, createdBy: t6._id });
    const qz7 = await Quiz.create({ course: c7._id, title: 'Quiz 7', description: 'Test 7', duration: 10, passingScore: 50, isPublished: true, createdBy: t7._id });
    const qz8 = await Quiz.create({ course: c8._id, title: 'Quiz 8', description: 'Test 8', duration: 10, passingScore: 50, isPublished: true, createdBy: t8._id });
    const qz9 = await Quiz.create({ course: c9._id, title: 'Quiz 9', description: 'Test 9', duration: 10, passingScore: 50, isPublished: true, createdBy: t9._id });
    const qz10 = await Quiz.create({ course: c10._id, title: 'Quiz 10', description: 'Test 10', duration: 10, passingScore: 50, isPublished: true, createdBy: t10._id });

   
    const qn1 = await Question.create({ quiz: qz1._id, statement: 'Question 1?', type: 'MCQ', points: 2, order: 1 });
    const qn2 = await Question.create({ quiz: qz2._id, statement: 'Question 2?', type: 'MCQ', points: 2, order: 1 });
    const qn3 = await Question.create({ quiz: qz3._id, statement: 'Question 3?', type: 'MCQ', points: 2, order: 1 });
    const qn4 = await Question.create({ quiz: qz4._id, statement: 'Question 4?', type: 'MCQ', points: 2, order: 1 });
    const qn5 = await Question.create({ quiz: qz5._id, statement: 'Question 5?', type: 'MCQ', points: 2, order: 1 });
    const qn6 = await Question.create({ quiz: qz6._id, statement: 'Question 6?', type: 'MCQ', points: 2, order: 1 });
    const qn7 = await Question.create({ quiz: qz7._id, statement: 'Question 7?', type: 'MCQ', points: 2, order: 1 });
    const qn8 = await Question.create({ quiz: qz8._id, statement: 'Question 8?', type: 'MCQ', points: 2, order: 1 });
    const qn9 = await Question.create({ quiz: qz9._id, statement: 'Question 9?', type: 'MCQ', points: 2, order: 1 });
    const qn10 = await Question.create({ quiz: qz10._id, statement: 'Question 10?', type: 'MCQ', points: 2, order: 1 });

   
    const ch1 = await Choice.create({ question: qn1._id, text: 'Vrai 1', isCorrect: true, order: 1 });
    const ch2 = await Choice.create({ question: qn2._id, text: 'Vrai 2', isCorrect: true, order: 1 });
    const ch3 = await Choice.create({ question: qn3._id, text: 'Vrai 3', isCorrect: true, order: 1 });
    const ch4 = await Choice.create({ question: qn4._id, text: 'Vrai 4', isCorrect: true, order: 1 });
    const ch5 = await Choice.create({ question: qn5._id, text: 'Vrai 5', isCorrect: true, order: 1 });
    const ch6 = await Choice.create({ question: qn6._id, text: 'Vrai 6', isCorrect: true, order: 1 });
    const ch7 = await Choice.create({ question: qn7._id, text: 'Vrai 7', isCorrect: true, order: 1 });
    const ch8 = await Choice.create({ question: qn8._id, text: 'Vrai 8', isCorrect: true, order: 1 });
    const ch9 = await Choice.create({ question: qn9._id, text: 'Vrai 9', isCorrect: true, order: 1 });
    const ch10 = await Choice.create({ question: qn10._id, text: 'Vrai 10', isCorrect: true, order: 1 });

    
    await Inscription.create({ student: s1._id, course: c1._id, status: 'active' });
    await Inscription.create({ student: s2._id, course: c2._id, status: 'active' });
    await Inscription.create({ student: s3._id, course: c3._id, status: 'active' });
    await Inscription.create({ student: s4._id, course: c4._id, status: 'active' });
    await Inscription.create({ student: s5._id, course: c5._id, status: 'active' });
    await Inscription.create({ student: s6._id, course: c6._id, status: 'active' });
    await Inscription.create({ student: s7._id, course: c7._id, status: 'active' });
    await Inscription.create({ student: s8._id, course: c8._id, status: 'active' });
    await Inscription.create({ student: s9._id, course: c9._id, status: 'active' });
    await Inscription.create({ student: s10._id, course: c10._id, status: 'active' });

    
    const att1 = await QuizAttempt.create({ student: s1._id, quiz: qz1._id, score: 80, totalQuestions: 1, duration: 300 });
    const att2 = await QuizAttempt.create({ student: s2._id, quiz: qz2._id, score: 90, totalQuestions: 1, duration: 300 });
    const att3 = await QuizAttempt.create({ student: s3._id, quiz: qz3._id, score: 70, totalQuestions: 1, duration: 300 });
    const att4 = await QuizAttempt.create({ student: s4._id, quiz: qz4._id, score: 85, totalQuestions: 1, duration: 300 });
    const att5 = await QuizAttempt.create({ student: s5._id, quiz: qz5._id, score: 60, totalQuestions: 1, duration: 300 });
    const att6 = await QuizAttempt.create({ student: s6._id, quiz: qz6._id, score: 95, totalQuestions: 1, duration: 300 });
    const att7 = await QuizAttempt.create({ student: s7._id, quiz: qz7._id, score: 75, totalQuestions: 1, duration: 300 });
    const att8 = await QuizAttempt.create({ student: s8._id, quiz: qz8._id, score: 80, totalQuestions: 1, duration: 300 });
    const att9 = await QuizAttempt.create({ student: s9._id, quiz: qz9._id, score: 88, totalQuestions: 1, duration: 300 });
    const att10 = await QuizAttempt.create({ student: s10._id, quiz: qz10._id, score: 92, totalQuestions: 1, duration: 300 });

    await Answer.create({ attempt: att1._id, question: qn1._id, selectedChoice: ch1._id, isCorrect: true, pointsEarned: 2 });
    await Answer.create({ attempt: att2._id, question: qn2._id, selectedChoice: ch2._id, isCorrect: true, pointsEarned: 2 });
    await Answer.create({ attempt: att3._id, question: qn3._id, selectedChoice: ch3._id, isCorrect: true, pointsEarned: 2 });
    await Answer.create({ attempt: att4._id, question: qn4._id, selectedChoice: ch4._id, isCorrect: true, pointsEarned: 2 });
    await Answer.create({ attempt: att5._id, question: qn5._id, selectedChoice: ch5._id, isCorrect: true, pointsEarned: 2 });
    await Answer.create({ attempt: att6._id, question: qn6._id, selectedChoice: ch6._id, isCorrect: true, pointsEarned: 2 });
    await Answer.create({ attempt: att7._id, question: qn7._id, selectedChoice: ch7._id, isCorrect: true, pointsEarned: 2 });
    await Answer.create({ attempt: att8._id, question: qn8._id, selectedChoice: ch8._id, isCorrect: true, pointsEarned: 2 });
    await Answer.create({ attempt: att9._id, question: qn9._id, selectedChoice: ch9._id, isCorrect: true, pointsEarned: 2 });
    await Answer.create({ attempt: att10._id, question: qn10._id, selectedChoice: ch10._id, isCorrect: true, pointsEarned: 2 });

    
    await Notification.create({ user: s1._id, title: 'Notif 1', message: 'Bienvenue', type: 'INFO', isRead: false });
    await Notification.create({ user: s2._id, title: 'Notif 2', message: 'Bienvenue', type: 'INFO', isRead: false });
    await Notification.create({ user: s3._id, title: 'Notif 3', message: 'Bienvenue', type: 'INFO', isRead: false });
    await Notification.create({ user: s4._id, title: 'Notif 4', message: 'Bienvenue', type: 'INFO', isRead: false });
    await Notification.create({ user: s5._id, title: 'Notif 5', message: 'Bienvenue', type: 'INFO', isRead: false });
    await Notification.create({ user: s6._id, title: 'Notif 6', message: 'Bienvenue', type: 'INFO', isRead: false });
    await Notification.create({ user: s7._id, title: 'Notif 7', message: 'Bienvenue', type: 'INFO', isRead: false });
    await Notification.create({ user: s8._id, title: 'Notif 8', message: 'Bienvenue', type: 'INFO', isRead: false });
    await Notification.create({ user: s9._id, title: 'Notif 9', message: 'Bienvenue', type: 'INFO', isRead: false });
    await Notification.create({ user: s10._id, title: 'Notif 10', message: 'Bienvenue', type: 'INFO', isRead: false });

    await Recommendation.create({ student: s1._id, message: 'Rec 1', type: 'COURSE', confidenceScore: 0.9 });
    await Recommendation.create({ student: s2._id, message: 'Rec 2', type: 'COURSE', confidenceScore: 0.9 });
    await Recommendation.create({ student: s3._id, message: 'Rec 3', type: 'COURSE', confidenceScore: 0.9 });
    await Recommendation.create({ student: s4._id, message: 'Rec 4', type: 'COURSE', confidenceScore: 0.9 });
    await Recommendation.create({ student: s5._id, message: 'Rec 5', type: 'COURSE', confidenceScore: 0.9 });
    await Recommendation.create({ student: s6._id, message: 'Rec 6', type: 'COURSE', confidenceScore: 0.9 });
    await Recommendation.create({ student: s7._id, message: 'Rec 7', type: 'COURSE', confidenceScore: 0.9 });
    await Recommendation.create({ student: s8._id, message: 'Rec 8', type: 'COURSE', confidenceScore: 0.9 });
    await Recommendation.create({ student: s9._id, message: 'Rec 9', type: 'COURSE', confidenceScore: 0.9 });
    await Recommendation.create({ student: s10._id, message: 'Rec 10', type: 'COURSE', confidenceScore: 0.9 });

    await PerformanceMetric.create({ student: s1._id, course: c1._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });
    await PerformanceMetric.create({ student: s2._id, course: c2._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });
    await PerformanceMetric.create({ student: s3._id, course: c3._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });
    await PerformanceMetric.create({ student: s4._id, course: c4._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });
    await PerformanceMetric.create({ student: s5._id, course: c5._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });
    await PerformanceMetric.create({ student: s6._id, course: c6._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });
    await PerformanceMetric.create({ student: s7._id, course: c7._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });
    await PerformanceMetric.create({ student: s8._id, course: c8._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });
    await PerformanceMetric.create({ student: s9._id, course: c9._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });
    await PerformanceMetric.create({ student: s10._id, course: c10._id, weekName: 'S1', quizScoreAverage: 80, attendanceRate: 90 });

    await DashboardData.create({ user: s1._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 1 });
    await DashboardData.create({ user: s2._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 2 });
    await DashboardData.create({ user: s3._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 3 });
    await DashboardData.create({ user: s4._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 4 });
    await DashboardData.create({ user: s5._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 5 });
    await DashboardData.create({ user: s6._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 6 });
    await DashboardData.create({ user: s7._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 7 });
    await DashboardData.create({ user: s8._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 8 });
    await DashboardData.create({ user: s9._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 9 });
    await DashboardData.create({ user: s10._id, totalCourses: 1, averageScore: 80, attendanceRate: 90, progress: 50, rank: 10 });

    await AuditLog.create({ user: admin1._id, action: 'SEED', entity: 'DB', entityId: c1._id, ipAddress: '127.0.0.1' });
    await AuditLog.create({ user: admin1._id, action: 'SEED', entity: 'DB', entityId: c2._id, ipAddress: '127.0.0.1' });
    await AuditLog.create({ user: admin1._id, action: 'SEED', entity: 'DB', entityId: c3._id, ipAddress: '127.0.0.1' });
    await AuditLog.create({ user: admin1._id, action: 'SEED', entity: 'DB', entityId: c4._id, ipAddress: '127.0.0.1' });
    await AuditLog.create({ user: admin1._id, action: 'SEED', entity: 'DB', entityId: c5._id, ipAddress: '127.0.0.1' });
    await AuditLog.create({ user: admin2._id, action: 'SEED', entity: 'DB', entityId: c6._id, ipAddress: '127.0.0.1' });
    await AuditLog.create({ user: admin2._id, action: 'SEED', entity: 'DB', entityId: c7._id, ipAddress: '127.0.0.1' });
    await AuditLog.create({ user: admin2._id, action: 'SEED', entity: 'DB', entityId: c8._id, ipAddress: '127.0.0.1' });
    await AuditLog.create({ user: admin2._id, action: 'SEED', entity: 'DB', entityId: c9._id, ipAddress: '127.0.0.1' });
    await AuditLog.create({ user: admin2._id, action: 'SEED', entity: 'DB', entityId: c10._id, ipAddress: '127.0.0.1' });

    console.log(' Seeding Direct terminé avec succès !');
    process.exit(0);

  } catch (error) {
    console.error(' Erreur durant le seeding :', error);
    process.exit(1);
  }
};

seedDatabase();