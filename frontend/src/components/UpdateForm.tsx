import { useState } from "react";
import axios from "axios";
import {
  chakra,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import Loader from "./Loader";

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

interface SubjectFormProps {
  subject: Subject;
  token: string;
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  onBack: () => void;
}

const UpdateForm: React.FC<SubjectFormProps> = ({
  subject,
  token,
  setSubjects,
  onBack,
}) => {
  const {
    _id,
    name,
    startDate,
    endDate,
    totalClasses,
    attendedClasses,
    targetPercentage,
    missedClasses,
  } = subject;

  const formatDate = (isoDate: string) => isoDate.slice(0, 10);

  const [updatedData, setUpdatedData] = useState({
    name,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    totalClasses,
    attendedClasses,
    missedClasses,
    targetPercentage,
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
          description: "You must be logged in to update subjects.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const res = await axios.put(
        `${apiUrl}/api/subjects/update/${_id}`,
        updatedData,
        {
          headers: { "x-auth-token": token },
        }
      );

      setSubjects((prev) =>
        prev.map((sub) => (sub._id === subject._id ? res.data : sub))
      );

      toast({
        title: "Subject Updated",
        description: "Subject updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onBack();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast({
        title: "Error Updating Subject",
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
      <div className="w-full h-full flex justify-center items-center">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          maxW="lg"
          w="full"
          bg="gray.100"
          boxShadow="dark-lg"
          m="auto"
        >
          <Box bg="#eb4034" p={4} borderTopRadius="lg">
          <Heading size="md" color="white" display="flex" alignItems="center" gap={2}>
  <chakra.span
    onClick={onBack}
    cursor="pointer"
    _hover={{ color: "gray.300" }}
    fontSize="xl"
  >
    <IoArrowBack />
  </chakra.span>
  Update {name}
</Heading>
</Box>
          <Box as="form" onSubmit={handleSubmit} p={6}>
            <Stack spacing={4}>
              <FormControl id="name">
                <FormLabel>Subject Name</FormLabel>
                <Input
                  value={updatedData.name}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, name: e.target.value })
                  }
                  placeholder="Subject name"
                />
              </FormControl>

              <FormControl id="startDate">
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  value={updatedData.startDate}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, startDate: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="endDate">
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  value={updatedData.endDate}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, endDate: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="totalClasses">
                <FormLabel>Total Classes</FormLabel>
                <Input
                  type="number"
                  value={updatedData.totalClasses}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      totalClasses: Number(e.target.value),
                    })
                  }
                  placeholder="Total no. of classes"
                />
              </FormControl>

              <HStack spacing={4}>
                <FormControl id="attendedClasses">
                  <FormLabel>Attended Classes</FormLabel>
                  <Input
                    type="number"
                    value={updatedData.attendedClasses}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        attendedClasses: Number(e.target.value),
                      })
                    }
                    placeholder="Attended classes"
                  />
                </FormControl>

                <FormControl id="missedClasses">
                  <FormLabel>Missed Classes</FormLabel>
                  <Input
                    type="number"
                    value={updatedData.missedClasses}
                    onChange={(e) =>
                      setUpdatedData({
                        ...updatedData,
                        missedClasses: Number(e.target.value),
                      })
                    }
                    placeholder="Missed classes"
                  />
                </FormControl>
              </HStack>

              <FormControl id="targetPercentage">
                <FormLabel>Target Percentage</FormLabel>
                <Input
                  type="number"
                  value={updatedData.targetPercentage}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      targetPercentage: Number(e.target.value),
                    })
                  }
                  placeholder="Target %"
                />
              </FormControl>

              <Button
                type="submit"
                bg="#eb4034"
                color="white"
                _hover={{ bg: "#dc2626" }}
              >
                Update Subject
              </Button>
            </Stack>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default UpdateForm;
