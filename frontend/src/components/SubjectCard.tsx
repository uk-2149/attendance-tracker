import axios from "axios"
import {
    Box,
    Heading,
    Text,
    Button,
    Flex,
    useToast,
  } from '@chakra-ui/react';


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

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, token, setSubjects }) => {
    const{ _id, name, totalClasses, attendedClasses, targetPercentage, missedClasses } = subject;
    const classesToMiss = Math.floor((totalClasses - ((targetPercentage * totalClasses) / 100)) - missedClasses);

    const toast = useToast();

    const updateAttendance = async (attended: boolean) => {
        const updatedAttendedClasses = attended ? attendedClasses + 1 : attendedClasses;
        const updatedMissedClasses = attended ? missedClasses : missedClasses + 1;
        try {
            if (!token) {
                toast({
                    title: 'Authentication Error',
                    description: 'You must be logged in to update attendance',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            const res = await axios.put(
                `http://localhost:5000/api/subjects/${_id}`,
                { attendedClasses: updatedAttendedClasses, missedClasses: updatedMissedClasses },
                {
                    headers: { 'x-auth-token': token },
                }
            );
            setSubjects((prev) => prev.map((sub) => (sub._id === _id ? res.data : sub)));
            toast({
                title: 'Attendance updated',
                description: 'Attendance updated successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch(err:any) {
            console.error(err.response?.data || err.message);
            toast({
                title: 'Error Updating Attendance',
                description: err.response?.data || err.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return(
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
        <Heading size="md">{name}</Heading>
        <Text>
          Attendance: {attendedClasses}/{totalClasses} (
          {totalClasses > 0 ? (attendedClasses / totalClasses * 100).toFixed(2) : "0.00"}%)
        </Text>
        <Text>
          Missed Classes: {missedClasses}
        </Text>
        <Text>Target: {targetPercentage || 0}%</Text>
        <Text>Classes you can miss: {Number(classesToMiss) > 0 ? classesToMiss : 0}</Text>
        <Flex mt={4} justifyContent="space-around">
          <Button onClick={() => updateAttendance(true)} colorScheme="green">
            Attended
          </Button>
          <Button onClick={() => updateAttendance(false)} colorScheme="red">
            Missed
          </Button>
        </Flex>
      </Box>      
    )
}

export default SubjectCard;