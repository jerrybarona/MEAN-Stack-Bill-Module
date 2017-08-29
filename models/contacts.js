const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// var BillSchema = new mongoose.Schema({
//   date_billed:{
//     type:Date,
//     required:true
//   },
//   description:{
//     type:String,
//     required:true
//   },
//   amount:{
//     type:Number,
//     min:0,
//     required:true
//   },
//   date_payed:{
//     type:Date
//   }
// });
//
// var ContactSchema = mongoose.Schema({
//   first_name:{
//     type: String,
//     required: true
//   },
//   last_name:{
//     type: String,
//     required: true
//   },
//   phone:{
//     type: String,
//     required: true
//   },
//   email:{
//     type: String,
//     required:true
//   },
//   bill_pending:[BillSchema],
//   bill_history:[BillSchema]
// });

var ContactSchema = mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  }
});

ContactSchema.pre('save', function(next) {
  var contact = this;
  bcrypt.hash(contact.phone, null, null, function(err, hash) {
    if (err) {return next(err);}
    contact.phone = hash;
    next();
  });
});



const Contact = module.exports = mongoose.model('Contact', ContactSchema);
