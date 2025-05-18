// components/Loader.tsx
import { Box, Spinner, Text } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      zIndex={9999}
      className="bg-amber-300"
    >
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#eb4034"
        size="xl"
      />
      <Text mt={4} fontSize="xl" fontWeight="bold" color="#eb4034">
        Please wait...
      </Text>
    </Box>
  );
};

export default Loader;
