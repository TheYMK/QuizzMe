import { NextFunction, Request, Response } from "express";
const axios = require("axios");

exports.verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;

  if (!token)
    return res.status(403).send({
      error: { authentification: "Aucun token fourni" },
    });

  axios
    .post("http://172.20.0.2:8080/users/validate", { token })
    .then((response) => {
      if (response.status === 200) {
        req["userId"] = response.data._id;
        return next();
      }

      return res.status(403).send({
        error: { authentification: "Non autorisé" },
      });
    })
    .catch(() =>
      res.status(403).send({
        error: { authentification: "Non autorisé" },
      })
    );
};
