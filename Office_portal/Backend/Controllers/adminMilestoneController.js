const milestone = require("../Models/Milestone");
const Project = require("../Models/Project");
exports.createMilestone = async (req, res) => {
  const { id } = req.params;
  const newMilestone = await milestone.create(req.body);
  const project = await Project.findById(id);

  if (project?.Milestones) {
    project?.Milestones?.push(newMilestone._id);
  } else {
    let arr = [];
    arr.push(newMilestone?._id);
    project.Milestones = arr;
  }
  await project.save();
  return res.status(200).send({ message: "Milestone Added" });
};
exports.editMilestone = async (req, res) => {
  const { milestoneId } = req.params;
  const updateMilestone = await milestone.findByIdAndUpdate(
    milestoneId,
    {
      ...req.body,
    },
    { new: true }
  );
  return res
    .status(200)
    .send({ message: "Milestone Updated", updatedData: updateMilestone });
};
exports.deleteMilestone = async (req, res) => {
  const { id, milestoneId } = req.params;
  await milestone.findByIdAndDelete(milestoneId);
  const linkedProject = await Project.findById(id);
  linkedProject.Milestones = linkedProject?.Milestones?.filter(
    (elem) => elem !== milestoneId
  );
  await linkedProject.save();
  return res.status(200).send({ message: "Milestone Deleted!" });
};
