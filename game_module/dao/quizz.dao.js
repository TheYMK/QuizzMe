const Question = require('../models/question.model');
const Quizz = require('../models/quizz.model');

exports.getAll = async (filters, limit, offset) => {
  const quizz = await Quizz.find({ $and: [filters] })
    .limit(limit)
    .skip(offset);

  return {
    quizz,
  };
};

exports.getById = async (id) => {
  const quizz = await Quizz.findById(id);

  return {
    quizz,
  };
};

exports.getQuizzQuestions = async (id, withAnswer) => {
  const quizz = await Quizz.findById(id);

  let questions;

  if (!withAnswer)
    questions = await Question.find(
      { _id: { $in: quizz.questions } },
      { answer: withAnswer }
    );
  else questions = await Question.find({ _id: { $in: quizz.questions } });

  return {
    questions,
  };
};

exports.getCategories = async () => {
  const categories = await Quizz.distinct('label');

  return {
    categories,
  };
};
