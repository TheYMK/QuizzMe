const axios = require("axios");

module.exports = (app) => {
  app.get("/api/tips/daily-tips/:maxTips", function (req, res) {
    axios
      .get(`http://localhost:8086/tips/daily-tips/${req.params.maxTips}`)
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
