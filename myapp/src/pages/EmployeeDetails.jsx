import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
  Divider,
  Button,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const EmployeeDetails = () => {
  const { id } = useParams();
  const toast = useToast();
  const {
    isOpen: isSalaryOpen,
    onOpen: onSalaryOpen,
    onClose: onSalaryClose,
  } = useDisclosure(); // Salary Modal
  const {
    isOpen: isUpdateSalaryOpen,
    onOpen: onUpdateSalaryOpen,
    onClose: onUpdateSalaryClose,
  } = useDisclosure(); // Update Salary Modal
  const {
    isOpen: isUpdateLoanOpen,
    onOpen: onUpdateLoanOpen,
    onClose: onUpdateLoanClose,
  } = useDisclosure(); // Update Loan Modal
  const {
    isOpen: isLoanOpen,
    onOpen: onLoanOpen,
    onClose: onLoanClose,
  } = useDisclosure(); // Loan Modal
  const [employee, setEmployee] = useState(null);
  const [salaryMonth, setSalaryMonth] = useState("");
  const [salaryYear, setSalaryYear] = useState("");
  const [loanMonth, setLoanMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null); // For updating salary

  // Separate error states for salary and loan modals
  const [salaryError, setSalaryError] = useState("");
  const [loanError, setLoanError] = useState("");
  const [updateSalaryError, setUpdateSalaryError] = useState("");
  const [updateLoanError, setUpdateLoanError] = useState(""); // For updating salary error
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Generate a range of years dynamically, for example, from 5 years before to 5 years after the current year
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Bhata/Employee/${id}/history`
      );
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const updateSalary = async () => {
    if (!salaryMonth ||!salaryYear) {
      setSalaryError("All fields are required.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/Bhata/Employee/${id}/update-salary`,
        {
          month: salaryMonth,
          Year:salaryYear,
        }
      );
      fetchEmployeeDetails();
      toast({
        title: "Salary Added",
        description: "The Salary has been added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setAmount("");
      setSalaryMonth("");
      onSalaryClose();
      setSalaryError(""); // Clear the error after success
    } catch (error) {
      console.error("Error updating salary:", error);
      setSalaryError("Failed to update salary. Please try again.");
    }
  };

  const updateSpecificSalary = async () => {
    if (!amount) {
      setUpdateSalaryError("Amount is required.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/Bhata/Employee/${id}/update-salary/${selectedSalary._id}`,
        {
          amount,
        }
      );
      fetchEmployeeDetails();
      toast({
        title: "Salary Updated",
        description: "The Salary has been Upadted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setAmount("");
      setUpdateSalaryError(""); // Clear error after success
      onUpdateSalaryClose();
    } catch (error) {
      console.error("Error updating salary:", error);
      setUpdateSalaryError("Failed to update salary. Please try again.");
    }
  };
  const updateSpecificLoan = async () => {
    if (!amount) {
      setUpdateLoanError("Amount is required.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/Bhata/Employee/${id}/update-loan/${selectedLoan._id}`,
        {
          amount,
        }
      );
      fetchEmployeeDetails();
      toast({
        title: "Loan Updated",
        description: "The loan has been Upadted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setAmount("");
      setUpdateLoanError("");
      onUpdateLoanClose();
    } catch (error) {
      console.error("Error updating loan:", error);
      setUpdateLoanError("Failed to update Loan. Please try again.");
    }
  };

  const deleteSalary = async (salaryId) => {
    try {
      await axios.delete(
        `http://localhost:5000/Bhata/Employee/${id}/delete-salary/${salaryId}`
      );
      fetchEmployeeDetails();
      toast({
        title: "Salary Deleted",
        description: "The salary has been deleted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting salary:", error);
    }
  };
  const deleteLoan = async (loanId) => {
    try {
      await axios.delete(
        `http://localhost:5000/Bhata/Employee/${id}/delete-loan/${loanId}`
      );
      fetchEmployeeDetails();
      toast({
        title: "Loan Deleted",
        description: "The loan has been deleted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
  };

  const updateLoan = async () => {
    if (!loanMonth || !amount) {
      setLoanError("Both fields are required.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/Bhata/Employee/${id}/grant-loan`,
        {
          month: loanMonth,
          amount,
        }
      );
      fetchEmployeeDetails();
      toast({
        title: "Loan Granted",
        description: "The loan has been added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setAmount("");
      setLoanMonth("");
      onLoanClose();
      setLoanError(""); // Clear the error after success
    } catch (error) {
      console.error("Error updating loan:", error);
      setLoanError("Failed to update loan. Please try again.");
    }
  };

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <Box p={5}>
      <Heading size="lg" mb={3}>
        {employee.name}'s Salary & Loan History
      </Heading>
      <Divider />

      {/* Salary History */}
      <Heading size="md" mt={5} mb={2}>
        Salary History
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Month</Th>
            <Th>Year</Th>
            <Th>Salary Paid</Th>
            <Th>Date Paid</Th>
            <Th>Actions</Th> {/* Added Actions Column */}
          </Tr>
        </Thead>
        <Tbody>
          {employee.salaryHistory.length > 0 ? (
            employee.salaryHistory.map((record, index) => (
              <Tr key={index}>
                <Td>{record.month}</Td>
                <Td>{record.Year}</Td>
                <Td>${record.amount}</Td>
                <Td>{new Date(record.datePaid).toLocaleDateString()}</Td>
                <Td>
                  <Button
                    colorScheme="yellow"
                    size="sm"
                    onClick={() => {
                      setSelectedSalary(record); // Set the salary record to be updated
                      setAmount(record.amount);
                      setSalaryMonth(record.month);
                      onUpdateSalaryOpen();
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => deleteSalary(record._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} style={{ textAlign: "center" }}>
                No salary records found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Update Salary Button */}
      <Button colorScheme="blue" onClick={onSalaryOpen} mt={5}>
        Add Salary
      </Button>

      {/* Salary Add Modal */}
      <Modal isOpen={isSalaryOpen} onClose={onSalaryClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Salary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Salary Error Message */}
            {salaryError && (
              <Box color="red.500" mb={3}>
                {salaryError}
              </Box>
            )}

            {/* Month Dropdown */}
            <Select
              placeholder="Select Month"
              value={salaryMonth}
              onChange={(e) => setSalaryMonth(e.target.value)}
              mb={3}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Select>

            {/* Year Dropdown (Dynamic Years) */}
            <Select
              placeholder="Select Year"
              value={salaryYear}
              onChange={(e) => setSalaryYear(e.target.value)}
              mb={3}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>

          </ModalBody>

          <ModalFooter>
            <Button  onClick={onSalaryClose} colorScheme="red" mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={updateSalary}>
              Add Salary
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Update Specific Salary Modal */}
      <Modal isOpen={isUpdateSalaryOpen} onClose={onUpdateSalaryClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Salary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Update Salary Error Message */}
            {updateSalaryError && (
              <Box color="red.500" mb={3}>
                {updateSalaryError}
              </Box>
            )}

            {/* Month Dropdown */}
            <Select
              placeholder="Select Month"
              value={salaryMonth}
              onChange={(e) => setSalaryMonth(e.target.value)}
              mb={3}
              isDisabled
            >
              <option value={selectedSalary?.month}>
                {selectedSalary?.month}
              </option>
            </Select>

            {/* Salary Amount Input */}
            <Input
              placeholder="Salary Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onUpdateSalaryClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={updateSpecificSalary}>
              Update Salary
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Loan History */}
      <Heading size="md" mt={5} mb={2}>
        Loan History
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Month</Th>
            <Th>Loan Amount</Th>
            <Th>Date Issued</Th>
            <Th>Actions</Th> {/* Added Actions Column */}
          </Tr>
        </Thead>
        <Tbody>
          {employee.loanHistory.length > 0 ? (
            employee.loanHistory.map((record, index) => (
              <Tr key={index}>
                <Td>{record.month}</Td>
                <Td>${record.amount}</Td>
                <Td>{new Date(record.dateIssued).toLocaleDateString()}</Td>
                <Td>
                  <Button
                    colorScheme="yellow"
                    size="sm"
                    onClick={() => {
                      setSelectedLoan(record); // Set the salary record to be updated
                      setAmount(record.amount);
                      setLoanMonth(record.month);
                      onUpdateLoanOpen();
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => deleteLoan(record._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3} style={{ textAlign: "center" }}>
                No loan records found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Loan Add Button */}
      <Button colorScheme="green" onClick={onLoanOpen} mt={5}>
        Add Loan
      </Button>

      {/* Loan Modal */}
      <Modal isOpen={isLoanOpen} onClose={onLoanClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Loan Error Message */}
            {loanError && (
              <Box color="red.500" mb={3}>
                {loanError}
              </Box>
            )}

            {/* Month Dropdown */}
            <Select
              placeholder="Select Month"
              value={loanMonth}
              onChange={(e) => setLoanMonth(e.target.value)}
              mb={3}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Select>

            {/* Loan Amount Input */}
            <Input
              placeholder="Loan Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onLoanClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={updateLoan}>
              Add Loan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Update Specific Loan Modal */}
      <Modal isOpen={isUpdateLoanOpen} onClose={onUpdateLoanClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Update Salary Error Message */}
            {updateLoanError && (
              <Box color="red.500" mb={3}>
                {updateLoanError}
              </Box>
            )}

            {/* Month Dropdown */}
            <Select
              placeholder="Select Month"
              value={loanMonth}
              onChange={(e) => setLoanMonth(e.target.value)}
              mb={3}
              isDisabled
            >
              <option value={selectedLoan?.month}>{selectedLoan?.month}</option>
            </Select>

            {/* Salary Amount Input */}
            <Input
              placeholder="Loan Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={onUpdateLoanClose}
              colorScheme="red"
              ml={3}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={updateSpecificLoan}>
              Update Loan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmployeeDetails;
