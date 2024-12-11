// const Project = require("../Models/Project");
const project = require("../Models/Project");
const { getBucket } = require("../Utils/MongoDbConfig");
const { ObjectId } = require("mongodb");

exports.createProject = async (req, res) => {
  const bucket = getBucket();
  const files = req.files;
  let imagesArr = [];

  // Create an array of promises for each file upload
  const uploadPromises = files.map((elem) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().toISOString() + "_" + elem.originalname; // Use a unique filename
      const uploadStream = bucket.openUploadStream(fileName, {
        contentType: elem.mimetype,
      });

      uploadStream.on("finish", () => {
        imagesArr.push(uploadStream.id); // Store the uploaded file ID
        resolve(); // Resolve the promise when upload is finished
      });

      uploadStream.on("error", (error) => {
        reject(error); // Reject the promise on error
      });

      // Pipe the file data to the upload stream
      uploadStream.end(elem.buffer); // Assuming you're using multer and have the file buffer
    });
  });

  try {
    // Wait for all uploads to finish
    await Promise.all(uploadPromises);

    // Create the new project with the uploaded image IDs
    const newProject = await project.create({ images: imagesArr, ...req.body });

    return res.status(201).send({ message: "Project Added!", newProject });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).send({ message: "Error uploading files", error });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await project.find().populate(["clientName", "Milestones"]);
  return res.status(200).send({ message: "Projects Fetched", projects });
};

exports.getImages = async (req, res) => {
  let bucket = getBucket();
  const { id } = req.params;
  // console.log(typeof id ,"IDIDIDI");

  try {
    if (id) {
      const imageId = new ObjectId(id);
      // console.log(imageId,'IMGID')
      const downloadStream = bucket.openDownloadStream(imageId);

      // If no image is found, return 404
      downloadStream.on("error", (error) => {
        console.error("Error downloading image:", error);
        return res.status(404).send({ message: "Image not found" });
      });

      // Set appropriate headers for the image response
      // console.log(res);
      downloadStream.pipe(res);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

exports.editProject = async (req, res) => {
  let bucket = getBucket();
  const { id } = req.params;
  const files = req.files;
  const existingproject = await project.findById(id);
  const imagesArr = existingproject?.images;
  // Create an array of promises for each file upload
  const uploadPromises = files.map((elem) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().toISOString() + "_" + elem.originalname; // Use a unique filename
      const uploadStream = bucket.openUploadStream(fileName, {
        contentType: elem.mimetype,
      });

      uploadStream.on("finish", () => {
        imagesArr?.push(uploadStream?.id); // Store the uploaded file ID
        resolve(); // Resolve the promise when upload is finished
      });

      uploadStream.on("error", (error) => {
        reject(error); // Reject the promise on error
      });

      // Pipe the file data to the upload stream
      uploadStream.end(elem.buffer); // Assuming you're using multer and have the file buffer
    });
  });
  try {
    // Wait for all uploads to finish
    await Promise.all(uploadPromises);

    // Create the new project with the uploaded image IDs
    const newProject = await project.findByIdAndUpdate(
      id,
      {
        images: imagesArr,
        ...req.body,
      },
      { new: true }
    );

    return res
      .status(201)
      .send({ message: "Project Added!", newProject: newProject });
  } catch (error) {
    console.error("Error uploading files:", error);
    return res.status(500).send({ message: "Error uploading files", error });
  }
};

exports.deleteProject = async (req, res) => {
  let bucket = getBucket();
  const { id } = req.params;
  const projectData = await project.findById(id);
  projectData?.images?.forEach(async (elem) => {
    const imgId = new ObjectId(elem);
    await bucket.delete(imgId);
  });
  await project.findByIdAndDelete(id);
  return res.status(200).send({ messge: "Deleted Successfully!" });
};
