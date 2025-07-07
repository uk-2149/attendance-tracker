import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  Icon,
  Circle,
  Link,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckSquare, Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader";

interface RegisterProps {
  setToken: (token: string) => void;
}

const RegisterForm: React.FC<RegisterProps> = ({ setToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post<{ token: string }>(
        `${apiUrl}/api/auth/register`,
        { email, password }
      );
      toast({
        title: "Registration Successful!",
        description: "Redirecting to dashboard...",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      setTimeout(() => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      }, 3000);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast({
          title: "Error",
          description: err.response.data.msg || "Registration failed.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        console.error("An unexpected error occurred", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bgGradient="linear(to-br, yellow.100, orange.100, red.100)"
        px={4}
      >
        <Box
          w="full"
          maxW="md"
          bg="white"
          borderRadius="2xl"
          boxShadow="2xl"
          overflow="hidden"
        >
          {/* Header */}
          <Box bgGradient="linear(to-r, yellow.400, red.500)" py={6} px={4}>
            <Flex direction="column" align="center">
              <Circle size="16" bg="white" mb={4}>
                <Icon as={CheckSquare} boxSize={8} color="red.500" />
              </Circle>
              <Heading size={headingSize} color="white" textAlign="center">
                Attendance Tracker
              </Heading>
              <Text color="whiteAlpha.900" mt={1} fontSize="sm" textAlign="center">
                Join the smarter way to track your classes
              </Text>
            </Flex>
          </Box>

          {/* Form */}
          <Box as="form" onSubmit={handleSubmit} py={8} px={6}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Mail} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="student@study.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Lock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Box
                      as="button"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon as={showPassword ? EyeOff : Eye} color="gray.600" />
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={Lock} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <Box
                      as="button"
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Icon
                        as={showConfirmPassword ? EyeOff : Eye}
                        color="gray.600"
                      />
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {password && confirmPassword && password !== confirmPassword && (
                <Text color="red.500" fontSize="sm" mt={-2}>
                  Passwords do not match.
                </Text>
              )}

              <Button
                type="submit"
                colorScheme="red"
                bgGradient="linear(to-r, yellow.400, red.500)"
                color="white"
                w="full"
                isDisabled={!email || !password || password !== confirmPassword}
                _hover={{
                  bgGradient: "linear(to-r, yellow.500, red.600)",
                  boxShadow: "lg",
                }}
              >
                Register
              </Button>

              <Text fontSize="sm" color="gray.600">
                Already registered?{" "}
                <Link
                  as={RouterLink}
                  to="/login"
                  color="red.500"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  Log in
                </Link>
              </Text>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default RegisterForm;
