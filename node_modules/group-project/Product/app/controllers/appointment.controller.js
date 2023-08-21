const db = require("../models");

const Appointments = db.appointments;

 

// Create and Save a new Appointment

exports.create = (req, res) => {

  // Validate request

  if (!req.body.name) {

    res.status(400).send({ message: "Content can not be empty!" });

    return;

  }

 

  // Create a Appointment

  const appointments = new Appointments({

    name: req.body.name,

      email: req.body.email,

      phone: req.body.phone,

      date: req.body.date,

      time: req.body.time,

      service: req.body.service,
      
      comments: req.body.comments,

  });

 

  // Save Appointment in the database

  Appointments

    .create(appointments)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while creating the Appointment."

      });

    });

};

 

 

// Retrieve all Appointments from the database.

exports.findAll = (req, res) => {

   const name = req.query.name;

  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

 

  Appointments.find(condition)

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving appointments."

      });

    });

 

};

 

// Find a single Appointment with an id

exports.findOne = (req, res) => {

  const id = req.params.id;

 

  Appointments.findById(id)

    .then(data => {

      if (!data)

        res.status(404).send({ message: "Not found Appointment with id " + id });

      else res.send(data);

    })

    .catch(err => {

      res

        .status(500)

        .send({ message: "Error retrieving Appointment with id=" + id });

    });

 

};

 

// Update a Appointment by the id in the request

exports.update = (req, res) => {

  if (!req.body) {

    return res.status(400).send({

      message: "Data to update can not be empty!"

    });

  }

 

  const id = req.params.id;

 

  Appointments.findByIdAndUpdate(id, req.body, { useFindAndModify: false })

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found!`

        });

      } else res.send({ message: "Appointment was updated successfully." });

    })

    .catch(err => {

      res.status(500).send({

        message: "Error updating Appointment with id=" + id

      });

    });

 

};

 

// Delete a Appointment with the specified id in the request

exports.delete = (req, res) => {

  const id = req.params.id;

 

  Appointments.findByIdAndRemove(id)

    .then(data => {

      if (!data) {

        res.status(404).send({

          message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`

        });

      } else {

        res.send({

          message: "Appointment was deleted successfully!"

        });

      }

    })

    .catch(err => {

      res.status(500).send({

        message: "Could not delete Appointment with id=" + id

      });

    });

};

 

// Delete all Appointment from the database.

exports.deleteAll = (req, res) => {

  Appointments.deleteMany({})

    .then(data => {

      res.send({

        message: `${data.deletedCount} Appointment were deleted successfully!`

      });

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while removing all appointment."

      });

    });

 

};

 

// Find all published Appointment
/*
exports.findAllPublished = (req, res) => {

  Appointments.find({ published: true })

    .then(data => {

      res.send(data);

    })

    .catch(err => {

      res.status(500).send({

        message:

          err.message || "Some error occurred while retrieving appointment."

      });

    });

 

};*/