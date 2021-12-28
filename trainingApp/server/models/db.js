const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://jort:14881488@cluster0.c9q1m.mongodb.net/database_baza?retryWrites=true&w=majority";
const baza = "database_baza";

const CLIENT = new MongoClient(url);

CLIENT.connect(async function (err, client) {
  console.log("Connected correctly to server");
  CLIENT.db(baza).collection("users").insertOne;
});

module.exports.getUser = function (username) {
  return new Promise((resolve, reject) => {
    CLIENT.connect(function (err, client) {
      if (err) {
        reject(err);
      }
      CLIENT.db(baza)
        .collection("users")
        .find({ username: username })
        .toArray(function (err, results) {
          if (err) {
            reject(err);
          }
          CLIENT.close();
          resolve(results);
        });
    });
  });
};

module.exports.getToken = function (token) {
  return new Promise((resolve, reject) => {
    CLIENT.connect(function (err, client) {
      if (err) {
        reject(err);
      }
      CLIENT.db(baza)
        .collection("token")
        .find({ token: token })
        .toArray(function (err, results) {
          if (err) {
            reject(err);
          }
          CLIENT.close();
          console.log("token " + results);
          resolve(results);
        });
    });
  });
};

module.exports.add = function (tabl, data) {
  return new Promise((resolve, reject) => {
    CLIENT.connect(function (err, client) {
      if (err) {
        reject(err);
      }
      CLIENT.db(baza)
        .collection(tabl)
        .insertOne(data, function (err, results) {
          if (err) {
            reject(err);
          }
          CLIENT.close();
          resolve(data);
        });
    });
  });
};

module.exports.delete = function (username) {
  return new Promise((resolve, reject) => {
    //const id = new ObjectID(zadacaId);
    CLIENT.connect(function (err, client) {
      if (err) {
        reject(err);
      }
      CLIENT.db(baza)
        .collection("token")
        .deleteMany({ login: username }, function (err, results) {
          if (err) {
            reject(err);
          }
          CLIENT.close();
          resolve(results);
        });
    });
  });
};
