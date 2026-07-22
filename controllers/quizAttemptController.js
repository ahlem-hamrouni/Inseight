const QuizAttempt = require("../models/QuizAttempt");
const Answer = require("../models/Answer");
const Question = require ("../models/Question");
const Choice = require ("../models/Choice");

exports.takeQuiz = async (req, res, next) => { 
  try { 
    const attempt = await QuizAttempt.create({ student: req.user.id, quiz: req.params.quizId }); 
    res.status(201).json({ success: true, data: attempt }); 
  } catch (error) { next(error); } 
}; 
 
exports.submitAnswers = async (req, res, next) => { 
  try { 
    const { attemptId } = req.params; 
    const { answers } = req.body; 
 
    const attempt = await QuizAttempt.findById(attemptId); 
    let totalScore = 0; 
 
    for (const item of answers) { 
      const question = await Question.findById(item.questionId); 
      let isCorrect = false; 
      let pointsEarned = 0; 
 
      if (question.type === 'MCQ' || question.type === 'TrueFalse') { 
        const correctChoice = await Choice.findOne({ question: question._id, isCorrect: true }); 
        if (correctChoice && correctChoice._id.toString() === item.selectedChoiceId) { 
          isCorrect = true; 
          pointsEarned = question.points; 
        } 
      } 
 
      totalScore += pointsEarned; 
 
      await Answer.create({ 
        attempt: attempt._id, 
        question: question._id, 
        selectedChoice: item.selectedChoiceId, 
        textAnswer: item.textAnswer, 
        isCorrect, 
        pointsEarned 
      }); 
    } 
 
    attempt.score = totalScore; 
    attempt.submittedAt = new Date(); 
    attempt.duration = Math.floor((attempt.submittedAt - attempt.startedAt) / 1000); 
    await attempt.save(); 
 
    res.status(200).json({ success: true, score: attempt.score }); 
  } catch (error) { next(error); } 
};