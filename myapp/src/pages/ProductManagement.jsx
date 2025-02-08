import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  IconButton,
  ModalFooter,
  Input,
  Select,
} from "@chakra-ui/react";
import axios from "axios";

import { FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });
  const toast = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Bhata/Product/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateProduct = async () => {
    if (!productData.name || !productData.price || !productData.quantity) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // Fetch current products and check for duplicates
    const existingProduct = products.find(
      (product) => product.name.toLowerCase() === productData.name.toLowerCase()
    );

    if (existingProduct && !editingProduct) {
      // If adding a new product, and it already exists, show error
      toast({
        title: "Product with this name already exists",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/Bhata/Product/${editingProduct._id}`,
          productData
        );
        toast({
          title: "Product updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await axios.post(
          "http://localhost:5000/Bhata/Product/add",
          productData
        );
        toast({
          title: "Product added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      fetchProducts();
      setIsOpen(false);
      setEditingProduct(null);
      setProductData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "Other",
      });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductData(product);
    setIsOpen(true);
  };

  const handleStatus = async (id, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "In Stock" ? "Discontinued" : "In Stock";
      await axios.put(`http://localhost:5000/Bhata/Product/${id}/status`, {
        status: newStatus,
      });
      toast({
        title: "Product Status Changed",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product Status:", error);
    }
  };

  return (
    <Box p={5}>
      <Button
        onClick={() => setIsOpen(true)}
        colorScheme="teal"
        position="absolute"
        top="20px"
        right="20px"
        size="lg"
      >
        Add New Product
      </Button>
      
      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Category</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td>${product.price}</Td>
              <Td>{product.quantity}</Td>
              <Td>{product.category}</Td>
              <Td>{product.status}</Td>
              <Td>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => handleEdit(product)}
                  colorScheme="blue"
                  aria-label="Edit Product"
                  mr={2}
                />
                <IconButton
                  icon={
                    product.status === "In Stock" ? (
                      <FaToggleOff />
                    ) : (
                      <FaToggleOn />
                    )
                  }
                  onClick={() => handleStatus(product._id, product.status)}
                  colorScheme={product.status === "In Stock" ? "red" : "green"}
                  aria-label="Delete Product"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingProduct ? "Update Product" : "Add Product"}
          </ModalHeader>
          <ModalBody>
            <Input
              placeholder="Name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              placeholder="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={productData.price}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              placeholder="Quantity"
              name="quantity"
              type="number"
              value={productData.quantity}
              onChange={handleInputChange}
              mb={3}
            />
            <Select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              mb={3}
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
              <option value="Food">Food</option>
              <option value="Other">Other</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddOrUpdateProduct}>
              {editingProduct ? "Update" : "Add"}
            </Button>
            <Button ml={3} onClick={() => setIsOpen(false)} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductManagement;
