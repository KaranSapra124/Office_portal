const mongoose = require("mongoose");

const Project = mongoose.Schema({
  startDate: {
    type: String,
    default: null,
  },
  images: {
    type: [String],
    default: [],
  },
  clientName: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
  },
  projectId: {
    type: String,
  },
  TotalCost: {
    type: String,
    default: null,
  },
  Milestones: {
    type: [mongoose.Types.ObjectId],
    ref: "milestones",
    default: null,
  },
  status: {
    type: String,
    enum: ["Active", "Completed", "In Progress", "Discontinued"],
    default: null,
  },
});

module.exports = mongoose.model("Project", Project);
