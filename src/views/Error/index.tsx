// src/views/error/index.tsx
import { Box, Text, VStack, extendTheme, ChakraProvider } from "@chakra-ui/react";
import { motion } from "framer-motion";

const theme = extendTheme({
  colors: {
    brand: {
      blue: "#B3E5FC",
      pink: "#F8BBD0",
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.blue",
        color: "gray.700",
      },
    },
  },
});

const MotionBox = motion(Box);

const ErrorPage = () => {
  return (
    <ChakraProvider theme={theme}>
      <VStack
        justify="center"
        align="center"
        h="100vh"
        spacing={6}
        bgGradient="linear(to-br, brand.blue, brand.pink)"
      >
        <MotionBox
          p={10}
          bg="whiteAlpha.800"
          borderRadius="2xl"
          boxShadow="lg"
          textAlign="center"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="semibold">
            LumiAI regresará en un momento
          </Text>
          <Text fontSize="md" mt={3} color="gray.500">
            Estamos haciendo una pequeña pausa para mejorar tu experiencia.
          </Text>
        </MotionBox>
      </VStack>
    </ChakraProvider>
  );
};

export default ErrorPage;
