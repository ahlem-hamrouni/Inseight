// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
const app = express();

// Ensure Web Crypto API is available as `globalThis.crypto` for libraries
// that expect the browser-style Web Crypto (some drivers or libs use it).
if (typeof globalThis.crypto === 'undefined') {
  try {
    globalThis.crypto = require('crypto').webcrypto;
  } catch (e) {
    // Minimal fallback for getRandomValues if webcrypto isn't available
    const nodeCrypto = require('crypto');
    globalThis.crypto = {
      getRandomValues: (arr) => {
        const buf = nodeCrypto.randomBytes(arr.length);
        arr.set(buf);
        return arr;
      }
    };
  }
}

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
app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use('/api/chat', require('./routes/chatRoutes'));

app.use(express.json()); 
app.use(cors());         

app.use("/api/auth", require("./routes/authRoutes"));




// Basic health check and root handlers
// Render and other platforms probe an endpoint (often "/") to verify the service is healthy.
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
app.get('/', (req, res) => res.send('Inseight API is running'));

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Serveur lancé sur http://localhost:${PORT}`);
});

