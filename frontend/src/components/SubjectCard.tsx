import { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  useToast,
  Progress,
  Badge,
  HStack,
  VStack,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
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

  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const percentage = totalClasses
    ? (attendedClasses / totalClasses) * 100
    : 0;
  const classesToMiss = Math.floor(
    totalClasses - (targetPercentage * totalClasses) / 100 - missedClasses
  );
  const isOnTrack = percentage >= targetPercentage;

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
        title: "Attendance updated",
        description: "Attendance updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
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
      boxShadow="md"
      p={6}
      position="relative"
      _hover={{ boxShadow: "lg", transform: "translateY(-2px)", transition: "0.2s" }}
    >
      <IconButton
        icon={<Edit />}
        aria-label="Edit Subject"
        position="absolute"
        top={5}
        right={4}
        size="sm"
        variant="ghost"
        onClick={() => setShowUpdateForm(true)}
      />

      <Flex justify="space-between" align="center" mb={3}>
        <Heading size="md" noOfLines={1}>
          {name}
        </Heading>
        <Badge colorScheme={isOnTrack ? "green" : "red"} mr={10}>
          {isOnTrack ? "On Track" : "Falling Behind"}
        </Badge>
      </Flex>

      <Text fontSize="sm" color="gray.600" mb={2}>
        Target: {targetPercentage}%
      </Text>

      <Progress
        value={percentage}
        size="sm"
        colorScheme={percentage >= targetPercentage ? "green" : "red"}
        borderRadius="md"
        mb={4}
      />

      <VStack align="start" spacing={1} fontSize="sm" color="gray.700">
        <Text>
          Attendance:{" "}
          <strong>
            {attendedClasses}/{totalClasses}
          </strong>{" "}
          ({percentage.toFixed(2)}%)
        </Text>
        <Text>Missed Classes: {missedClasses}</Text>
        <Text>
          Can still miss:{" "}
          <strong>
            {classesToMiss > 0 ? classesToMiss : 0}
          </strong>
        </Text>
      </VStack>

      <HStack mt={6} spacing={4} justify="left" wrap="wrap">
        <Button
          leftIcon={<CheckCircleIcon />}
          colorScheme="green"
          variant="solid"
          size={isMobile ? "sm" : "md"}
          onClick={() => updateAttendance(true)}
        >
          Attended
        </Button>
        <Button
          leftIcon={<CloseIcon />}
          colorScheme="red"
          variant="outline"
          size={isMobile ? "sm" : "md"}
          onClick={() => updateAttendance(false)}
        >
          Missed
        </Button>
      </HStack>
    </Box>
  );
};

export default SubjectCard;
