const axios = require('axios');
const url = require('url');

module.exports = (app) => {
  app.get('/api/games', function (req, res) {
    if (!req.cookies.jwt) {
      return res
        .status(403)
        .json({ error: { authentification: 'Aucun token fourni' } });
    }

    const params = new url.URLSearchParams({ ...req.query });

    axios
      .post(`http://0.0.0.0:8081/quizz?${params}`, { token: req.cookies.jwt })
      .then(function (reponse) {
        res.status(200).json(reponse.data);
      })
      .catch(function (erreur) {
        res
          .status(erreur?.response?.status ? erreur.response.status : 500)
          .json({
            error: erreur?.response?.data?.error ?? {
              network: 'Une erreur est survenue',
            },
          });
      });
  });

  app.get('/api/games/categories', function (req, res) {
    if (!req.cookies.jwt) {
      return res
        .status(403)
        .json({ error: { authentification: 'Aucun token fourni' } });
    }
    axios
      .post(`http://0.0.0.0:8081/quizz/categories`, {
        token: req.cookies.jwt,
        ...req.body,
      })
      .then(function (reponse) {
        res.status(200).send(reponse.data);
      })
      .catch(function (erreur) {
        res
          .status(erreur?.response?.status ? erreur.response.status : 500)
          .json({
            error: erreur?.response?.data?.error ?? {
              network: 'Une erreur est survenue',
            },
          });
      });
  });

  app.get('/api/games/:gameId', function (req, res) {
    if (!req.cookies.jwt) {
      return res
        .status(403)
        .json({ error: { authentification: 'Aucun token fourni' } });
    }

    const gameId = req.params.gameId;
    const params = new url.URLSearchParams({ ...req.query });

    axios
      .post(`http://0.0.0.0:8081/quizz/${gameId}?${params}`, {
        token: req.cookies.jwt,
      })
      .then(function (reponse) {
        res.status(200).send(reponse.data);
      })
      .catch(function (erreur) {
        res
          .status(erreur?.response?.status ? erreur.response.status : 500)
          .json({
            error: erreur?.response?.data?.error ?? {
              network: 'Une erreur est survenue',
            },
          });
      });
  });

  app.post('/api/games/answer', function (req, res) {
    if (!req.cookies.jwt) {
      return res
        .status(403)
        .json({ error: { authentification: 'Aucun token fourni' } });
    }
    axios
      .post(`http://0.0.0.0:8081/quizz/answer`, {
        token: req.cookies.jwt,
        ...req.body,
      })
      .then(function (reponse) {
        res.status(200).send(reponse.data);
      })
      .catch(function (erreur) {
        res
          .status(erreur?.response?.status ? erreur.response.status : 500)
          .json({
            error: erreur?.response?.data?.error ?? {
              network: 'Une erreur est survenue',
            },
          });
      });
  });
};
