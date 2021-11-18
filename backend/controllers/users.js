const Users = require("../models/users");
// const ObjectID = require("mongodb").ObjectID;

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

dotenv.config();

/**
 * token option untuk digenerate
 *
 * algorithm, algoritma encryption (exp: "HS256", "HS384", "HS512", "PS256", and more)
 * expiresIn, token expired time (exp: "1d", 1 hari)
 *
 */
const sign_token = {
  issuer: "http://localhost:5500",
  algorithm: "HS256",
  audience: "http://localhost:3000",
  expiresIn: "1d",
};

const login = async (req, res) => {
  try {
    const params = req.body;

    const user = await Users.findOne({ username: params.username });

    if (!user) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "username / password tidak sama",
        },
      });
    }

    const compare_password = bcrypt.compareSync(params.password, user.password);

    if (!compare_password) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "username / password tidak sama",
        },
      });
    }

    const userData = {
      namer: user.name,
      nameu: user.username,
      email: user.email,
    };

    // generate token berdasarkan data user dari database
    const token = jwt.sign(userData, process.env.SECRET, sign_token);

    user.set({ token: token });
    user.save();

    return res.status(200).send({
      status: {
        code: 200,
        message: "OK",
      },
      data: {
        user: userData,
        token,
      },
    });
  } catch (err) {
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

const register = async (req, res) => {
  try {
    const params = req.body;

    // cek username, jika exist ditolak
    const duplicated = await Users.findOne({ username: params.username });

    if (duplicated) {
      return res.status(400).send({
        status: {
          code: 400,
          message: "username telah terpakai!",
        },
      });
    }

    // ubah password dengan encrypt
    params.password = await bcrypt.hashSync(req.body.password, 10);
    params.token = params.token
      ? params.token
      : (await "_") + Math.random().toString(36).substr(2, 9) + params.username;

    const data = await Users.create(params);

    return res.status(201).send({
      status: {
        code: 201,
        message: "CREATED",
      },
      data,
    });
  } catch (err) {
    return res.status(400).send({
      status: {
        code: 400,
        message: err.message,
      },
    });
  }
};

module.exports = {
  login,
  register,
};
