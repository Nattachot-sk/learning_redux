
const Category = require('../models/category.model');
const { toSlug } = require('../utils/helpers');


const createCategory = async (req, res) => {
  try {

    const { name } = req.body;
    const slug = toSlug(name);


    const category = new Category({ name
      , slug
     });
    await category.save();


    res.status(201).json(category);
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
};


const getAllCategories = async (req, res) => {
  try {

    const categories = await Category.find();

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateCategoryById = async (req, res) => {
  try {

    const { name } = req.body;
    const slug = toSlug(name);


    const category = await Category.findById(req.params.id);


    if (!category) {

      return res.status(404).json({ message: 'Category not found' });
    }


    category.name = name;
    category.slug = slug;
    await category.save();


    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteCategoryById = async (req, res) => {
  try {

    const category = await Category.findById(req.params.id);
    if (!category) {

      return res.status(404).json({ message: 'Category not found' });
    }
    await category.deleteOne();

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createCategory,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById
};
