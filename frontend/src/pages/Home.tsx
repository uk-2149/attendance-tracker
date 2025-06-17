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
  useBreakpointValue,
  IconButton,
  Text,
  SlideFade,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon, UnlockIcon } from "@chakra-ui/icons";

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
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

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
        });
      }
    };
    fetchSubjects();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  const Header = () => (
    <Flex
      justify="space-between"
      align="center"
      py={4}
      px={isMobile ? 4 : 8}
      borderBottom="1px"
      borderColor="gray.200"
      position={isMobile ? "sticky" : "static"}
      top="0"
      bg="white"
      zIndex="sticky"
      shadow={isMobile ? "sm" : "none"}
    >
      <Heading size="lg" fontWeight="bold">
        Attendance Tracker
      </Heading>

      {!showForm && (
        <Flex gap={2}>
          {isMobile ? (
            <IconButton
              aria-label="Sign Out"
              icon={<UnlockIcon />}
              onClick={logOut}
              variant="outline"
              colorScheme="red"
            />
          ) : (
            <>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="teal"
                onClick={() => setShowForm(true)}
              >
                Add Subject
              </Button>
              <Button
                leftIcon={<UnlockIcon />}
                variant="outline"
                colorScheme="red"
                onClick={logOut}
              >
                Sign Out
              </Button>
            </>
          )}
        </Flex>
      )}
    </Flex>
  );

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />

      {showForm ? (
        <Box px={isMobile ? 4 : 8} py={4}>
          <Flex align="center" mb={4}>
            <IconButton
              icon={<ArrowBackIcon />}
              aria-label="Back"
              onClick={() => setShowForm(false)}
              variant="ghost"
              mr={2}
            />
            <Heading size="md">Add New Subject</Heading>
          </Flex>
          <SubjectForm token={token} setSubjects={setSubjects} />
        </Box>
      ) : (
        <Box px={isMobile ? 4 : 8} py={4}>
          {subjects.length === 0 ? (
            <Flex direction="column" align="center" mt={12} color="gray.500">
              <Heading size="md">No subjects added yet</Heading>
              <Text mt={2} fontSize="sm">
                Start by clicking the + button to add your first subject
              </Text>
            </Flex>
          ) : (
            <SlideFade in={true} offsetY="20px">
              <VStack spacing={4} mt={4} align="stretch">
                {subjects.map((subject) => (
                  <SubjectCard
                    key={subject._id}
                    subject={subject}
                    token={token}
                    setSubjects={setSubjects}
                  />
                ))}
              </VStack>
            </SlideFade>
          )}
        </Box>
      )}

      {/* Floating Add Button on Mobile */}
      {isMobile && !showForm && (
        <Flex position="fixed" bottom="4" right="4" zIndex={1000}>
          <IconButton
            aria-label="Add Subject"
            icon={<AddIcon />}
            onClick={() => setShowForm(true)}
            colorScheme="teal"
            size="lg"
            shadow="lg"
            rounded="full"
          />
        </Flex>
      )}
    </Box>
  );
};

export default Home;
