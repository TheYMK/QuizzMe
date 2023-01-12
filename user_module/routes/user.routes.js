const { Router } = require('express');
const loggerHandler = require('../configs/logger.handler');
const userRouter = Router();
const userServices = require('../services/user.services');

/* Custom handle errors */
const handleErrors = async (err, remoteAddr = null) => {
  let errors = {};

  if (err.message === 'unknow user') {
    errors.user = 'Utilisateur et/ou mot de passe erronés';
  }

  if (err.code === 11000) {
    err.keyValue.username
      ? (errors.username = "Ce nom d'utilisateur est déjà pris")
      : (errors.email = 'Cette addresse email existe déjà');
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  await loggerHandler({
    message: err.message,
    level: 'error',
    remoteAddr
  });

  return Object.keys(errors).length ? errors : err.message;
};

userRouter.post('/register', async (req, res) => {
  try {
    res.status(200).send(await userServices.register(req.body));
  } catch (err) {
    res.status(500).send({ error: await handleErrors(err, req.body.remoteAddr) });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    res.status(200).send(await userServices.login(req.body));
  } catch (err) {
    res.status(500).send({ error: await handleErrors(err, req.body.remoteAddr) });
  }
});

userRouter.get('/logout', async (req, res) => {
  try {
    res.status(200).send(userServices.logout());
  } catch (err) {
    res.status(500).send({ error: await handleErrors(err) });
  }
});

userRouter.post('/validate', async (req, res) => {
  try {
    res.status(200).send(await userServices.validateToken(req.body));
  } catch (err) {
    res.status(500).send({ error: await handleErrors(err, req.body.remoteAddr) });
  }
});

module.exports = userRouter;
