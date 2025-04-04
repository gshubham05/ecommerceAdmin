import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"../uploads/"); // Save files in `uploads/`
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()} - ${file.originalname}`); // Ensure unique filenames
    }
  });

const upload = multer({storage})
export default upload