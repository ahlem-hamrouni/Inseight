// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion BDD
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/departements", require("./routes/departementRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/inscriptions", require("./routes/inscriptionRoutes"));
app.use("/api/modules", require("./routes/moduleRoutes"));
app.use("/api/lessons", require("./routes/lessonRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/choices", require("./routes/choiceRoutes"));
app.use("/api/attempts", require("./routes/quizAttemptRoutes"));
app.use("/api/answers", require("./routes/answerRoutes"));
app.use("/api/metrics", require("./routes/performanceMetricRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));
app.use("/api/logs", require("./routes/auditLogRoutes"));
app.use("/api/dashboards", require("./routes/dashboardRoutes"));

app.use("/uploads", express.static(path.join(path.resolve(), 
"/uploads"))); 
/* Middlewares globaux */
app.use(express.json()); // lire le body JSON
app.use(cors());         // autoriser les requêtes externes

app.use("/api/auth", require("./routes/authRoutes"));




// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});

