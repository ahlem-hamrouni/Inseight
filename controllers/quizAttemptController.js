const QuizAttempt = require("../models/QuizAttempt");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Choice = require("../models/Choice");
const Quiz = require("../models/Quiz");
const Inscription = require("../models/Inscription");

exports.takeQuiz = async (req, res, next) => {
  try {
    const attempt = await QuizAttempt.create({
      student: req.user.id || req.user?._id,
      quiz: req.params.quizId,
      startedAt: new Date(),
    });
    res.status(201).json({ success: true, data: attempt });
  } catch (error) {
    next(error);
  }
};

exports.submitAnswers = async (req, res, next) => {
  try {
    const quizId = req.params.quizId || req.body.quizId;
    const { answers, startedAt } = req.body;

    const validAnswers = Array.isArray(answers)
      ? answers.filter((a) => a.selectedChoiceId || (a.textAnswer && a.textAnswer.trim() !== ""))
      : [];

    if (validAnswers.length === 0) {
      return res.status(200).json({
        success: false,
        isEmpty: true,
        message: "No answers provided. Attempt not created.",
      });
    }

    const studentId = req.user.id || req.user?._id;
    const questionIds = validAnswers.map((a) => a.questionId);
    const selectedChoiceIds = validAnswers.map((a) => a.selectedChoiceId).filter(Boolean);

    const existingAttempts = await QuizAttempt.find({ student: studentId, quiz: quizId }).select("_id");
    if (existingAttempts.length > 0) {
      const existingIds = existingAttempts.map((a) => a._id);
      await Answer.deleteMany({ attempt: { $in: existingIds } });
      await QuizAttempt.deleteMany({ _id: { $in: existingIds } });
    }

    const [currentQuiz, questions, choices] = await Promise.all([
      Quiz.findById(quizId).populate("course"),
      Question.find({ _id: { $in: questionIds } }),
      Choice.find({
        $or: [
          { _id: { $in: selectedChoiceIds } },
          { question: { $in: questionIds }, isCorrect: true }
        ]
      })
    ]);

    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));
    const choiceMap = new Map(choices.map((c) => [c._id.toString(), c]));

    const correctChoiceMap = new Map(
      choices.filter((c) => c.isCorrect).map((c) => [c.question.toString(), c._id.toString()])
    );

    let totalScoreEarned = 0;
    let maxPossibleScore = 0;
    const answersToInsert = [];

    for (const item of validAnswers) {
      const question = questionMap.get(item.questionId?.toString());
      if (!question) continue;

      const qPoints = question.points || 1;
      maxPossibleScore += qPoints;

      let isCorrect = false;
      let pointsEarned = 0;

      if (question.type === "MCQ" || question.type === "TrueFalse") {
        const correctChoiceId = correctChoiceMap.get(question._id.toString());
        if (correctChoiceId && item.selectedChoiceId && correctChoiceId === item.selectedChoiceId.toString()) {
          isCorrect = true;
          pointsEarned = qPoints;
        }
      }

      totalScoreEarned += pointsEarned;

      answersToInsert.push({
        question: question._id,
        selectedChoice: item.selectedChoiceId || null,
        textAnswer: item.textAnswer || "",
        isCorrect,
        pointsEarned,
      });
    }

    const noteOn20 = maxPossibleScore > 0 
      ? Number(((totalScoreEarned / maxPossibleScore) * 20).toFixed(2)) 
      : 0;

    const percentageScore = maxPossibleScore > 0 
      ? Math.round((totalScoreEarned / maxPossibleScore) * 100) 
      : 0;

    const startTime = startedAt ? new Date(startedAt) : new Date();
    const now = new Date();
    const attempt = await QuizAttempt.create({
      student: studentId,
      quiz: quizId,
      startedAt: startTime,
      submittedAt: now,
      score: noteOn20, 
      totalQuestions: validAnswers.length,
      duration: Math.floor((now - startTime) / 1000)
    });

    const finalAnswersToInsert = answersToInsert.map(ans => ({ ...ans, attempt: attempt._id }));
    const insertedAnswers = await Answer.insertMany(finalAnswersToInsert);

    let courseTitle = "";

    if (currentQuiz && currentQuiz.course) {
      const courseId = currentQuiz.course._id || currentQuiz.course;
      courseTitle = currentQuiz.course.title || currentQuiz.course.titre || "";

      if (percentageScore >= 50) {
        await Inscription.findOneAndUpdate(
          { student: studentId, course: courseId },
          { $set: { status: "completed" } },
          { new: true }
        );
      }
    }

    const formattedAnswers = insertedAnswers.map((ans) => ({
      ...ans.toObject(),
      question: questionMap.get(ans.question.toString()) || ans.question,
      selectedChoice: ans.selectedChoice ? choiceMap.get(ans.selectedChoice.toString()) || ans.selectedChoice : null
    }));

    res.status(200).json({
      success: true,
      attempt,
      courseTitle,
      scorePercentage: percentageScore,
      answers: formattedAnswers,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAttemptById = async (req, res, next) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId)
      .populate("quiz")
      .populate("student");

    if (!attempt) return res.status(404).json({ message: "Attempt not found" });

    const answers = await Answer.find({ attempt: attempt._id })
      .populate("question")
      .populate("selectedChoice");

    res.status(200).json({ success: true, attempt, answers });
  } catch (error) {
    next(error);
  }
};

exports.getStudentScoreForCourse = async (req, res, next) => {
  try {
    const studentId = req.user.id || req.user?._id;
    const { courseId } = req.params;

    const courseQuizzes = await Quiz.find({ course: courseId }).select("_id");
    if (courseQuizzes.length === 0) {
      return res.status(200).json({ success: true, score: 0 });
    }

    const quizIds = courseQuizzes.map((q) => q._id);

    const lastAttempt = await QuizAttempt.findOne({
      student: studentId,
      quiz: { $in: quizIds }
    }).sort({ createdAt: -1 });

    const score = lastAttempt ? lastAttempt.score : 0;

    res.status(200).json({ success: true, score });
  } catch (error) {
    next(error);
  }
};