import express from "express";
import upload from "../middleware/multer.js";
import {
  singleProduct,
  addProduct,
  removeProduct,
  listProduct,
} from "../controllers/productController.js";
import authAdmin from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  authAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", authAdmin, removeProduct);
productRouter.post("/singlep", singleProduct);
productRouter.get("/list",authAdmin,listProduct);

export default productRouter;
