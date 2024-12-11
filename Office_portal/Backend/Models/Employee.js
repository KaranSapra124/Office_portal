const mongoose = require("mongoose");

const Employee = mongoose.Schema({
  Name: {
    type: String,
    default: null,
  },
  employeeId: {
    type: String,
    default: null,
  },
  Email: {
    type: String,
    default: null,
    unique: true,
  },
  phoneNumber: {
    type: String,
    default: null,
    unqiue: true,
  },
  employeeDocuments: {
    aadharCard: {
      type: String,
      default: null,
    },
    panCard: {
      type: String,
      default: null,
    },
    employeePic: {
      type: String,
      default: null,
    },
  },
  designation: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("employee", Employee);
