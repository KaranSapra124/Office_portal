const Payment = require("../Models/Payment");

exports.createPayment = async (req, res) => {
  const newPayment = await Payment.create(req.body);
  return res
    .status(201)
    .send({ message: "Payment Created Successfully!", newPayment });
};
exports.getPayments = async (req, res) => {
  const payments = await Payment.find().populate(["clientName", "project"]);
  return res
    .status(200)
    .send({ message: "Payment Fetched Successfully!", payments: payments });
};
exports.editPayments = async (req, res) => {
  const { id } = req.params;
  const editedPayment = await Payment.findByIdAndUpdate(id, { ...req.body });
  return res.status(200).send({
    message: "Payment Edited Successfully!",
    editedPayment: editedPayment,
  });
};
exports.deletePayment = async (req, res) => {
  const { id } = req.params;
  await Payment.findByIdAndDelete(id);
  return res.status(200).send({ message: "Payment Deleted Successfully!" });
};
