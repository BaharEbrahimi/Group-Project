module.exports = mongoose => {

  var schema = mongoose.Schema(

 

    {

      name: String,

      email: String,

      phone: String,

      date: String,

      time: String,

      service: String,

      comments: String

    },

     

  );

 

  schema.method("toJSON", function() {

    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;

  });

 

  const  Appointments = mongoose.model("appointments", schema);

  return Appointments;

};