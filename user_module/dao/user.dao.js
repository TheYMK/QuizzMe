const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret.key");

// 1 * 24 * 60 * 60; -> 1 days (in s)
const createToken = (id, expiresIn = 1 * 24 * 60 * 60) => {
  return jwt.sign(
    {
      id,
    },
    secret.key,
    {
      expiresIn,
    }
  );
};

exports.register = async (user) => {
  const userCreated = await User.create(user);
  const userReturn = {
    _id: userCreated._id,
    username: userCreated.username,
    email: userCreated.email,
  };

  return {
    user: userReturn,
    token: createToken(userCreated._id),
  };
};

exports.login = async (user) => {
  let userLogged = await User.login(email, password);

  return {
    user: userLogged,
    token: createToken(user._id),
  };
};

exports.logout = () => {
  return {
    token: createToken("", 1),
  };
};

exports.validateToken = async (token) => {
  const { id } = jwt.verify(token, secret.key);
  const user = await User.findOne(id, { _id: 1 });
  return user;
};
