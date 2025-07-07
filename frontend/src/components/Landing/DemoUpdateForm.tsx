import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";

interface SubjectData {
  name: string;
  startDate: string;
  endDate: string;
  totalClasses: number;
  attendedClasses: number;
  missedClasses: number;
  targetPercentage: number;
}

interface DemoUpdateFormProps {
  data: SubjectData;
  onUpdate: (updated: SubjectData) => void;
  onClose: () => void;
}

const DemoUpdateForm = ({ data, onUpdate, onClose }: DemoUpdateFormProps) => {
  const [form, setForm] = useState<SubjectData>(data);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onUpdate(form);

    toast({
      title: "Subject Updated",
      description: "Changes reflected successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={50}
      bg="blackAlpha.200"
      backdropFilter="blur(2px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
      onClick={onClose}
    >
      <Box
        bg="gray.100"
        maxW="lg"
        w="full"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="2xl"
      >
        <Box bg="#eb4034" p={4}>
          <Heading
            size="md"
            color="white"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <chakra.span
              onClick={onClose}
              cursor="pointer"
              _hover={{ color: "gray.300" }}
              fontSize="xl"
            >
              <IoArrowBack />
            </chakra.span>
            Update {form.name}
          </Heading>
        </Box>

        <Box as="form" onSubmit={handleSubmit} p={6}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Subject Name</FormLabel>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Total Classes</FormLabel>
              <Input
                type="number"
                value={form.totalClasses}
                onChange={(e) =>
                  setForm({ ...form, totalClasses: Number(e.target.value) })
                }
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Attended</FormLabel>
                <Input
                  type="number"
                  value={form.attendedClasses}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      attendedClasses: Number(e.target.value),
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel>Missed</FormLabel>
                <Input
                  type="number"
                  value={form.missedClasses}
                  onChange={(e) =>
                    setForm({ ...form, missedClasses: Number(e.target.value) })
                  }
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Target Percentage</FormLabel>
              <Input
                type="number"
                value={form.targetPercentage}
                onChange={(e) =>
                  setForm({ ...form, targetPercentage: Number(e.target.value) })
                }
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
    </Box>
  );
};

export default DemoUpdateForm;
