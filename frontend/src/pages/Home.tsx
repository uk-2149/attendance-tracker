import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SubjectForm from "../components/SubjectForm";
import SubjectCard from "../components/SubjectCard";
import {
  Box,
  Button,
  Heading,
  VStack,
  useToast,
  Flex,
  Container,
  IconButton,
  Text,
  Fade,
} from "@chakra-ui/react";
import { PlusIcon, LogOutIcon } from "lucide-react";

interface Subject {
  _id: string;
  userId: string;
  name: string;
  startDate: string;
  endDate: string;
  totalClasses: number;
  attendedClasses: number;
  targetPercentage: number;
  missedClasses: number;
}

interface HomeProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<HomeProps> = ({ token, setToken }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (!token) {
          toast({
            title: "Authentication Error",
            description: "You must be logged in to view subjects.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          return;
        }

        const res = await axios.get(`${apiUrl}/api/subjects/`, {
          headers: { "x-auth-token": token },
        });
        setSubjects(res.data as Subject[]);
      } catch (err: any) {
        console.error(err.response?.data || err.message);
        toast({
          title: "Error fetching Subjects",
          description: err.response?.data || err.message || "An error occurred",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    };
    fetchSubjects();
  }, [token, apiUrl, toast]);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  return (
    <Box minH="100vh" bg="gray.50" transition="all 0.3s">
      {showForm ? (
        <Fade in={showForm}>
          <SubjectForm
            token={token}
            setSubjects={setSubjects}
            onBack={() => setShowForm(false)}
          />
        </Fade>
      ) : (
        <Container maxW="container.xl" py={{ base: 6, md: 10 }}>
          <Fade in={!showForm}>
            <Flex
              justify="space-between"
              align="center"
              mb={{ base: 6, md: 8 }}
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: 4, md: 0 }}
            >
              <Heading
                as="h1"
                size={{ base: "xl", md: "2xl" }}
                bgGradient="linear(to-r, teal.500, blue.600)"
                bgClip="text"
                textAlign={{ base: "center", md: "left" }}
              >
                Attendance Tracker
              </Heading>
              <Flex gap={3}>
                <Button
                  leftIcon={<PlusIcon size={20} />}
                  colorScheme="teal"
                  variant="solid"
                  size={{ base: "md", md: "lg" }}
                  borderRadius="full"
                  _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                  transition="all 0.2s"
                  onClick={() => setShowForm(true)}
                >
                  Add Subject
                </Button>
                <IconButton
                  aria-label="Sign out"
                  icon={<LogOutIcon size={20} />}
                  colorScheme="gray"
                  variant="outline"
                  size={{ base: "md", md: "lg" }}
                  borderRadius="full"
                  _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                  transition="all 0.2s"
                  onClick={logOut}
                />
              </Flex>
            </Flex>

            {subjects.length === 0 ? (
              <VStack spacing={4} mt={{ base: 10, md: 16 }} textAlign="center">
                <Heading
                  as="h2"
                  size={{ base: "md", md: "lg" }}
                  color="gray.600"
                >
                  No Subjects Yet
                </Heading>
                <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>
                  Get started by adding a subject to track your attendance.
                </Text>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  size={{ base: "md", md: "lg" }}
                  borderRadius="full"
                  onClick={() => setShowForm(true)}
                >
                  Add Your First Subject
                </Button>
              </VStack>
            ) : (
              <VStack spacing={{ base: 4, md: 6 }} mt={{ base: 6, md: 8 }}>
                {subjects.map((subject) => (
                  <SubjectCard
                    key={subject._id}
                    subject={subject}
                    token={token}
                    setSubjects={setSubjects}
                  />
                ))}
              </VStack>
            )}

            <Flex
              position="fixed"
              bottom={{ base: 4, md: 0 }}
              left={0}
              right={0}
              justify="center"
              px={4}
              zIndex={999}
              display={{ base: "flex", md: "none" }}
              gap={3}
            >
              <Button
                leftIcon={<PlusIcon size={20} />}
                colorScheme="teal"
                size="lg"
                borderRadius="full"
                flex={1}
                _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                transition="all 0.2s"
                onClick={() => setShowForm(true)}
              >
                Add Subject
              </Button>
              <IconButton
                aria-label="Sign out"
                icon={<LogOutIcon size={20} />}
                colorScheme="gray"
                variant="outline"
                size="lg"
                borderRadius="full"
                _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                transition="all 0.2s"
                onClick={logOut}
              />
            </Flex>
          </Fade>
        </Container>
      )}
    </Box>
  );
};

export default Home;