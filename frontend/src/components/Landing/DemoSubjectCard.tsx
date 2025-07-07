import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Badge,
  Text,
  Progress,
  VStack,
  HStack,
  Button,
  useToast,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";
import { CheckCircle, X } from "lucide-react";
import DemoUpdateForm from "./DemoUpdateForm";

// interface DemoSubjectCardProps {
//   setEdit: React.Dispatch<React.SetStateAction<boolean>>;
// }

const DemoSubjectCard = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToast();

  const [name, setName] = useState("Mathematics");
  const [targetPercentage, setTargetPercentage] = useState(75);
  const [totalClasses, setTotalClasses] = useState(20);
  const randomAttended = Math.floor(Math.random() * (totalClasses - 5)) + 3;
  const randomMissed = Math.floor(
    Math.random() * (totalClasses - randomAttended)
  );
  const [attended, setAttended] = useState(randomAttended);
  const [missed, setMissed] = useState(randomMissed);
  const [isDeleted, setIsDeleted] = useState(false);

  const [showEdit, setShowEdit] = useState(false);

  const totalMarked = attended + missed;
  const percentage = (attended / totalClasses) * 100;
  const classesToMiss = Math.max(
    Math.floor(((percentage - targetPercentage) * totalClasses) / 100),
    0
  );
  const isOnTrack = percentage >= targetPercentage;

  const handleAttendanceUpdate = (isPresent: boolean) => {
    if (isDeleted) return;

    if (totalMarked + 1 >= totalClasses) {
      toast({
        title: `Total number of classes reached.`,
        description: `${name} has been deleted.`,
        status: "info",
        duration: 4000,
        isClosable: true,
      });
      setIsDeleted(true);
      return;
    }

    if (isPresent) {
      setAttended((prev) => prev + 1);
    } else {
      setMissed((prev) => prev + 1);
    }
  };

  if (isDeleted) return <DemoSubjectCard />;

  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      p={6}
      position="relative"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-2px)",
        transition: "0.2s",
      }}
    >
      <IconButton
        icon={<Edit />}
        aria-label="Edit Subject"
        position="absolute"
        top={5}
        right={4}
        size="sm"
        variant="ghost"
        onClick={() => setShowEdit(true)}
      />

      {showEdit && (
        <DemoUpdateForm
          data={{
            name,
            startDate: "2024-01-01",
            endDate: "2024-06-30",
            totalClasses,
            attendedClasses: attended,
            missedClasses: missed,
            targetPercentage,
          }}
          onUpdate={(newData) => {
            setName(newData.name);
            setAttended(newData.attendedClasses);
            setMissed(newData.missedClasses);
            setTotalClasses(newData.totalClasses);
            setTargetPercentage(newData.targetPercentage);
          }}
          onClose={() => setShowEdit(false)}
        />
      )}

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
        colorScheme={isOnTrack ? "green" : "red"}
        borderRadius="md"
        mb={4}
      />

      <VStack align="start" spacing={1} fontSize="sm" color="gray.700">
        <Text>
          Attendance:{" "}
          <strong>
            {attended}/{totalClasses}
          </strong>{" "}
          ({percentage.toFixed(2)}%)
        </Text>
        <Text>Missed Classes: {missed}</Text>
        <Text>
          Can still miss: <strong>{classesToMiss}</strong>
        </Text>
      </VStack>

      <HStack mt={6} spacing={4} justify="center" wrap="wrap">
        <Button
          leftIcon={<CheckCircle size={18} />}
          colorScheme="green"
          variant="solid"
          size={isMobile ? "sm" : "md"}
          onClick={() => handleAttendanceUpdate(true)}
        >
          Attended
        </Button>
        <Button
          leftIcon={<X size={18} />}
          colorScheme="red"
          variant="outline"
          size={isMobile ? "sm" : "md"}
          onClick={() => handleAttendanceUpdate(false)}
        >
          Missed
        </Button>
      </HStack>
    </Box>
  );
};

export default DemoSubjectCard;
