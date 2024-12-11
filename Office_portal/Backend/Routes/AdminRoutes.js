const {
  createClient,
  getClient,
  editClient,
  deleteClient,
} = require("../Controllers/adminClientControllers");
const {
  createEmployee,
  getEmployees,
  deleteEmployee,
  editEmployee,
} = require("../Controllers/adminEmployeeController");
const {
  createExpense,
  getExpense,
  editExpense,
  deleteExpense,
} = require("../Controllers/adminExpenseController");
const {
  createMilestone,
  editMilestone,
  deleteMilestone,
} = require("../Controllers/adminMilestoneController");
const {
  createPayment,
  getPayments,
  editPayments,
  deletePayment,
} = require("../Controllers/adminPaymentController");
const {
  createProject,
  getProjects,
  getImages,
  editProject,
  deleteProject,
} = require("../Controllers/adminProjectController");
const { authAdmin } = require("../Controllers/authController");
const { adminAuth } = require("../Middlewares/authMiddlewares");
const upload = require("../Utils/multerConfig");
const expressRouter = require("express").Router();

expressRouter.post("/login", adminAuth, authAdmin);
expressRouter.post("/create-client", createClient);
expressRouter.get("/get-clients", getClient);
expressRouter.post("/edit-client/:id", editClient);
expressRouter.post("/delete-client/:id", deleteClient);
// Project
expressRouter.post("/create-project", upload.array("images"), createProject);
expressRouter.get("/get-projects", getProjects);
expressRouter.get("/get-image/:id", getImages);
expressRouter.post("/edit-project/:id", upload.array("images"), editProject);
expressRouter.post("/delete-project/:id", deleteProject);
expressRouter.post("/add-milestone/:id", createMilestone);
expressRouter.post("/edit-milestone/:milestoneId", editMilestone);
expressRouter.post("/delete-milestone/:id/:milestoneId", deleteMilestone);

// Payment
expressRouter.post("/create-payment", createPayment);
expressRouter.get("/get-payments", getPayments);
expressRouter.post("/edit-payment/:id", editPayments);
expressRouter.post("/delete-payment/:id", deletePayment);

// Expense
expressRouter.post("/create-expense", createExpense);
expressRouter.get("/get-expenses", getExpense);
expressRouter.post("/edit-expense/:id", editExpense);
expressRouter.post("/delete-expense/:id", deleteExpense);

// Employees
expressRouter.post(
  "/create-employee",
  upload.fields([
    { name: "aadharCard", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "profilePic", maxCount: 1 },
  ]),
  createEmployee
);
expressRouter.get("/get-employees", getEmployees);
expressRouter.post("/delete-employee/:id", deleteEmployee);
expressRouter.post("/edit-employee/:id", editEmployee);
module.exports = expressRouter;
