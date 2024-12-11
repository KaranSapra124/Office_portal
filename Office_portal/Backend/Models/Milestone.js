const mongoose = require("mongoose");
const milestone = mongoose.Schema({
  milestoneDate: {
    type: String,
    default: null,
  },
  amount: {
    type: String,
    default: null,
  },
  hasGst: {
    type: Boolean,
    default: false,
  },
  gstPercent: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("milestones", milestone);
