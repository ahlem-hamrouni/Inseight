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

    const hashedPassword = await bcrypt.hash('123456', 10);

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

    const s1 = await Student.create({ firstName: 'Sami', lastName: 'souissi', email: 'student1@gmail.com', password: hashedPassword, studentCode: 'ETU01', level: 'L1', group: 'BI-1', departement: dept1._id });
    const s2 = await Student.create({ firstName: 'Ahmed', lastName: 'ben mansour', email: 'student2@gmail.com', password: hashedPassword, studentCode: 'ETU02', level: 'L2', group: 'BI-2', departement: dept2._id });
    const s3 = await Student.create({ firstName: 'asma', lastName: 'chaffari', email: 'student3@gmail.com', password: hashedPassword, studentCode: 'ETU03', level: 'L3', group: 'BI-1', departement: dept3._id });
    const s4 = await Student.create({ firstName: 'salwa', lastName: 'jlali', email: 'student4@gmail.com', password: hashedPassword, studentCode: 'ETU04', level: 'M1', group: 'BI-2', departement: dept4._id });
    const s5 = await Student.create({ firstName: 'Kenza', lastName: 'sallemi', email: 'student5@gmail.com', password: hashedPassword, studentCode: 'ETU05', level: 'M2', group: 'BI-1', departement: dept5._id });
    const s6 = await Student.create({ firstName: 'Maram', lastName: 'ben amor', email: 'student6@gmail.com', password: hashedPassword, studentCode: 'ETU06', level: 'L1', group: 'BI-2', departement: dept6._id });
    const s7 = await Student.create({ firstName: 'Fatma', lastName: 'borchani', email: 'student7@gmail.com', password: hashedPassword, studentCode: 'ETU07', level: 'L2', group: 'BI-1', departement: dept7._id });
    const s8 = await Student.create({ firstName: 'Sabri', lastName: 'msaed', email: 'student8@gmail.com', password: hashedPassword, studentCode: 'ETU08', level: 'L3', group: 'BI-2', departement: dept8._id });
    const s9 = await Student.create({ firstName: 'Lina', lastName: 'frikha', email: 'student9@gmail.com', password: hashedPassword, studentCode: 'ETU09', level: 'M1', group: 'BI-1', departement: dept9._id });
    const s10 = await Student.create({ firstName: 'Hadil', lastName: 'ismail', email: 'student10@gmail.com', password: hashedPassword, studentCode: 'ETU10', level: 'M2', group: 'BI-2', departement: dept10._id });

    const c1 = await Course.create({ title: 'Introduction à Express.js', description: 'Découvrir le framework Express', departement: dept1._id, teacher: t1._id, duration: 30, level: 'Débutant' });
    const c2 = await Course.create({ title: 'Les Bases de React', description: 'Comprendre JSX et les composants', departement: dept2._id, teacher: t2._id, duration: 25, level: 'Débutant' });
    const c3 = await Course.create({ title: 'Bases de données MongoDB', description: 'Introduction aux collections et documents', departement: dept3._id, teacher: t3._id, duration: 20, level: 'Débutant' });
    const c4 = await Course.create({ title: 'Bases de Node.js', description: 'Créer un serveur HTTP simple', departement: dept4._id, teacher: t4._id, duration: 40, level: 'Débutant' });
    const c5 = await Course.create({ title: 'Initiation à Java', description: 'Variables, boucles et fonctions en Java', departement: dept5._id, teacher: t5._id, duration: 15, level: 'Débutant' });
    const c6 = await Course.create({ title: 'Bases de PHP', description: 'Scripting côté serveur simple', departement: dept6._id, teacher: t6._id, duration: 10, level: 'Débutant' });
    const c7 = await Course.create({ title: 'Introduction aux APIs REST', description: 'Comprendre les méthodes GET, POST, PUT, DELETE', departement: dept7._id, teacher: t7._id, duration: 35, level: 'Débutant' });
    const c8 = await Course.create({ title: 'Bases de SQL', description: 'Requêtes de sélection SELECT simples', departement: dept8._id, teacher: t8._id, duration: 12, level: 'Débutant' });
    const c9 = await Course.create({ title: 'Introduction à Flutter', description: 'Créer sa première interface mobile', departement: dept9._id, teacher: t9._id, duration: 18, level: 'Débutant' });
    const c10 = await Course.create({ title: 'Bases d\'Angular', description: 'Découvrir les modules et composants Angular', departement: dept10._id, teacher: t10._id, duration: 22, level: 'Débutant' });

    const m1 = await Module.create({ titre: 'Module 1: Installation & Premier Serveur', description: 'Installer Express et lancer le serveur sur le port 5000', order: 1, course: c1._id });
    const m2 = await Module.create({ titre: 'Module 1: Premier Composant React', description: 'Créer un composant fonctionnel simple', order: 1, course: c2._id });
    const m3 = await Module.create({ titre: 'Module 1: Insertion et Lecture de Documents', description: 'Manipuler les données simples dans MongoDB', order: 1, course: c3._id });
    const m4 = await Module.create({ titre: 'Module 1: Les Modules Node.js', description: 'Utiliser require et export', order: 1, course: c4._id });
    const m5 = await Module.create({ titre: 'Module 1: Variables et Types', description: 'Les types de données de base en Java', order: 1, course: c5._id });
    const m6 = await Module.create({ titre: 'Module 1: Syntaxe PHP de base', description: 'Les balises PHP et affichage avec echo', order: 1, course: c6._id });
    const m7 = await Module.create({ titre: 'Module 1: Les verbes HTTP', description: 'Différence entre GET et POST', order: 1, course: c7._id });
    const m8 = await Module.create({ titre: 'Module 1: La commande SELECT', description: 'Filtrer les tables avec WHERE', order: 1, course: c8._id });
    const m9 = await Module.create({ titre: 'Module 1: Le Widget Text', description: 'Afficher du texte dans une application Flutter', order: 1, course: c9._id });
    const m10 = await Module.create({ titre: 'Module 1: Le Data Binding', description: 'Afficher des variables dans la vue Angular', order: 1, course: c10._id });

    const l1 = await Lesson.create({ title: 'Leçon 1: npm init et express()', content: 'On commence par initialiser npm et importer express.', order: 1, module: m1._id });
    const l2 = await Lesson.create({ title: 'Leçon 1: Mon premier JSX', content: 'Le JSX permet d\'écrire du HTML dans le code JS.', order: 1, module: m2._id });
    const l3 = await Lesson.create({ title: 'Leçon 1: insertOne et find', content: 'Utilisation des commandes basiques mongo shell.', order: 1, module: m3._id });
    const l4 = await Lesson.create({ title: 'Leçon 1: Le fichier package.json', content: 'Comprendre les dépendances et scripts Node.', order: 1, module: m4._id });
    const l5 = await Lesson.create({ title: 'Leçon 1: int, String, boolean', content: 'Déclarer des variables simples en Java.', order: 1, module: m5._id });
    const l6 = await Lesson.create({ title: 'Leçon 1: Afficher du texte avec echo', content: 'La fonction echo permet de générer du HTML.', order: 1, module: m6._id });
    const l7 = await Lesson.create({ title: 'Leçon 1: Qu\'est-ce qu\'un Endpoint ?', content: 'Définition d\'une URL d\'accès API.', order: 1, module: m7._id });
    const l8 = await Lesson.create({ title: 'Leçon 1: Ecrire SELECT * FROM table', content: 'Récupérer toutes les données d\'une table SQL.', order: 1, module: m8._id });
    const l9 = await Lesson.create({ title: 'Leçon 1: Découverte de MaterialApp', content: 'La structure de base d\'une app Flutter.', order: 1, module: m9._id });
    const l10 = await Lesson.create({ title: 'Leçon 1: Syntaxe avec les accolades {{}}', content: 'Afficher une variable dans le template.', order: 1, module: m10._id });

    const qz1 = await Quiz.create({ course: c1._id, lesson: l1._id, title: 'Quiz Express.js', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t1._id });
    const qz2 = await Quiz.create({ course: c2._id, lesson: l2._id, title: 'Quiz React 101', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t2._id });
    const qz3 = await Quiz.create({ course: c3._id, lesson: l3._id, title: 'Quiz MongoDB 101', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t3._id });
    const qz4 = await Quiz.create({ course: c4._id, lesson: l4._id, title: 'Quiz Node.js 101', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t4._id });
    const qz5 = await Quiz.create({ course: c5._id, lesson: l5._id, title: 'Quiz Java 101', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t5._id });
    const qz6 = await Quiz.create({ course: c6._id, lesson: l6._id, title: 'Quiz PHP 101', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t6._id });
    const qz7 = await Quiz.create({ course: c7._id, lesson: l7._id, title: 'Quiz API REST 101', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t7._id });
    const qz8 = await Quiz.create({ course: c8._id, lesson: l8._id, title: 'Quiz SQL 101', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t8._id });
    const qz9 = await Quiz.create({ course: c9._id, lesson: l9._id, title: 'Quiz Flutter 101', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t9._id });
    const qz10 = await Quiz.create({ course: c10._id, lesson: l10._id, title: 'Quiz Angular 101', description: 'Test de niveau basique', duration: 10, passingScore: 50, isPublished: true, createdBy: t10._id });

    const qn1_1 = await Question.create({ quiz: qz1._id, statement: 'Quelle méthode Express écoute sur un port donné ?', type: 'MCQ', points: 5, order: 1 });
    const qn1_2 = await Question.create({ quiz: qz1._id, statement: 'Express est un framework pour Node.js.', type: 'TrueFalse', points: 5, order: 2 });
    const qn1_3 = await Question.create({ quiz: qz1._id, statement: 'Quel package est utilisé pour gérer les routes dans Express ?', type: 'ShortAnswer', points: 10, order: 3 });

    const qn2_1 = await Question.create({ quiz: qz2._id, statement: 'Quel hook permet d\'avoir un état local dans un composant ?', type: 'MCQ', points: 5, order: 1 });
    const qn2_2 = await Question.create({ quiz: qz2._id, statement: 'Le JSX est obligatoire pour utiliser React.', type: 'TrueFalse', points: 5, order: 2 });
    const qn2_3 = await Question.create({ quiz: qz2._id, statement: 'Quelle méthode rend un élément React dans le DOM ?', type: 'ShortAnswer', points: 10, order: 3 });

    const qn3_1 = await Question.create({ quiz: qz3._id, statement: 'MongoDB stocke les données sous quel format principal ?', type: 'MCQ', points: 5, order: 1 });
    const qn3_2 = await Question.create({ quiz: qz3._id, statement: 'MongoDB est une base de données relationnelle.', type: 'TrueFalse', points: 5, order: 2 });
    const qn3_3 = await Question.create({ quiz: qz3._id, statement: 'Quelle commande permet de lire tous les documents ?', type: 'ShortAnswer', points: 10, order: 3 });

    const qn4_1 = await Question.create({ quiz: qz4._id, statement: 'Quel est le gestionnaire de paquets par défaut de Node.js ?', type: 'MCQ', points: 5, order: 1 });
    const qn4_2 = await Question.create({ quiz: qz4._id, statement: 'Node.js exécute le code du côté serveur.', type: 'TrueFalse', points: 5, order: 2 });
    const qn4_3 = await Question.create({ quiz: qz4._id, statement: 'Quel objet global permet d\'accéder aux variables d\'environnement ?', type: 'ShortAnswer', points: 10, order: 3 });

    const qn5_1 = await Question.create({ quiz: qz5._id, statement: 'Quel mot-clé est utilisé pour déclarer une classe en Java ?', type: 'MCQ', points: 5, order: 1 });
    const qn5_2 = await Question.create({ quiz: qz5._id, statement: 'Java est un langage compilé et interprété.', type: 'TrueFalse', points: 5, order: 2 });
    const qn5_3 = await Question.create({ quiz: qz5._id, statement: 'Quelle est la méthode principale de point d\'entrée en Java ?', type: 'ShortAnswer', points: 10, order: 3 });

    const qn6_1 = await Question.create({ quiz: qz6._id, statement: 'Par quel symbole commencent les variables en PHP ?', type: 'MCQ', points: 5, order: 1 });
    const qn6_2 = await Question.create({ quiz: qz6._id, statement: 'PHP s\'exécute dans le navigateur du client.', type: 'TrueFalse', points: 5, order: 2 });
    const qn6_3 = await Question.create({ quiz: qz6._id, statement: 'Quelle fonction permet d\'afficher du texte en PHP ?', type: 'ShortAnswer', points: 10, order: 3 });

    const qn7_1 = await Question.create({ quiz: qz7._id, statement: 'Quelle méthode HTTP sert à envoyer de nouvelles données ?', type: 'MCQ', points: 5, order: 1 });
    const qn7_2 = await Question.create({ quiz: qz7._id, statement: 'GET doit modifier les données sur le serveur.', type: 'TrueFalse', points: 5, order: 2 });
    const qn7_3 = await Question.create({ quiz: qz7._id, statement: 'Quel code de statut HTTP indique un succès (OK) ?', type: 'ShortAnswer', points: 10, order: 3 });

    const qn8_1 = await Question.create({ quiz: qz8._id, statement: 'Quel mot-clé SQL permet de récupérer des enregistrements ?', type: 'MCQ', points: 5, order: 1 });
    const qn8_2 = await Question.create({ quiz: qz8._id, statement: 'La clause WHERE permet de filtrer les résultats.', type: 'TrueFalse', points: 5, order: 2 });
    const qn8_3 = await Question.create({ quiz: qz8._id, statement: 'Quel mot-clé permet de supprimer des lignes dans SQL ?', type: 'ShortAnswer', points: 10, order: 3 });

    const qn9_1 = await Question.create({ quiz: qz9._id, statement: 'Quel langage de programmation est utilisé dans Flutter ?', type: 'MCQ', points: 5, order: 1 });
    const qn9_2 = await Question.create({ quiz: qz9._id, statement: 'Tout est Widget dans Flutter.', type: 'TrueFalse', points: 5, order: 2 });
    const qn9_3 = await Question.create({ quiz: qz9._id, statement: 'Quel widget est utilisé pour afficher du texte ?', type: 'ShortAnswer', points: 10, order: 3 });

    const qn10_1 = await Question.create({ quiz: qz10._id, statement: 'Quel langage est principalement utilisé avec Angular ?', type: 'MCQ', points: 5, order: 1 });
    const qn10_2 = await Question.create({ quiz: qz10._id, statement: 'Angular utilise un DOM virtuel comme React.', type: 'TrueFalse', points: 5, order: 2 });
    const qn10_3 = await Question.create({ quiz: qz10._id, statement: 'Quel symbole entoure les variables dans les templates Angular ?', type: 'ShortAnswer', points: 10, order: 3 });

    const ch1_1 = await Choice.create({ question: qn1_1._id, text: 'app.listen()', isCorrect: true, order: 1 });
    const ch1_2 = await Choice.create({ question: qn1_1._id, text: 'app.start()', isCorrect: false, order: 2 });
    const ch1_3 = await Choice.create({ question: qn1_2._id, text: 'Vrai', isCorrect: true, order: 1 });
    const ch1_4 = await Choice.create({ question: qn1_2._id, text: 'Faux', isCorrect: false, order: 2 });

    const ch2_1 = await Choice.create({ question: qn2_1._id, text: 'useState', isCorrect: true, order: 1 });
    const ch2_2 = await Choice.create({ question: qn2_1._id, text: 'useEffect', isCorrect: false, order: 2 });
    const ch2_3 = await Choice.create({ question: qn2_2._id, text: 'Vrai', isCorrect: false, order: 1 });
    const ch2_4 = await Choice.create({ question: qn2_2._id, text: 'Faux', isCorrect: true, order: 2 });

    const ch3_1 = await Choice.create({ question: qn3_1._id, text: 'JSON / BSON', isCorrect: true, order: 1 });
    const ch3_2 = await Choice.create({ question: qn3_1._id, text: 'XML', isCorrect: false, order: 2 });
    const ch3_3 = await Choice.create({ question: qn3_2._id, text: 'Vrai', isCorrect: false, order: 1 });
    const ch3_4 = await Choice.create({ question: qn3_2._id, text: 'Faux', isCorrect: true, order: 2 });

    const ch4_1 = await Choice.create({ question: qn4_1._id, text: 'npm', isCorrect: true, order: 1 });
    const ch4_2 = await Choice.create({ question: qn4_1._id, text: 'pip', isCorrect: false, order: 2 });
    const ch4_3 = await Choice.create({ question: qn4_2._id, text: 'Vrai', isCorrect: true, order: 1 });
    const ch4_4 = await Choice.create({ question: qn4_2._id, text: 'Faux', isCorrect: false, order: 2 });

    const ch5_1 = await Choice.create({ question: qn5_1._id, text: 'class', isCorrect: true, order: 1 });
    const ch5_2 = await Choice.create({ question: qn5_1._id, text: 'struct', isCorrect: false, order: 2 });
    const ch5_3 = await Choice.create({ question: qn5_2._id, text: 'Vrai', isCorrect: true, order: 1 });
    const ch5_4 = await Choice.create({ question: qn5_2._id, text: 'Faux', isCorrect: false, order: 2 });

    const ch6_1 = await Choice.create({ question: qn6_1._id, text: '$ (Dollar)', isCorrect: true, order: 1 });
    const ch6_2 = await Choice.create({ question: qn6_1._id, text: '# (Hashtag)', isCorrect: false, order: 2 });
    const ch6_3 = await Choice.create({ question: qn6_2._id, text: 'Vrai', isCorrect: false, order: 1 });
    const ch6_4 = await Choice.create({ question: qn6_2._id, text: 'Faux', isCorrect: true, order: 2 });

    const ch7_1 = await Choice.create({ question: qn7_1._id, text: 'POST', isCorrect: true, order: 1 });
    const ch7_2 = await Choice.create({ question: qn7_1._id, text: 'GET', isCorrect: false, order: 2 });
    const ch7_3 = await Choice.create({ question: qn7_2._id, text: 'Vrai', isCorrect: false, order: 1 });
    const ch7_4 = await Choice.create({ question: qn7_2._id, text: 'Faux', isCorrect: true, order: 2 });

    const ch8_1 = await Choice.create({ question: qn8_1._id, text: 'SELECT', isCorrect: true, order: 1 });
    const ch8_2 = await Choice.create({ question: qn8_1._id, text: 'UPDATE', isCorrect: false, order: 2 });
    const ch8_3 = await Choice.create({ question: qn8_2._id, text: 'Vrai', isCorrect: true, order: 1 });
    const ch8_4 = await Choice.create({ question: qn8_2._id, text: 'Faux', isCorrect: false, order: 2 });

    const ch9_1 = await Choice.create({ question: qn9_1._id, text: 'Dart', isCorrect: true, order: 1 });
    const ch9_2 = await Choice.create({ question: qn9_1._id, text: 'Kotlin', isCorrect: false, order: 2 });
    const ch9_3 = await Choice.create({ question: qn9_2._id, text: 'Vrai', isCorrect: true, order: 1 });
    const ch9_4 = await Choice.create({ question: qn9_2._id, text: 'Faux', isCorrect: false, order: 2 });

    const ch10_1 = await Choice.create({ question: qn10_1._id, text: 'TypeScript', isCorrect: true, order: 1 });
    const ch10_2 = await Choice.create({ question: qn10_1._id, text: 'Python', isCorrect: false, order: 2 });
    const ch10_3 = await Choice.create({ question: qn10_2._id, text: 'Vrai', isCorrect: false, order: 1 });
    const ch10_4 = await Choice.create({ question: qn10_2._id, text: 'Faux', isCorrect: true, order: 2 });

    await Inscription.create({ student: s1._id, course: c1._id, status: 'completed' });
    await Inscription.create({ student: s2._id, course: c2._id, status: 'completed' });
    await Inscription.create({ student: s3._id, course: c3._id, status: 'completed' });
    await Inscription.create({ student: s4._id, course: c4._id, status: 'completed' });
    await Inscription.create({ student: s5._id, course: c5._id, status: 'completed' });
    await Inscription.create({ student: s6._id, course: c6._id, status: 'completed' });
    await Inscription.create({ student: s7._id, course: c7._id, status: 'completed' });
    await Inscription.create({ student: s8._id, course: c8._id, status: 'completed' });
    await Inscription.create({ student: s9._id, course: c9._id, status: 'completed' });
    await Inscription.create({ student: s10._id, course: c10._id, status: 'completed' });

    const att1 = await QuizAttempt.create({ student: s1._id, quiz: qz1._id, score: 20, totalQuestions: 3, duration: 300 });
    const att2 = await QuizAttempt.create({ student: s2._id, quiz: qz2._id, score: 20, totalQuestions: 3, duration: 300 });
    const att3 = await QuizAttempt.create({ student: s3._id, quiz: qz3._id, score: 20, totalQuestions: 3, duration: 300 });
    const att4 = await QuizAttempt.create({ student: s4._id, quiz: qz4._id, score: 20, totalQuestions: 3, duration: 300 });
    const att5 = await QuizAttempt.create({ student: s5._id, quiz: qz5._id, score: 20, totalQuestions: 3, duration: 300 });
    const att6 = await QuizAttempt.create({ student: s6._id, quiz: qz6._id, score: 20, totalQuestions: 3, duration: 300 });
    const att7 = await QuizAttempt.create({ student: s7._id, quiz: qz7._id, score: 20, totalQuestions: 3, duration: 300 });
    const att8 = await QuizAttempt.create({ student: s8._id, quiz: qz8._id, score: 20, totalQuestions: 3, duration: 300 });
    const att9 = await QuizAttempt.create({ student: s9._id, quiz: qz9._id, score: 20, totalQuestions: 3, duration: 300 });
    const att10 = await QuizAttempt.create({ student: s10._id, quiz: qz10._id, score: 20, totalQuestions: 3, duration: 300 });

    await Answer.create({ attempt: att1._id, question: qn1_1._id, selectedChoice: ch1_1._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att1._id, question: qn1_2._id, selectedChoice: ch1_3._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att1._id, question: qn1_3._id, textAnswer: 'express-router', isCorrect: true, pointsEarned: 10 });

    await Answer.create({ attempt: att2._id, question: qn2_1._id, selectedChoice: ch2_1._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att2._id, question: qn2_2._id, selectedChoice: ch2_4._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att2._id, question: qn2_3._id, textAnswer: 'createRoot', isCorrect: true, pointsEarned: 10});

    await Answer.create({ attempt: att3._id, question: qn3_1._id, selectedChoice: ch3_1._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att3._id, question: qn3_2._id, selectedChoice: ch3_4._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att3._id, question: qn3_3._id, textAnswer: 'find', isCorrect: true, pointsEarned: 10 });

    await Answer.create({ attempt: att4._id, question: qn4_1._id, selectedChoice: ch4_1._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att4._id, question: qn4_2._id, selectedChoice: ch4_3._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att4._id, question: qn4_3._id, textAnswer: 'process.env', isCorrect: true, pointsEarned: 10 });

    await Answer.create({ attempt: att5._id, question: qn5_1._id, selectedChoice: ch5_1._id, isCorrect: true, pointsEarned: 5});
    await Answer.create({ attempt: att5._id, question: qn5_2._id, selectedChoice: ch5_3._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att5._id, question: qn5_3._id, textAnswer: 'main', isCorrect: true, pointsEarned: 10 });

    await Answer.create({ attempt: att6._id, question: qn6_1._id, selectedChoice: ch6_1._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att6._id, question: qn6_2._id, selectedChoice: ch6_4._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att6._id, question: qn6_3._id, textAnswer: 'echo', isCorrect: true, pointsEarned: 10});

    await Answer.create({ attempt: att7._id, question: qn7_1._id, selectedChoice: ch7_1._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att7._id, question: qn7_2._id, selectedChoice: ch7_4._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att7._id, question: qn7_3._id, textAnswer: '200', isCorrect: true, pointsEarned: 10 });

    await Answer.create({ attempt: att8._id, question: qn8_1._id, selectedChoice: ch8_1._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att8._id, question: qn8_2._id, selectedChoice: ch8_3._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att8._id, question: qn8_3._id, textAnswer: 'DELETE', isCorrect: true, pointsEarned: 10});

    await Answer.create({ attempt: att9._id, question: qn9_1._id, selectedChoice: ch9_1._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att9._id, question: qn9_2._id, selectedChoice: ch9_3._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att9._id, question: qn9_3._id, textAnswer: 'Text', isCorrect: true, pointsEarned: 20 });

    await Answer.create({ attempt: att10._id, question: qn10_1._id, selectedChoice: ch10_1._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att10._id, question: qn10_2._id, selectedChoice: ch10_4._id, isCorrect: true, pointsEarned: 5 });
    await Answer.create({ attempt: att10._id, question: qn10_3._id, textAnswer: '{{ }}', isCorrect: true, pointsEarned: 10 });

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