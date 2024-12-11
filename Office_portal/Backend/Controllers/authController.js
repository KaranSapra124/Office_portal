const admin = require("../Models/Admin");
const { hashPassword, verifyPassword } = require("../Utils/bcryptConfig");
const { generateToken } = require("../Utils/jwtConfig");
exports.authAdmin = async (req, res) => {
  if (!req.cookies.adminToken && req.body.email && req.body.password) {
    const { email, password } = req.body;
    const adminData = await admin.findOne({ email: email });
    if (adminData) {
      const isTrue = await verifyPassword(password, adminData?.password);
      // console.log(adminData,'ADMIN')
      const token = generateToken({ id: adminData?._id });
      if (isTrue) {
        return res.status(200).send({
          success: true,
          message: "Logged In Successfully!",
          adminData,
          token,
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "Invalid Credentials!",
        });
      }
    } else {
      const newAdmin = await admin.create({
        ...req.body,
        password: await hashPassword(req.body.password),
      });
      return res
        .status(201)
        .send({ success: true, message: "Admin Created!", newAdmin });
    }
  }
};
