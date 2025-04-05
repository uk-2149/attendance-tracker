import { Link as RouterLink } from "react-router-dom"; 
import { useState } from "react"
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
} from "@chakra-ui/react"
import { CheckSquare, Eye, EyeOff, Lock, Mail } from "lucide-react"
import axios from 'axios'


interface LoginProps {
  setToken: (token: string) => void;
}


const LoginForm: React.FC<LoginProps> = ({ setToken }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<{ token: string }>("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log('Login response:', res.data);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      console.log('Token set:', res.data.token);
      console.log("Submitted");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
      } else {
        console.error("An unexpected error occurred", err);
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex align-center justify-center bg-amber-300">
    <Box w="full" maxW="md" borderRadius="lg" overflow="hidden" bg="white" boxShadow="2xl" h="fit-content" mt="10vh">

      {/*The top part*/}
      <Box bg="#eb4034" p={6}>
        <Flex direction="column" alignItems="center">
          <Circle size="16" bg="white" mb="4" display="flex" alignItems="center" justifyItems="center">
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
                <Box as="button" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <Icon as={showPassword ? EyeOff : Eye} color="gray.800" />
                </Box>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button type="submit" w="full" bg="#eb4034" color="white" _hover={{bg: "#dc2626"}}>
              Sign in
          </Button>

          <Text fontSize="sm" textAlign="center" color="gray.600">
            Don't have an account?{" "}
            <Link 
              as={RouterLink} 
              to="/register"
              color="primary.500" 
              fontWeight="medium" 
              _hover={{ textDecoration: "underline" }}
            >
              Register
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
    </div>
  )
}

export default LoginForm;