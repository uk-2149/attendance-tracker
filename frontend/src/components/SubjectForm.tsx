import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
  useToast,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import Loader from "../components/Loader";

interface SubjectFormProps {
  token: string;
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
}

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

const SubjectForm: React.FC<SubjectFormProps> = ({ token, setSubjects }) => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    totalClasses: "",
    missedClasses: "",
    attendedClasses: "",
    targetPercentage: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to add subjects.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const res = await axios.post(`${apiUrl}/api/subjects`, formData, {
        headers: { "x-auth-token": token },
      });

      setSubjects((prev) => [...prev, res.data]);
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        totalClasses: "",
        missedClasses: "",
        attendedClasses: "",
        targetPercentage: "",
      });

      toast({
        title: "Subject Added",
        description: "Subject added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast({
        title: "Error Adding Subject",
        description: err.response?.data || err.message || "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Box
        w="full"
        minH="100vh"
        bg="gray.50"
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={4}
      >
        <Box
          w="full"
          maxW="lg"
          borderWidth="1px"
          borderRadius="2xl"
          boxShadow="xl"
          bg="white"
          p={{ base: 6, md: 10 }}
        >
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading size="lg" color="red.500">
                Add New Subject
              </Heading>
              <Text fontSize="sm" color="gray.600" mt={2}>
                Fill in the subject details below.
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Subject Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Mathematics"
                  />
                </FormControl>

                <FormControl id="startDate">
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl id="endDate">
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl id="totalClasses" isRequired>
                  <FormLabel>Total Classes</FormLabel>
                  <Input
                    type="number"
                    value={formData.totalClasses}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalClasses: e.target.value,
                      })
                    }
                    placeholder="e.g., 50"
                  />
                </FormControl>

                {/* Attended + Missed side by side */}
                <HStack spacing={4}>
                  <FormControl id="attendedClasses" isRequired>
                    <FormLabel>Attended Classes</FormLabel>
                    <Input
                      type="number"
                      value={formData.attendedClasses}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          attendedClasses: e.target.value,
                        })
                      }
                      placeholder="e.g., 40"
                    />
                  </FormControl>

                  <FormControl id="missedClasses" isRequired>
                    <FormLabel>Missed Classes</FormLabel>
                    <Input
                      type="number"
                      value={formData.missedClasses}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          missedClasses: e.target.value,
                        })
                      }
                      placeholder="e.g., 10"
                    />
                  </FormControl>
                </HStack>

                <FormControl id="targetPercentage" isRequired>
                  <FormLabel>Target Attendance (%)</FormLabel>
                  <Input
                    type="number"
                    value={formData.targetPercentage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        targetPercentage: e.target.value,
                      })
                    }
                    placeholder="e.g., 75"
                  />
                </FormControl>

                <Button
                  type="submit"
                  bg="red.500"
                  color="white"
                  size="lg"
                  mt={4}
                  _hover={{ bg: "red.600" }}
                >
                  Add Subject
                </Button>
              </Stack>
            </form>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default SubjectForm;
