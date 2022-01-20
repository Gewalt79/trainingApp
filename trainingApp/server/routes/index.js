const express = require("express");
const router = express.Router();
const db = require("../models/db.js");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

let auth = function (req, res, next) {
  db.getToken(req.headers.authorization)
    .then((results) => {
      console.log(results);
      console.log("AUTH");

      if (results.length == 0) {
        const err = new Error("Не авторизован!");
        err.status = 401;
        next(err);
      } else {
        console.log("NEXT");
        console.log(next);
        next();
      }
    })
    .catch((err) => {
      next(err);
    });
};

const isValidPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password);
};

router.post("/dashboard", auth, (req, res) => {
  res.json({
    message: "Секретная страница!",
  });
});

router.post("/registration", (req, res, next) => {
  if (req.body.password === req.body.repeatPassword) {
    db.getUser(req.body.username)
      .then((results) => {
        if (results.length == 0) {
          data = {
            username: req.body.username,
            password: bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(10),
              null
            ),
          };
          db.add("users", data)
            .then((results) => {
              res.send({
                message: "Пользователь добавлен: " + req.body.username,
              });
              console.log("Пользователь добавлен в бд: " + req.body.username);
            })
            .catch((err) => {
              next(err);
            });
        } else {
          const err = new Error("Такой пользователь уже есть!");
          err.status = 400;
          next(err);
        }
      })
      .catch((err) => {
        next(err);
        console.log(err);
      });
  } else {
    const err = new Error("Не совпадает пароль и подтверждение пароля!");
    err.status = 400;
    next(err);
  }
});

router.post("/login", (req, res, next) => {
  db.getUser(req.body.username)
    .then((results) => {
      if (isValidPassword(results[0], req.body.password)) {
        data = {};
        data.login = req.body.username;
        data.token = uuidv4();
        db.delete(req.body.username)
          .then((results) => {
            db.add("token", data)
              .then((results) => {
                console.log(results.token);
                console.log("RESULTS.TOKEN");
                res.send({
                  token: results.token,
                  message: "Пользователь успешно авторизован!",
                });
              })
              .catch((err) => {
                next(err);
              });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        const err = new Error("Не верный логин или пароль!");
        err.status = 400;
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
  console.log("user: " + req.body.username + " connected");
});

module.exports = router;
