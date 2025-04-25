import { useState, useEffect } from "react";
import axios from "axios";
// import { Link as RouterLink } from "react-router-dom";
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
} from "@chakra-ui/react";

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

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {showForm ? (
        <SubjectForm
          token={token}
          setSubjects={setSubjects}
          onBack={() => setShowForm(false)}
        />
      ) : (
        <Box p={4} position="relative" minH="100vh">
          {!isMobile && (
            <>
              <Flex justify="space-between" align="center" mb={4}>
                <Heading textAlign="center">Attendance Tracker</Heading>
                <Flex>
                  <Button onClick={() => setShowForm(true)} colorScheme="teal">
                    Add Subject
                  </Button>
                  <Button onClick={logOut} ml={3}>
                    SignOut
                  </Button>
                </Flex>
              </Flex>

              {subjects.length === 0 ? (
                <Heading
                  as="h2"
                  size="md"
                  mt={8}
                  textAlign="center"
                  color="gray.500"
                >
                  Please add a subject for tracking attendance
                </Heading>
              ) : (
                <VStack spacing={4} mt={4}>
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
            </>
          )}

          {/* Mobile*/}
          {isMobile && (
            <>
              <Heading textAlign="center" mb={8}>
                Attendance Tracker
              </Heading>
              {subjects.length === 0 ? (
                <Heading
                  as="h2"
                  size="md"
                  mt={8}
                  textAlign="center"
                  color="gray.500"
                >
                  Please add a subject for tracking attendance
                </Heading>
              ) : (
                <VStack spacing={4} mt={4}>
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
                bottom="4"
                left="0"
                right="0"
                justify="space-between"
                px={4}
                zIndex={999}
              >
                <Button onClick={logOut}>SignOut</Button>
                <Button onClick={() => setShowForm(true)} colorScheme="teal">
                  Add Subject
                </Button>
              </Flex>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default Home;
