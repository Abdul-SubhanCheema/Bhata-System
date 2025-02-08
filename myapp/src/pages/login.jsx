import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if username and password match the required credentials
    if (username === "Abdul Subhan" && password === "123") {
      toast({
        title: "Success",
        description: "You have logged in successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      toast({
        title: "Error",
        description: "Invalid username or password.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Box
      bg="background"
      color="text"
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Container maxW="lg" bg="white" p={8} borderRadius="md" boxShadow="lg">
        <Stack spacing={6} textAlign="center">
          <Heading as="h2" size="xl" color="chakraPrimary">
            Login
          </Heading>

          <form onSubmit={handleSubmit}>
            <FormControl id="username" mb={4}>
              <FormLabel color="text">Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                bg="gray.100"
                color="text"
                borderColor="gray.300"
                _hover={{ borderColor: "chakraPrimary" }}
                _focus={{ borderColor: "chakraPrimary" }}
                size="md"
              />
            </FormControl>

            <FormControl id="password" mb={6}>
              <FormLabel color="text">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                bg="gray.100"
                color="text"
                borderColor="gray.300"
                _hover={{ borderColor: "chakraPrimary" }}
                _focus={{ borderColor: "chakraPrimary" }}
                size="md"
              />
            </FormControl>

            <Button
              type="submit"
              width="full"
              size="lg"
              bg="var(--primary)" // Use the primary background color
              color="white" // Set text color to white
              _hover={{ bg: "var(--button_hover)" }}
              _active={{
                bg: "var(--accent)", // Accent color for the active state
                color: "white", // Ensure text stays white when clicked
              }}
              _focus={{
                bg: "var(--primary)", // Maintain the primary color when focused
                color: "white", // Keep text white when focused
              }}
              mb={4}
              
            >
              Log In
            </Button>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
