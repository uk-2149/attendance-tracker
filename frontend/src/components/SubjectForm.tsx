import { useState } from "react";
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
  useToast,
  Flex,
  Spacer,
  HStack
} from "@chakra-ui/react"

interface SubjectFormProps {
    token: string;
    setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
    onBack: () => void;
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

const SubjectForm: React.FC<SubjectFormProps> = ({ token, setSubjects, onBack }) => {
    const [formData, setFormData] = useState({
      name: '',
      startDate: '',
      endDate: '',
      totalClasses: '',
      missedClasses: '',
      attendedClasses: '',
      targetPercentage: '',
    });
  
    const toast = useToast();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (!token) {
          toast({
            title: 'Authentication Error',
            description: 'You must be logged in to add subjects.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return;
        }
  
        const res = await axios.post('https://attendance-tracker-pl45.onrender.com/api/subjects', formData, {
          headers: { 'x-auth-token': token },
        });
        setSubjects((prev) => [...prev, res.data]);
        setFormData({
            name: '',
            startDate: '',
            endDate: '',
            totalClasses: '',
            missedClasses: '',
            attendedClasses: '',
            targetPercentage: '',
          });

          toast({
            title: 'Subject Added',
            description: 'Subject added successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          onBack();

        } catch(err: any) {
            console.error(err.response?.data || err.message);
            toast({
                title: 'Error Adding Subject',
                description: err.response?.data || err.message || 'An error occurred.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
        }
    };

    return(
       <div className="w-full h-[100vh] flex align-center justify-center bg-amber-300">
       <Box borderWidth="1px" borderRadius="lg" w="full" maxW="lg" overflow="hidden" bg="gray.100" h="content-fit" boxShadow="dark-lg" m="auto" className="h-fit">
       <Box bg="#eb4034" p={6}>
           <Flex>
           <Button onClick={onBack}>Back</Button>
           <Spacer />
           <Heading size="md" mb={4} textAlign="center" color="white">
             Add New Subject
           </Heading>
           </Flex>
       </Box>
           <Box as="form" onSubmit={handleSubmit} p={4}>
             <Stack spacing={4}>
               <FormControl id="name">
                 <FormLabel>Subject Name</FormLabel>
                 <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Subject name" />
               </FormControl>
   
               <FormControl id="startDate">
                 <FormLabel>Start Date</FormLabel>
                 <Input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
               </FormControl>
   
               <FormControl id="endDate">
                 <FormLabel>End Date</FormLabel>
                 <Input type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
               </FormControl>
   
               <FormControl id="totalClasses">
                 <FormLabel>Total Classes</FormLabel>
                 <Input type="number" value={formData.totalClasses} onChange={(e) => setFormData({...formData, totalClasses: e.target.value})} placeholder="Total no. of classes" />
               </FormControl>
               <HStack>
               <FormControl id="attendedClasses">
                 <FormLabel>Attended Classes</FormLabel>
                 <Input type="number" value={formData.attendedClasses} onChange={(e) => setFormData({...formData, attendedClasses: e.target.value})} placeholder="no. of classes you have attended" />
               </FormControl>

               <FormControl id="missedClasses">
                 <FormLabel>Missed Classes</FormLabel>
                 <Input type="number" value={formData.missedClasses} onChange={(e) => setFormData({...formData, missedClasses: e.target.value})} placeholder="no. of classes you have missed" />
               </FormControl>
               </HStack>
               <FormControl id="targetPercentage">
               <FormLabel>Target Percentage</FormLabel>
               <Input type="number" value={formData.targetPercentage} onChange={(e) => setFormData({...formData, targetPercentage: e.target.value})} placeholder="Target Percentage" />
               </FormControl>
   
               <Button type="submit" bg="#eb4034" color="white" _hover={{bg: "#dc2626"}}>
                 Add Subject
               </Button>
             </Stack>
           </Box>
       </Box>
       </div>
    )
}

export default SubjectForm;