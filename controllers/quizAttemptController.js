const QuizAttempt = require("../models/QuizAttempt");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Choice = require("../models/Choice");

exports.takeQuiz = async (req, res, next) => { 
  try { 
    const attempt = await QuizAttempt.create({ 
      student: req.user.id || req.user?._id, 
      quiz: req.params.quizId,
      startedAt: new Date()
    }); 
    res.status(201).json({ success: true, data: attempt }); 
  } catch (error) { next(error); } 
}; 

exports.submitAnswers = async (req, res, next) => { 
  try { 
    const { attemptId } = req.params; 
    const { answers } = req.body; 

    const attempt = await QuizAttempt.findById(attemptId); 
    if (!attempt) return res.status(404).json({ message: "Attempt non trouvée" });

    let totalScore = 0; 
    const createdAnswers = [];

    for (const item of answers) { 
      const question = await Question.findById(item.questionId); 
      if (!question) continue;

      let isCorrect = false; 
      let pointsEarned = 0; 

      if (question.type === 'MCQ' || question.type === 'TrueFalse') { 
        const correctChoice = await Choice.findOne({ question: question._id, isCorrect: true }); 
        if (correctChoice && item.selectedChoiceId && correctChoice._id.toString() === item.selectedChoiceId.toString()) { 
          isCorrect = true; 
          pointsEarned = question.points || 0; 
        } 
      } 

      totalScore += pointsEarned; 

      const newAns = await Answer.create({ 
        attempt: attempt._id, 
        question: question._id, 
        selectedChoice: item.selectedChoiceId || null, 
        textAnswer: item.textAnswer || "", 
        isCorrect, 
        pointsEarned 
      }); 

      createdAnswers.push(newAns);
    } 

    attempt.score = totalScore; 
    attempt.totalQuestions = answers.length;
    attempt.submittedAt = new Date(); 
    attempt.duration = Math.floor((attempt.submittedAt - attempt.startedAt) / 1000); 
    await attempt.save(); 

    // Trejje3 el-attempt m3a les answers populate pour l'affichage direct!
    const fullAnswers = await Answer.find({ attempt: attempt._id })
      .populate("question")
      .populate("selectedChoice");

    res.status(200).json({ 
      success: true, 
      attempt,
      answers: fullAnswers
    }); 
  } catch (error) { next(error); } 
};

// Fonction jdida: Consultation mte3 resultats 9dima
exports.getAttemptById = async (req, res, next) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId)
      .populate("quiz")
      .populate("student");

    if (!attempt) return res.status(404).json({ message: "Attempt non trouvée" });

    const answers = await Answer.find({ attempt: attempt._id })
      .populate("question")
      .populate("selectedChoice");

    res.status(200).json({ success: true, attempt, answers });
  } catch (error) { next(error); }
};