const mongoose = require("mongoose");

const payment = mongoose.Schema(
  {
    clientName: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
    },
    transactionId: {
      type: String,
      default: null,
    },
    amount: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", payment);
