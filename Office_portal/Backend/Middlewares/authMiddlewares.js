const admin = require("../Models/Admin");
const { verifyToken } = require("../Utils/jwtConfig");

exports.adminAuth = async (req, res, next) => {
  const { adminToken } = req.cookies;
  console.log(adminToken);
  if (adminToken && adminToken !== undefined) {
    const adminId = verifyToken(adminToken);
    console.log(adminId);
    const { id } = adminId;
    const adminData = await admin.findById(id);
    return res
      .status(200)
      .send({ message: "Logged In Successfully!", adminData });
  } else {
    console.log("I am here");
    next();
  }
};
