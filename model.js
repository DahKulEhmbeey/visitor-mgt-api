const mongoose = require("mongoose");

const Visitor = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  company: {
    type: String
  },
  visiting: {
    type: String
  },
  checkedIn: {
    type: Boolean,
    default: true
  },
  check_in_time: {
    type: Date,
    default: new Date()
  },
  check_out_time: {
    type: Date
  }
});

module.exports = mongoose.model('Visitors', Visitor);
