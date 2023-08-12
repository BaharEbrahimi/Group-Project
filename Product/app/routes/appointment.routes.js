module.exports = app => {

  const appointments = require("../controllers/appointment.controller.js");

 

  var router = require("express").Router();

 

  // Create a new Appointment

  router.post("/", appointments.create);

 

  // Retrieve all Appointment

  router.get("/", appointments.findAll);

 

  // Retrieve all published Appointment

 // router.get("/published", appointments.findAllPublished);

 

  // Retrieve a single Appointment with id

  router.get("/:id", appointments.findOne);

 

  // Update an Appointment with id

  router.put("/:id", appointments.update);

 

  // Delete an Appointment with id

  router.delete("/:id", appointments.delete);

 

  // Delete all Appointment

  router.delete("/", appointments.deleteAll);

 

  app.use('/api/appointments', router);

};