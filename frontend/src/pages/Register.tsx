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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post<{ token: string }>(
        `${apiUrl}/api/auth/register`,
        {
          email,
          password,
        }
      );
      console.log("API Response:", res.data);
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
        console.error(err.response.data);
        toast({
          title: "Error",
          description: err.response.data.msg,
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
      {
        <div className="w-full h-[100vh] flex align-center justify-center bg-amber-300">
          <Box
            w="full"
            maxW="md"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="2xl"
            h="fit-content"
            m="auto"
          >
            {/*The top part*/}
            <Box bg="#eb4034" p={6}>
              <Flex direction="column" alignItems="center">
                <Circle
                  size="16"
                  bg="white"
                  mb="4"
                  display="flex"
                  alignItems="center"
                  justifyItems="center"
                >
                  <Icon as={CheckSquare} boxSize={8} color="#eb4034" />
                </Circle>
              </Flex>
              <Heading size="lg" color="white" textAlign="center">
                Attendance Tracker
              </Heading>
              <Text color="white" mt={2} textAlign="center">
                Manage your attendance records
              </Text>
            </Box>
            {/*top part ends*/}

            {/*Form*/}
            <Box as="form" onSubmit={handleSubmit} p={6}>
              <VStack spacing={6}>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={Mail} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@study.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={Lock} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <InputRightElement>
                      <Box
                        as="button"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          as={showPassword ? EyeOff : Eye}
                          color="gray.800"
                        />
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
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
                      required
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
                          color="gray.800"
                        />
                      </Box>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {/* {error && <Text color="red.500">{error}</Text>} */}

                <Button
                  type="submit"
                  w="full"
                  bg="#eb4034"
                  color="white"
                  _hover={{ bg: "#dc2626" }}
                  isDisabled={password !== confirmPassword}
                >
                  Register
                </Button>

                <Text fontSize="sm" textAlign="center" color="gray.600">
                  Already Registered?{" "}
                  <Link
                    as={RouterLink}
                    to="/login"
                    color="primary.500"
                    fontWeight="medium"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Log in
                  </Link>
                </Text>
              </VStack>
            </Box>
          </Box>
        </div>
      }
    </>
  );
};

export default RegisterForm;
