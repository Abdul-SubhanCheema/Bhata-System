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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";

const CustomerManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Bhata/Customer/all",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    try {
      // Check if CNIC already exists
      const userExists = users.some((user) => user.cnic === cnic);
      if (userExists) {
        toast({
          title: "Error",
          description: "CNIC already exists.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const newUser = { name, cnic, phone, address };
      const response = await axios.post(
        "http://localhost:5000/Bhata/Customer/add",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUsers([...users, response.data]);

      toast({
        title: "User Added",
        description: "The user has been added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
       
      });

      // Clear inputs
      setName("");
      setCnic("");
      setPhone("");
      setSalary("");
      setAddress("");
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);

      toast({
        title: "Error",
        description: "Failed to add user. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      
      });
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setName(user.name);
    setCnic(user.cnic);
    setPhone(user.phone);
    setAddress(user.address);
    setSalary(user.salary);
    onOpen();
  };

  const handleUpdateUser = async (currentUserCnic) => {
    // Check if CNIC already exists
    const userExists = users.some(
      (user) => user.cnic === cnic && user.cnic !== currentUserCnic
    );
    if (userExists) {
      toast({
        title: "Error",
        description: "CNIC already exists.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const updatedUser = { name, cnic, phone, address };
      await axios.put(
        `http://localhost:5000/Bhata/Customer/${editingUser._id}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchUsers();

      toast({
        title: "User Updated",
        description: "The user has been updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      
      });

      setName("");
      setCnic("");
      setPhone("");
      setSalary("");
      setAddress("");
      setEditingUser(null);

      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to Update user. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        
      });
    }
  };
  const handleTerminatedStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Terminated" : "Active";
      await axios.put(
        `http://localhost:5000/Bhata/Customer/terminate/${userId}`,
        { status: newStatus }
      );
      fetchUsers();
      toast({
        title: `User status changed to ${newStatus}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error updating status",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Button
        colorScheme="teal"
        onClick={onOpen}
        position="absolute"
        top="20px"
        right="20px"
        size="lg"
      >
        Add New Customer
      </Button>

      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>CNIC</Th>
            <Th>Phone</Th>
            <Th>Address</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user.name}</Td>
              <Td>{user.cnic}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.address}</Td>
              <Td>{user.status}</Td>
              <Td>
                <IconButton
                  icon={<FaEdit />}
                  onClick={() => handleEditUser(user)}
                  colorScheme="blue"
                  aria-label="Edit User"
                  mr={2}
                />
                <IconButton
                  icon={
                    user.status === "Active" ? <FaToggleOff /> : <FaToggleOn />
                  }
                  onClick={() => handleTerminatedStatus(user._id, user.status)}
                  colorScheme={user.status === "Active" ? "red" : "green"}
                  aria-label="Delete User"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for Adding or Editing User */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingUser ? "Edit User" : "Add New User"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl id="cnic" mb={4}>
              <FormLabel>CNIC</FormLabel>
              <Input
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
              />
            </FormControl>

            <FormControl id="phone" mb={4}>
              <FormLabel>Phone</FormLabel>
              <Input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>

            <FormControl id="address" mb={4}>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {editingUser ? (
              <Button
                colorScheme="blue"
                onClick={() => handleUpdateUser(editingUser.cnic)}
              >
                Update
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleAddUser}>
                Add
              </Button>
            )}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomerManagement;
