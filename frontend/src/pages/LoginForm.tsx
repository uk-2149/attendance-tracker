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
  Link,
  Text,
  VStack,
  Icon,
  Circle,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckSquare, Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader";

interface LoginProps {
  setToken: (token: string) => void;
}

const LoginForm: React.FC<LoginProps> = ({ setToken }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post<{ token: string }>(
        `${apiUrl}/api/auth/login`,
        { email, password }
      );
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      console.log("Login successful");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
      } else {
        console.error("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });

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
                Effortless attendance control for smart students
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

              <Button
                type="submit"
                colorScheme="red"
                bgGradient="linear(to-r, yellow.400, red.500)"
                color="white"
                w="full"
                _hover={{
                  bgGradient: "linear(to-r, yellow.500, red.600)",
                  boxShadow: "lg",
                }}
              >
                Sign In
              </Button>

              <Text fontSize="sm" color="gray.600">
                Don&apos;t have an account?{" "}
                <Link
                  as={RouterLink}
                  to="/register"
                  color="red.500"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  Register
                </Link>
              </Text>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default LoginForm;
