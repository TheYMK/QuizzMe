const { Router } = require("express");
const quizzRouter = Router();
const quizzServices = require("../services/quizz.services");
const { verifyToken } = require("../middlewares/auth.middleware");

/* Custom handle errors */
const handleErrors = (err) => {
  let errors = {};

  if (err.message.includes("category validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return Object.keys(errors).length ? errors : { errors: err.message };
};

quizzRouter.post("/", verifyToken, async (req, res) => {
  try {
    res.status(200).send(await quizzServices.getAll(req.query));
  } catch (err) {
    res.status(500).send({ error: handleErrors(err) });
  }
});

quizzRouter.post("/answer", verifyToken, async (req, res) => {
  try {
    res.status(200).send(await quizzServices.getAnswer(req.body, req.userId));
  } catch (err) {
    res.status(500).send({ error: handleErrors(err) });
  }
});

quizzRouter.post("/:quizzId", verifyToken, async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await quizzServices.getOne(req.params.quizzId, req.query.withReponse)
      );
  } catch (err) {
    res.status(500).send({ error: handleErrors(err) });
  }
});

module.exports = quizzRouter;
