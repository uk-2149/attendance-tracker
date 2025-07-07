import {
  Box,
  Flex,
  Text,
  IconButton,
  VStack,
  HStack,
  Divider,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckCircle, Github, Mail, Twitter, X } from "lucide-react";

const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="gray.800" color="white" py={12} px={4}>
      <Flex
        maxW="7xl"
        mx="auto"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "flex-start" }}
        gap={10}
      >
        {/* Left */}
        <Box flex="1">
          <Flex align="center" mb={4}>
            <Box
              w={8}
              h={8}
              bgGradient="linear(to-br, yellow.400, red.400)"
              rounded="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={2}
            >
              <CheckCircle size={20} color="white" />
            </Box>
            <Text fontSize="xl" fontWeight="bold">
              AttendanceTracker
            </Text>
          </Flex>

          <Text fontSize="sm" color="gray.400" maxW="sm" mb={4}>
            Simple attendance tracking for smart students. Built with ❤️ for the academic community.
          </Text>

          <HStack spacing={4}>
            <Link href="https://github.com/uk-2149" isExternal>
              <IconButton
                icon={<Github size={20} />}
                aria-label="GitHub"
                variant="ghost"
                colorScheme="whiteAlpha"
              />
            </Link>
            <Link href="https://x.com/uk_2149" isExternal>
              <IconButton
                icon={<Twitter size={20} />}
                aria-label="twitter"
                variant="ghost"
                colorScheme="whiteAlpha"
              />
            </Link>
          </HStack>
        </Box>

        {/* Right */}
        <Box flex="1">
          <Text fontSize="lg" fontWeight="semibold" mb={4} align="end">
            Links
          </Text>
          <VStack align="end" spacing={2}>
            <Link href="https://github.com/uk-2149/attendance-tracker" color="gray.400" _hover={{ color: "white" }}>
              GitHub Repository
            </Link>
            <Link href="https://uk-psi.vercel.app/" color="gray.400" _hover={{ color: "white" }}>
              Portfolio
            </Link>
            {/* <Link href="#" color="gray.400" _hover={{ color: "white" }}>
              Documentation
            </Link> */}
          </VStack>
        </Box>
      </Flex>

      {/* Divider + Bottom Text */}
      <Divider borderColor="gray.700" mt={12} mb={6} />

      <Text textAlign="center" color="gray.500" fontSize="sm">
        © {new Date().getFullYear()} AttendanceTracker. Made with ❤️ for students.
      </Text>
    </Box>
  );
};

export default Footer;
