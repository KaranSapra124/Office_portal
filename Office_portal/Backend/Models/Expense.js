const mongoose = require("mongoose");

const expense = mongoose.Schema(
  {
    date: {
      type: String,
      default: null,
    },
    expenseName: {
      type: String,
      default: null,
    },
    expenseAmt: {
      type: String,
      default: null,
    },
    expenseCategory: {
      type: String,
      default: null,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expense);
