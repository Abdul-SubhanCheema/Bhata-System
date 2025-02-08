import React from "react";
import { Box, Container, Stack, Text, Link, IconButton } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      bg="var(--chakra-primary)" // Set background color to custom background variable
      color="var(--text)" // Use the custom text color
      py={6}
      mt="auto" // Ensures footer stays at the bottom
      className="shadow-lg"
    >
      <Container maxW="container.lg">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Text className="text-sm" color="var(--text)">
            © {new Date().getFullYear()} MyCompany. All rights reserved.
          </Text>

          <Stack direction="row" spacing={4}>
            <IconButton
              as={Link}
              href="https://facebook.com"
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              color="var(--text)"
              _hover={{ color: "var(--primary)" }} // Hover effect for Facebook icon
            />
            <IconButton
              as={Link}
              href="https://twitter.com"
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              color="var(--text)"
              _hover={{ color: "var(--primary)" }} // Hover effect for Twitter icon
            />
            <IconButton
              as={Link}
              href="https://instagram.com"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              color="var(--text)"
              _hover={{ color: "var(--primary)" }} // Hover effect for Instagram icon
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
