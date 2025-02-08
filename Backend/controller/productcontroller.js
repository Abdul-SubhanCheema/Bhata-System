const Product = require("../models/product");

const ProductController = {
  GetAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products", error });
    }
  },
  GetInstockProducts:async (req,res) => {
    try {
      const products = await Product.find({status: "In Stock"});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products", error });
    }
  },
  AddProduct: async (req, res) => {
    try {
      const { name, quantity, price, description, category } = req.body;
      const newProduct = new Product({
        name,
        quantity,
        price,
        description,
        category,
      });
      await newProduct.save();
      res
        .status(201)
        .json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      res.status(500).json({ message: "Failed to add product", error });
    }
  },
  UpdateProduct: async (req, res) => {
    try {
      const { name, quantity, price, description, category } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, quantity, price, description, category },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to update product", error });
    }
  },
  DeleteProduct: async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product", error });
    }
  },

  ChangeStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({
        message: `Product status updated to ${status}`,
        updatedProduct,
      });
      
    } catch (error) {
      res.status(500).json({ message: "Error updating product status", error });
    }
  },
};
module.exports = ProductController;
