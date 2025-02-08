import React from "react";
import { Box, VStack, Link, Icon, Text } from "@chakra-ui/react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBox,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      as="nav"
      bg="var(--chakra-primary)"
      color="white"
      width="250px"
      minH="100vh"
      py={6}
      px={4}
      position="fixed"
      left={0}
      top={0}
      display="flex"
      flexDirection="column"
      className="shadow-lg"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Tawakalia Bricks
      </Text>

      <VStack spacing={4} align="stretch">
        <NavLink to="/home" end>
          {({ isActive }) => (
            <Box
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={isActive ? "var(--primary)" : "transparent"}
              color={isActive ? "white" : "var(--text_color)"}
              _hover={{
                bg: "var(--button_hover)",
                color: "white",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Icon as={FaHome} boxSize={5} mr={3} />
              <Text fontWeight="medium">Home</Text>
            </Box>
          )}
        </NavLink>

        <NavLink to="/home/profile" className="nav-link">
          {({ isActive }) => (
            <Box
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={isActive ? "var(--primary)" : "transparent"}
              color={isActive ? "white" : "var(--text_color)"}
              _hover={{
                bg: "var(--button_hover)",
                color: "white",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Icon as={FaUser} boxSize={5} mr={3} />
              <Text>Profile</Text>
            </Box>
          )}
        </NavLink>

        <NavLink to="/home/usermanagement" className="nav-link">
          {({ isActive }) => (
            <Box
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={isActive ? "var(--primary)" : "transparent"}
              color={isActive ? "white" : "var(--text_color)"}
              _hover={{
                bg: "var(--button_hover)",
                color: "white",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Icon as={FaCog} boxSize={5} mr={3} />
              <Text>Employee Management</Text>
            </Box>
          )}
        </NavLink>
        <NavLink to="/home/productmanagement" className="nav-link">
          {({ isActive }) => (
            <Box
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={isActive ? "var(--primary)" : "transparent"}
              color={isActive ? "white" : "var(--text_color)"}
              _hover={{
                bg: "var(--button_hover)",
                color: "white",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Icon as={FaBox} boxSize={5} mr={3} />
              <Text>Product Management</Text>
            </Box>
          )}
        </NavLink>
        <NavLink to="/home/customermanagement" className="nav-link">
          {({ isActive }) => (
            <Box
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={isActive ? "var(--primary)" : "transparent"}
              color={isActive ? "white" : "var(--text_color)"}
              _hover={{
                bg: "var(--button_hover)",
                color: "white",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Icon as={FaUser} boxSize={5} mr={3} />
              <Text>Customer Management</Text>
            </Box>
          )}
        </NavLink>
        <NavLink to="/home/billmanagement" className="nav-link">
          {({ isActive }) => (
            <Box
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={isActive ? "var(--primary)" : "transparent"}
              color={isActive ? "white" : "var(--text_color)"}
              _hover={{
                bg: "var(--button_hover)",
                color: "white",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Icon as={FaFileInvoiceDollar} boxSize={5} mr={3} />
              <Text>Bill Management</Text>
            </Box>
          )}
        </NavLink>

        <NavLink to="/" className="nav-link">
          {({ isActive }) => (
            <Box
              display="flex"
              alignItems="center"
              p={3}
              borderRadius="md"
              bg={isActive ? "var(--primary)" : "transparent"}
              color={isActive ? "white" : "var(--text_color)"}
              _hover={{
                bg: "var(--button_hover)",
                color: "white",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <Icon as={FaSignOutAlt} boxSize={5} mr={3} />
              <Text>Logout</Text>
            </Box>
          )}
        </NavLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;
