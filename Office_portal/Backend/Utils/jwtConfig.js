const jwt = require("jsonwebtoken");
const secretKey = "12345";
exports.generateToken = (data) => {
  return jwt.sign(data, secretKey, {
    expiresIn: "7 days",
  });
};
exports.verifyToken = (data) => {
  return jwt.verify(data, secretKey);
};
