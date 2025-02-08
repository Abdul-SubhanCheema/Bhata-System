const express = require("express");
const router = express.Router();
const ProductController = require("../controller/productcontroller");

router.get("/", ProductController.GetAllProducts); // Fetch all products
router.get("/InStock", ProductController.GetInstockProducts); // Fetch all products
router.post("/add", ProductController.AddProduct); // Add a new product
router.put("/:id", ProductController.UpdateProduct); // Update a product
router.delete("/:id", ProductController.DeleteProduct);
router.put("/:id/status", ProductController.ChangeStatus);

module.exports = router;
