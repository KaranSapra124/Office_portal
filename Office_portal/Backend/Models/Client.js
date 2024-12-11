const mongoose = require("mongoose");
const Client = mongoose.Schema(
  {
    clientName: {
      type: String,
      default: null,
    },
    clientPhone: {
      type: Number,
      default: null,
      unique: true,
    },
    alterNatePhone: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      unqiue: true,
    },
    address: {
      type: String,
      default: null,
    },
    gstIn: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", Client);
