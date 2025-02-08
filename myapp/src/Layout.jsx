import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer"; // Assuming you have Footer component

const Layout = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" overflow="hidden">
      {/* Main Content */}
      <Box flex="1" overflowY="auto">
        <Outlet /> {/* Renders the Login page or any other page based on the route */}
      </Box>
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
