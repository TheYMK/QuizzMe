const axios = require("axios");

module.exports = (app) => {
  app.get("/api/scores/", function (req, res) {
    if (!req.cookies.jwt) {
      return res
        .status(403)
        .json({ error: { authentification: "Aucun token fourni" } });
    }

    axios
      .post(`http://localhost:8082/scores/history`, {
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
              network: "Une erreur est survenue",
            },
          });
      });
  });

  app.get("/api/scores/:id", function (req, res) {
    if (!req.cookies.jwt) {
      return res
        .status(403)
        .json({ error: { authentification: "Aucun token fourni" } });
    }

    const scoreId = req.params.id;

    axios
      .post(`http://localhost:8082/scores/${scoreId}`, {
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
              network: "Une erreur est survenue",
            },
          });
      });
  });
};
