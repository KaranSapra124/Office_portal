const client = require("../Models/Client");

exports.createClient = async (req, res) => {
  console.log(req.body);
  const newClient = await client.create({
    clientPhone: Number(req?.body?.clientPhone),
    alterNatePhone: Number(req?.body?.alternatePhone),
    ...req.body,
  });
  return res
    .status(201)
    .send({ message: "Client Added Successfully!", newClient });
};
exports.getClient = async (req, res) => {
  const clients = await client.find();
  return res
    .status(200)
    .send({ message: "Clients Fetched Successfully!", clients });
};
exports.editClient = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const adminData = await client.findByIdAndUpdate(
    id,
    {
      clientPhone: Number(req.body.clientPhone),
      alterNatePhone: Number(req?.body?.alterNatePhone),
      ...req.body,
    },
    { new: true }
  );
  return res.status(200).send({ message: "Updated Successfully!", adminData });
};
exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  await client.findByIdAndDelete(id);
  return res.status(200).send({ message: "Client Deleted Successfully!" });
};
