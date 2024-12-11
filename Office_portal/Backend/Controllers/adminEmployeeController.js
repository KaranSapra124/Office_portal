const Employee = require("../Models/Employee");
const { getBucket } = require("../Utils/MongoDbConfig");
const { ObjectId } = require("mongodb");

// Create
exports.createEmployee = async (req, res) => {
  const bucket = getBucket();
  const { aadharCard, panCard, profilePic } = req.files; // Destructure the files from req.files
  let imagesArr = [];

  // Check if the required files are provided
  if (!aadharCard || !panCard || !profilePic) {
    return res.status(400).send({
      message: "All files (Aadhar, PAN, Profile Picture) are required.",
    });
  }

  // Create an array of promises for each file upload
  const uploadPromises = [
    { file: aadharCard[0], type: "Aadhar Card" },
    { file: panCard[0], type: "PAN Card" },
    { file: profilePic[0], type: "Profile Picture" },
  ].map(({ file, type }) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().toISOString() + "_" + file.originalname; // Use a unique filename
      const uploadStream = bucket.openUploadStream(fileName, {
        contentType: file.mimetype,
      });

      uploadStream.on("finish", () => {
        imagesArr.push(uploadStream.id); // Store the uploaded file ID
        resolve(); // Resolve the promise when upload is finished
      });

      uploadStream.on("error", (error) => {
        console.error(`Error uploading ${type}:`, error); // Log the error for debugging
        reject(error); // Reject the promise on error
      });

      // Pipe the file data to the upload stream
      uploadStream.end(file.buffer); // Assuming you're using multer and have the file buffer
    });
  });

  try {
    await Promise.all(uploadPromises); // Wait for all uploads to finish
    const newEmployee = await Employee.create({
      ...req.body,
      employeeDocuments: {
        aadharCard: imagesArr[0], // Aadhar card ID
        panCard: imagesArr[1], // PAN card ID
        employeePic: imagesArr[2], // Profile picture ID
      },
    });
    return res.status(201).send({ message: "Employee Added!", newEmployee });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).send({ message: "Error while adding!" });
  }
};
// Read
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  return res
    .status(200)
    .send({ message: "Employees Fetched!", employees: employees });
};
// Delete
exports.deleteEmployee = async (req, res) => {
  let bucket = getBucket();
  const { id } = req.params;
  const employeeData = await Employee.findById(id);
  //   projectData?.images?.forEach(async (elem) => {
  const Img1 = new ObjectId(employeeData?.employeeDocuments?.aadharCard);
  Img1 && (await bucket.delete(Img1));
  const img2 = new ObjectId(employeeData?.employeeDocuments?.panCard);
  img2 && (await bucket.delete(img2));
  const img3 = new ObjectId(employeeData?.employeeDocuments?.employeePic);
  img3 && (await bucket.delete(img3));

  //   });
  await Employee.findByIdAndDelete(id);
  return res.status(200).send({ messge: "Deleted Successfully!" });
};
// Edit
exports.editEmployee = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const updatedEmployee = await Employee.findByIdAndUpdate(id, { ...req.body });
  console.log(updatedEmployee);
  return res
    .status(200)
    .send({ message: "Employee Updated!", newEmployee: updatedEmployee });
};
