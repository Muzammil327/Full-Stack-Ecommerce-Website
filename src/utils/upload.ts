import multer from "multer";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dateFolder = new Date().toISOString().split("T")[0]; // Use date as the folder name
    const uploadPath = path.join("./public/user_image", dateFolder);

    // Create the folder if it doesn't exist
    require("fs").mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${file.originalname.substring(
        file.originalname.lastIndexOf(".")
      )}`
    );
  },
});

export const upload_user_image = multer({ storage });
