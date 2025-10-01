import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"; // Added `.js` for module import

// Add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    // Extract files
    const image1 = req.files?.image1 ? req.files.image1[0] : null;
    const image2 = req.files?.image2 ? req.files.image2[0] : null;
    const image3 = req.files?.image3 ? req.files.image3[0] : null;
    const image4 = req.files?.image4 ? req.files.image4[0] : null;

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== null
    );

    // Upload images to Cloudinary
    let imageURLs = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      subcategory,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes), // Ensure sizes are parsed
      image: imageURLs,
      date: Date.now(), // Corrected key name
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product successfully added!",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Product not saved due to server error.",
      error: error.message, // Send the error for debugging
    });
  }
};

// List product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    const remove = await productModel.findOneAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({
      success: true,
      message: "founded",
      product
    });
  } catch (error) {
    res.json({
      success: false,
      message: "not found",
    });
  }
};

export { singleProduct, addProduct, removeProduct, listProduct };
