import { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useToast,
  IconButton,
  Badge,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";
import UpdateForm from "./UpdateForm";

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

interface SubjectCardProps {
  subject: Subject;
  token: string;
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  token,
  setSubjects,
}) => {
  const {
    _id,
    name,
    totalClasses,
    attendedClasses,
    targetPercentage,
    missedClasses,
  } = subject;
  const classesToMiss = Math.floor(
    totalClasses - (targetPercentage * totalClasses) / 100 - missedClasses
  );
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const updateAttendance = async (attended: boolean) => {
    const updatedAttendedClasses = attended
      ? attendedClasses + 1
      : attendedClasses;
    const updatedMissedClasses = attended ? missedClasses : missedClasses + 1;
    try {
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to update attendance",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      const res = await axios.put(
        `${apiUrl}/api/subjects/${_id}`,
        {
          attendedClasses: updatedAttendedClasses,
          missedClasses: updatedMissedClasses,
        },
        {
          headers: { "x-auth-token": token },
        }
      );
      setSubjects((prev) =>
        prev.map((sub) => (sub._id === _id ? res.data : sub))
      );
      toast({
        title: "Attendance Updated",
        description: "Attendance updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      if (updatedAttendedClasses + updatedMissedClasses === totalClasses) {
        await axios.delete(`${apiUrl}/api/subjects/delete/${_id}`, {
          headers: { "x-auth-token": token },
        });
        setSubjects((prev) => prev.filter((sub) => sub._id !== _id));
        toast({
          title: "Session Completed",
          description: `Total number of classes reached and ${name} has been deleted.`,
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast({
        title: "Error Updating Attendance",
        description: err.response?.data || err.message || "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  if (showUpdateForm) {
    return (
      <UpdateForm
        subject={subject}
        token={token}
        setSubjects={setSubjects}
        onBack={() => setShowUpdateForm(false)}
      />
    );
  }

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={{ base: 4, md: 6 }}
      boxShadow="md"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-4px)",
      }}
      transition="all 0.3s"
      w="full"
      position="relative"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <IconButton
        aria-label="Edit subject"
        icon={<Edit size={18} />}
        size="sm"
        variant="ghost"
        colorScheme="gray"
        position="absolute"
        top={4}
        right={4}
        borderRadius="full"
        _hover={{ bg: "gray.100", transform: "scale(1.1)" }}
        transition="all 0.2s"
        onClick={() => setShowUpdateForm(true)}
      />

      <VStack align="start" spacing={3}>
        <HStack justify="space-between" w="full">
          <Heading
            size={{ base: "md", md: "lg" }}
            color="gray.800"
            noOfLines={1}
          >
            {name}
          </Heading>
          <Badge
            colorScheme={
              (attendedClasses / totalClasses) * 100 >= targetPercentage
                ? "green"
                : classesToMiss >= 0
                ? "yellow"
                : "red"
            }
            borderRadius="full"
            px={3}
            py={1}
            fontSize={{ base: "xs", md: "sm" }}
          >
            {totalClasses > 0
              ? ((attendedClasses / totalClasses) * 100).toFixed(1)
              : "0.0"}
            %
          </Badge>
        </HStack>

        <Divider borderColor="gray.200" />

        <VStack align="start" spacing={2} fontSize={{ base: "sm", md: "md" }}>
          <HStack justify="space-between" w="full">
            <Text color="gray.600">Attendance</Text>
            <Text fontWeight="medium">
              {attendedClasses}/{totalClasses} classes
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text color="gray.600">Missed Classes</Text>
            <Text fontWeight="medium">{missedClasses}</Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text color="gray.600">Target</Text>
            <Text fontWeight="medium">{targetPercentage}%</Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text color="gray.600">Classes You Can Miss</Text>
            <Text
              fontWeight="medium"
              color={classesToMiss >= 0 ? "gray.800" : "red.500"}
            >
              {Number(classesToMiss) > 0 ? classesToMiss : 0}
            </Text>
          </HStack>
        </VStack>

        <Flex
          mt={4}
          w="full"
          gap={{ base: 2, md: 3 }}
          flexDir={{ base: "column", sm: "row" }}
        >
          <Button
            colorScheme="teal"
            size={{ base: "md", md: "lg" }}
            borderRadius="full"
            flex={1}
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            transition="all 0.2s"
            onClick={() => updateAttendance(true)}
          >
            Attended
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            size={{ base: "md", md: "lg" }}
            borderRadius="full"
            flex={1}
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            transition="all 0.2s"
            onClick={() => updateAttendance(false)}
          >
            Missed
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SubjectCard;