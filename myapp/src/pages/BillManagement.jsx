import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  InputRightElement,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Input,
  useDisclosure,
  IconButton,
  useToast,
  InputGroup,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaSearch ,FaTimes} from "react-icons/fa";

const BillManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [billItems, setBillItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [selectedBill, setSelectedBill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBills, setFilteredBills] = useState([]);

  const navigate = useNavigate();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const toast = useToast();

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Bhata/Customer/active"
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast({
        title: "Error",
        description: "Failed to fetch customers",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchbills = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Bhata/Bill/all");
      setBills(response.data);
      setFilteredBills(response.data); // Initialize filtered bills with all bills
    } catch (error) {
      console.error("Error fetching Bills:", error);
      toast({
        title: "Error",
        description: "Failed to fetch bills",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Bhata/Product/InStock"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchbills();
    fetchCustomers();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!bills) return;

    const filtered = bills.filter((bill) =>
      bill.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBills(filtered);
  }, [searchQuery, bills]);

  const handleAddItem = () => {
    const selectedProductDetails = products.find(
      (product) => product._id === selectedProduct
    );

    if (!selectedProductDetails) {
      toast({
        title: "Error",
        description: "Please select a valid product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const Delete=()=>{
      
    }
    const existingItem = billItems.find(
      (item) => item.product._id === selectedProduct
    );
    if (existingItem) {
      toast({
        title: "Error",
        description: "This product is already added to the bill.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (quantity > selectedProductDetails.quantity) {
      toast({
        title: "Error",
        description: `Only ${selectedProductDetails.quantity} items are available.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newItem = {
      product: selectedProductDetails,
      quantity,
      price: selectedProductDetails.price,
      subtotal: selectedProductDetails.price * quantity,
    };

    setBillItems([...billItems, newItem]);
    setTotalAmount(totalAmount + newItem.subtotal);
    setSelectedProduct("");
    setQuantity(1);
  };

  const handleRemoveItem = (index) => {
    const removedItem = billItems[index];
    setBillItems(billItems.filter((_, i) => i !== index));
    setTotalAmount(totalAmount - removedItem.subtotal);
  };

  const calculateFinalAmount = () => {
    const taxAmount = (tax / 100) * totalAmount;
    const discountAmount = (discount / 100) * totalAmount;
    const final = totalAmount + taxAmount - discountAmount;
    setFinalAmount(final);
  };

  useEffect(() => {
    calculateFinalAmount();
  }, [totalAmount, tax, discount]);

  const handleCreateBill = async () => {
    if (!selectedCustomer) {
      toast({
        title: "Error",
        description: "Please select a customer.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (billItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item to the bill.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      const newBill = {
        customer: selectedCustomer,
        items: billItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal,
        })),
        totalAmount,
        tax,
        discount,
        finalAmount,
        paymentMethod,
        amountPaid,
      };

      const response = await axios.post(
        "http://localhost:5000/Bhata/Bill/add",
        newBill,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "Bill Created",
        description: "The bill has been created successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSelectedCustomer("");
      setBillItems([]);
      setTotalAmount(0);
      setTax(0);
      setDiscount(0);
      setFinalAmount(0);
      setAmountPaid(0);
      fetchbills();
      onClose();
    } catch (error) {
      console.error("Error creating bill:", error);
      toast({
        title: "Error",
        description: "Failed to create the bill. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box width="400px">
          <InputGroup size="lg" boxShadow="sm" borderRadius="lg">
            <InputLeftElement pointerEvents="none" h="full">
              <FaSearch color="#718096" />
            </InputLeftElement>
            <Input
              placeholder="Search bills by customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderWidth="2px"
              _hover={{ borderColor: "blue.400" }}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px #3182ce",
              }}
              fontSize="md"
              height="50px"
              bg="white"
            />
            {searchQuery && (
              <InputRightElement h="full">
                <IconButton
                  icon={<FaTimes />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  color="gray.500"
                  _hover={{ color: "gray.700" }}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </Box>
        <Flex gap={4}>
          <Button
            onClick={() => navigate(`/home/billmanagement/pendingbill`)}
            colorScheme="red"
            size="lg"
          >
            View Pending Bills
          </Button>
          <Button colorScheme="teal" onClick={onOpen} size="lg">
            Create New Bill
          </Button>
        </Flex>
      </Flex>

      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Customer Name</Th>
            <Th>Customer CNIC</Th>
            <Th>Total Bill</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredBills.map((bill) => (
            <Tr key={bill._id}>
              <Td>{bill.customer.name}</Td>
              <Td>{bill.customer.cnic}</Td>
              <Td>${bill.finalAmount}</Td>
              <Td>{new Date(bill.createdAt).toLocaleDateString()}</Td>
              <Td>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out"
                  onClick={() => {
                    setSelectedBill(bill);
                    onDeleteOpen();
                  }}
                >
                  View Details
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="80vw" width="80vw">
          <ModalHeader>Create Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto" maxHeight="70vh">
            <FormControl id="customer" mb={4}>
              <FormLabel>Customer</FormLabel>
              <Select
                placeholder="Select Customer"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="product" mb={4}>
              <FormLabel>Product</FormLabel>
              <Select
                placeholder="Select Product"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.price} (Available:{" "}
                    {product.quantity})
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="quantity" mb={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </FormControl>

            <Button colorScheme="teal" onClick={handleAddItem}>
              <FaPlus /> Add Item
            </Button>

            <Table variant="simple" mt={6}>
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th>Quantity</Th>
                  <Th>Subtotal</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {billItems.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.product.name}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>${item.subtotal}</Td>
                    <Td>
                      <IconButton
                        icon={<FaTrash />}
                        onClick={() => handleRemoveItem(index)}
                        colorScheme="red"
                        aria-label="Remove Item"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Box mt={4}>
              <strong>Total Amount: </strong>${totalAmount}
            </Box>

            <FormControl id="tax" mb={4}>
              <FormLabel>Tax (%)</FormLabel>
              <Input
                type="number"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
              />
            </FormControl>

            <FormControl id="discount" mb={4}>
              <FormLabel>Discount (%)</FormLabel>
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </FormControl>

            <FormControl id="amountpaid" mb={4}>
              <FormLabel>Amount Paid</FormLabel>
              <Input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
              />
            </FormControl>

            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              mb={3}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </Select>

            <Box mt={4}>
              <strong>Final Amount: </strong>${finalAmount}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCreateBill} mr={3}>
              Create Bill
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bill Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedBill && (
              <Box>
                <Text fontWeight="bold">
                  Customer Name: {selectedBill.customer.name}
                </Text>
                <Text fontSize="sm">
                  Date: {new Date(selectedBill.createdAt).toLocaleDateString()}
                </Text>
                <Text fontSize="sm">
                  Payment Method: {selectedBill.paymentMethod}
                </Text>

                <Box mt={4}>
                  <Text fontWeight="bold">Items:</Text>
                  {selectedBill.items.map((item, index) => (
                    <Box key={index} mt={2}>
                      <Text>Product: {item.product.name}</Text>
                      <Text>Quantity: {item.quantity}</Text>
                      <Text>Price: ${item.price}</Text>
                      <Text>Subtotal: ${item.subtotal}</Text>
                      <Text>Category: {item.product.category}</Text>
                      <Box height="1px" bg="gray.300" mt={2} />
                    </Box>
                  ))}
                </Box>

                <Box mt={4}>
                  <Text fontWeight="bold">
                    Total Amount: ${selectedBill.totalAmount}
                  </Text>
                  <Text>Tax: ${selectedBill.tax}</Text>
                  <Text>Discount: ${selectedBill.discount}</Text>
                  <Text fontWeight="bold">
                    Final Amount: ${selectedBill.finalAmount}
                  </Text>
                  <Text fontWeight="bold">
                    Amount Paid: ${selectedBill.amountPaid}
                  </Text>
                  <Text fontWeight="bold">
                    Amount Pending: ${selectedBill.pendingAmount}
                  </Text>
                </Box>
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDeleteClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BillManagement;
