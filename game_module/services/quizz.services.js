const ObjectId = require('mongoose').Types.ObjectId;
const quizzDAO = require('../dao/quizz.dao');
const axios = require('axios');

exports.getAll = async (queryFilter) => {
  const { label, difficulty, limit = 50, offset = 0 } = queryFilter;

  if (difficulty && !Number(difficulty))
    throw new Error('Le difficulty doit être un nombre');

  let filters = {
    label: { $regex: label ?? '', $options: 'i' },
  };

  difficulty ? (filters.difficulty = difficulty) : null;

  return await quizzDAO.getAll(filters, Number(limit), Number(offset));
};

exports.getOne = async (id, withAnswer = 0) => {
  if (!id) throw new Error('Le paramètre id du quizz est requis');
  if (!ObjectId.isValid(id)) throw new Error("L'id n'est pas valide");

  return await quizzDAO.getQuizzQuestions(id, Number(withAnswer));
};

exports.getAnswer = async (body, userId) => {
  const { id, userAnswers, token } = body;

  if (!userAnswers) throw new Error('Aucune réponse retournée');
  if (!id) throw new Error('Le id du quizz est requis');

  const questions = await quizzDAO
    .getQuizzQuestions(id, 1)
    .then(({ questions }) => questions);

  if (userAnswers.length !== questions.length)
    throw new Error('Des réponses sont manquantes');

  userQuizzData = userAnswers.map((answer) => {
    if (!answer._id) throw new Error('Le _id du de la question est manquante');
    if (!answer.answer) throw new Error('Une answer est manquante');

    return { _id: new ObjectId(answer._id), answer: answer.answer };
  });

  const goodAnswers = [];
  const badAnswers = [];

  questions.forEach((quizzQuestion) => {
    const question = userQuizzData.find(
      (userQuestion) => String(userQuestion._id) === String(quizzQuestion._id)
    );

    if (question.answer === quizzQuestion.answer)
      return goodAnswers.push(quizzQuestion);

    return badAnswers.push(quizzQuestion);
  });

  const results = {
    goodAnswers: goodAnswers.map((goodAnswer) => goodAnswer._id),
    badAnswers: badAnswers.map((badAnswers) => badAnswers._id),
  };

  const scoreId = await axios
    .post('http://172.20.0.4:8082/scores/', {
      ...results,
      quizzId: id,
      userId,
      token,
    })
    .then((res) => res.data.id);

  return { ...results, scoreId };
};

exports.getCategories = async () => {
  const categories = await quizzDAO.getCategories();

  return categories;
};
