import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const PendingBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Bhata/Bill/pending"
      );
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching pending bills:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (bill) => {
    setSelectedBill(bill);
    setPaymentAmount("");
    onOpen();
  };

  const handleUpdateBill = async () => {
    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0) {
      toast({
        title: "Valid Amount",
        description: "Please Enter Valid Amount",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (
        selectedBill.amountPaid + parseFloat(paymentAmount) >
        selectedBill.finalAmount
      ) {
        toast({
          title: "Valid Amount",
          description: "Can't Pay more Than Total",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const updatedBill = {
        amountPaid: selectedBill.amountPaid + parseFloat(paymentAmount),
      };

      await axios.put(
        `http://localhost:5000/Bhata/Bill/update/${selectedBill._id}`,
        updatedBill
      );
      fetchBills(); // Refresh bills after update
      onClose();
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };

  return (
    <>
      <Heading size="lg" mb={3}>
        Pending Bills
      </Heading>
      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Customer</Th>
            <Th>CNIC</Th>
            <Th>Total Amount</Th>
            <Th>Amount Paid</Th>
            <Th>Pending Amount</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {bills.length > 0 ? (
            bills.map((bill) => (
              <Tr key={bill._id}>
                <Td>{bill.customer?.name || "N/A"}</Td>
                <Td>{bill.customer?.cnic || "N/A"}</Td>
                <Td>${bill.finalAmount.toFixed(2)}</Td>
                <Td>${bill.amountPaid.toFixed(2)}</Td>
                <Td className="text-red-500 font-bold">
                  ${bill.pendingAmount.toFixed(2)}
                </Td>
                <Td>{new Date(bill.createdAt).toLocaleDateString()}</Td>
                <Td>
                  <IconButton
                    icon={<FaEdit />}
                    colorScheme="blue"
                    aria-label="Edit Bill"
                    onClick={() => openEditModal(bill)}
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={6} className="text-center text-gray-500">
                No pending bills found
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Edit Bill Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Bill Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="number"
              placeholder="Enter payment amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateBill}>
              Update Payment
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PendingBills;
