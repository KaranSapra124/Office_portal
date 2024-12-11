const Expense = require("../Models/Expense");

exports.createExpense = async (req, res) => {
  const newExpense = await Expense.create(req.body);
  return res.status(201).send({ message: "New Expense Created!", newExpense });
};
exports.getExpense = async (req, res) => {
  const expenses = await Expense.find();
  return res.status(200).send({ message: "Expenses Loaded!", expenses });
};
exports.editExpense = async (req, res) => {
  const { id } = req.params;
  const updatedExpense = await Expense.findByIdAndUpdate(id, { ...req.body });
  return res
    .status(200)
    .send({ message: "Expense Updated!", expenseData: updatedExpense });
};
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  return res.status(200).send({ message: "Expense Deleted!" });
};
