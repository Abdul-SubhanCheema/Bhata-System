import React from "react";
import { Box, Avatar, Text, VStack, Heading, Divider } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Box maxW="md" mx="auto" p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg" bg="white">
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.500">
        Profile Details
      </Heading>

      {/* Profile Picture and User Info */}
      <VStack align="center" spacing={4} mb={6}>
        <Avatar size="xl" name="John Doe" src="https://via.placeholder.com/150" />
        <Text fontSize="2xl" fontWeight="bold" color="teal.600">
          Abdul Subhan
        </Text>
        <Text fontSize="lg" color="gray.600">
          abdulsubhancheema97@gmail.com
        </Text>
      </VStack>

      {/* Divider */}
      <Divider mb={6} />

      {/* Other Information */}
      <Box>
        <Heading as="h3" size="lg" mb={4} color="teal.500" textAlign="center">
          About
        </Heading>
        <Text fontSize="md" color="gray.700" lineHeight="1.6" textAlign="center">
          Software Engineer
        </Text>
      </Box>
    </Box>
  );
};

export default Profile;
