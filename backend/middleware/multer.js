import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname); // uniqueName
  },
});

const upload = multer({ storage });
export default upload;
