// Import necessary modules
const Product = require("../models/product.model");
const { uploadImageToCloudinary } = require("../utils/fileUpload");
const { toSlug } = require("../utils/helpers");


const createProduct = async (req, res) => {
  try {

    const { name, price, description, category, quantity } = req.body;
    const slug = toSlug(name);
    const file = req.file;
    const imageUrl = await uploadImageToCloudinary(file);

    const product = new Product({
      name,
      price,
      description,
      category,
      imageUrl,
      slug,
      quantity,
    });

    const resp = await product.save();
    const newProduct = await Product.findById(resp._id).populate("category");

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {

    const cid = req.query.cid || null;
    const query = {};
    if (cid) {
      query.category = cid;
    }

    const products = await Product.find({ ...query })
      .populate("category")
      .populate("reviews");


    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId)
      .populate("category")
      .populate("reviews");

    if (!product) {

      return res.status(404).json({ message: "Product not found" });
    }


    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {

    const productId = req.params.id;
    const file = req.file;
    let imageUrl = null;
    if (file) {
      imageUrl = await uploadImageToCloudinary(file);
    }

    if (imageUrl) {
      req.body.imageUrl = imageUrl;
    }
    req.body.slug = toSlug(req.body.name);

    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });


    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await product.populate("category");
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
