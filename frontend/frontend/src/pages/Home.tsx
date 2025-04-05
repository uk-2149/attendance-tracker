import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Link as RouterLink } from "react-router-dom"; 
import SubjectForm from '../components/SubjectForm'
import SubjectCard from '../components/SubjectCard'
import { Box, Button, Link, Heading, VStack, useToast, Flex, Spacer } from '@chakra-ui/react'

interface Subject {
    _id: string;
    name: string;
    totalClasses: number;
    targetPercentage: number;
    attendedClasses: number;
    // startDate: string;
    // endDate: string;
}

interface HomeProps {
    token: string | null;
}

const Home: React.FC<HomeProps> = ({ token }) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchSubjects = async () => {
        try {
          if (!token) {
            toast({
              title: 'Authentication Error',
              description: 'You must be logged in to view subjects.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return;
          }
        
          const res = await axios.get(
            `http://localhost:5000/api/subjects/`, 
            { headers: {'x-auth-token': token} });
          setSubjects(res.data as Subject[]);
        } catch(err: any) {
            console.error(err.response?.data || err.message);
            toast({
                title: "Error fetching Subjects",
                description: err.response?.data || err.message || "An error occurred",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };
    fetchSubjects();
    }, [token]
    )

    if (showForm) {
      return <SubjectForm token={token} setSubjects={setSubjects} onBack={() => setShowForm(false)} />;
    }

    const logOut = () => {
      localStorage.removeItem('token');
      // setToken("");
      window.location.reload();
    }

    return (
        <Box p={4}>
          <Flex>
          <Heading mb={4} textAlign="center">Attendance Tracker</Heading>
          <Spacer />
          <Button onClick={() => setShowForm(true)}>Add Subject</Button>
          <Button onClick={logOut} ml={3}>
            <Link 
              as={RouterLink} 
              to="/login"
            >
              SignOut
            </Link>
          </Button>
          </Flex>
          {/* <SubjectForm token={token} setSubjects={setSubjects} /> */}
          {
            subjects.length === 0 ? (
              <Heading as="h2" size="md" mt={8} textAlign="center" color="gray.500">
                Please add a subject for tracking attendance
              </Heading>
            ) : (
              <VStack spacing={4} mt={4}>
                  {subjects.map((subject) => (
                    <SubjectCard key={subject._id} subject={subject} token={token} setSubjects={setSubjects} />
                  ))}
              </VStack>
            )
          }
        </Box>
      );
}

export default Home;