const db = require("../models");

const Roles = db.role

 

exports.allAccess = (req, res) => {
  //res.status(200).send("Public Content.");

  const name = req.query.name;

  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

 

  Roles.find(condition)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving products."

      });

    });

 


};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
