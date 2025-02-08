import React, { useState } from "react";
import {
  Box,
  Flex,
  Select,
  HStack,
  Text,
  useColorModeValue,
  Button,
  Icon,
  Divider,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Sidebar from "../components/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { FaPrint, FaCalendarAlt } from "react-icons/fa";

const HomeLayout = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const location = useLocation();
  const toast = useToast();
  const [bills, setBills] = useState([]);

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");
  const selectBg = useColorModeValue("white", "gray.700");
  const selectHoverBg = useColorModeValue("gray.50", "gray.600");

  // Specify routes where date filters should appear
  const showDateFilter = ["/home"].includes(location.pathname);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const handlePrint = async () => {
    if (!selectedDay || !selectedMonth || !selectedYear) {
      toast({
        title: "Error",
        description: "Select all Fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/Bhata/Bill/bills?day=${selectedDay}&month=${selectedMonth}&year=${selectedYear}`
      );

      const data = response.data;
      setBills(data);

      if (!data || data.length === 0) {
        toast({
          title: "Error",
          description: "No Bills Found",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const doc = new jsPDF();
      let yPosition = 20; // Track vertical position

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Daily Bills Summary", 80, yPosition);
      yPosition += 10;

      data.forEach((bill, index) => {
        // Customer Details Table
        doc.autoTable({
          startY: yPosition,
          head: [
            ["Bill ID", "Date", "Customer Name", "CNIC", "Payment Method"],
          ],
          body: [
            [
              bill._id.slice(-4).toUpperCase(),
              new Date(bill.createdAt).toLocaleDateString(),
              bill.customer.name,
              bill.customer.cnic,
              bill.paymentMethod,
            ],
          ],
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: {
            fillColor: [0, 102, 204],
            textColor: 255,
            fontStyle: "bold",
          },
          margin: { left: 15, right: 15 },
        });

        yPosition = doc.lastAutoTable.finalY + 5;

        // Items Table
        const items = bill.items.map((item) => [
          item.product.name,
          item.quantity,
          `$${item.price.toFixed(2)}`,
          `$${item.subtotal.toFixed(2)}`,
        ]);

        doc.autoTable({
          startY: yPosition,
          head: [["Product", "Quantity", "Price", "Subtotal"]],
          body: items,
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: {
            fillColor: [0, 102, 204],
            textColor: 255,
            fontStyle: "bold",
          },
          margin: { left: 15, right: 15 },
        });

        yPosition = doc.lastAutoTable.finalY + 5;

        // Summary Table
        doc.autoTable({
          startY: yPosition,
          head: [
            [
              "Total Amount",
              "Tax",
              "Discount",
              "Final Amount",
              "Amount Paid",
              "Pending Amount",
            ],
          ],
          body: [
            [
              `$${bill.totalAmount.toFixed(2)}`,
              `$${bill.tax.toFixed(2)}`,
              `$${bill.discount.toFixed(2)}`,
              `$${bill.finalAmount.toFixed(2)}`,
              `$${bill.amountPaid.toFixed(2)}`,
              `$${bill.pendingAmount.toFixed(2)}`,
            ],
          ],
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: {
            fillColor: [0, 102, 204],
            textColor: 255,
            fontStyle: "bold",
          },
          margin: { left: 15, right: 15 },
        });

        yPosition = doc.lastAutoTable.finalY + 10;

        // Separator Line
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.line(15, yPosition, 195, yPosition);
        yPosition += 10;
      });

      doc.save(`Bills_${selectedDay}-${selectedMonth}-${selectedYear}.pdf`);
      toast({
        title: "Bill",
        description: "PDF generated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error fetching bills:", error);
      alert("Error fetching bills. Please try again.");
    }
  };

  const selectStyles = {
    bg: selectBg,
    borderRadius: "md",
    border: "1px solid",
    borderColor: "gray.300",
    _hover: {
      bg: selectHoverBg,
      borderColor: "blue.400",
    },
    _focus: {
      borderColor: "blue.500",
      boxShadow: "0 0 0 1px #3182ce",
    },
  };

  return (
    <Flex minHeight="100vh" direction="column" overflow="hidden">
      <Sidebar />

      <Box
        ml="250px"
        flex="1"
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        overflowY="auto"
      >
        {showDateFilter && (
          <Box
            p={4}
            borderBottom="1px"
            borderColor={borderColor}
            bg={bgColor}
            position="sticky"
            top={0}
            zIndex={1}
            shadow="sm"
          >
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <HStack spacing={6} flex="1">
                <HStack spacing={2}>
                  <Icon as={FaCalendarAlt} color="blue.500" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                    Date Filter
                  </Text>
                </HStack>
                <Divider orientation="vertical" height="40px" />
                <HStack spacing={4} flex="1">
                  <Select
                    placeholder="Day"
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    w="100px"
                    size="md"
                    {...selectStyles}
                  >
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </Select>

                  <Select
                    placeholder="Month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    w="150px"
                    size="md"
                    {...selectStyles}
                  >
                    {months.map((month, index) => (
                      <option key={month} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </Select>

                  <Select
                    placeholder="Year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    w="120px"
                    size="md"
                    {...selectStyles}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Select>
                </HStack>
              </HStack>

              <HStack spacing={3}>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => {
                    setSelectedDay("");
                    setSelectedMonth("");
                    setSelectedYear("");
                    setBills([]);
                  }}
                  size="md"
                >
                  Reset
                </Button>
                <Button
                  leftIcon={<FaPrint />}
                  colorScheme="blue"
                  onClick={handlePrint}
                  size="md"
                >
                  Print
                </Button>
              </HStack>
            </Flex>
          </Box>
        )}

        <Box
          flex="1"
          p={6}
          bg="var(--background)"
          overflowY="auto"
          className="print-content" 
        >
          <Outlet />
        </Box>
      </Box>

      {/* Add print-specific styles */}
    </Flex>
  );
};

export default HomeLayout;
