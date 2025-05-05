import React from 'react';
import { Box, Text, Flex, Link, VStack, HStack, Image } from '@chakra-ui/react';

const LandingFooter: React.FC = () => {
  return (
    <Box as="footer" bg="gray.50" py={10} px={8}>
      <Flex 
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between" 
        maxW="1200px" 
        mx="auto"
        gap={8}
      >
        <VStack align="flex-start" spacing={4}>
          <Image src="/logo.png" alt="LumiAI Logo" height="40px" />
          <Text color="gray.600">
            Making AI conversations smarter and more helpful.
          </Text>
        </VStack>
        
        <HStack spacing={16} align="flex-start">
          <VStack align="flex-start">
            <Text fontWeight="bold" mb={2}>Product</Text>
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#testimonials">Testimonials</Link>
          </VStack>
          
          <VStack align="flex-start">
            <Text fontWeight="bold" mb={2}>Company</Text>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/careers">Careers</Link>
          </VStack>
          
          <VStack align="flex-start">
            <Text fontWeight="bold" mb={2}>Support</Text>
            <Link href="/help">Help Center</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </VStack>
        </HStack>
      </Flex>
      
      <Text textAlign="center" mt={10} color="gray.500">
        © {new Date().getFullYear()} LumiAI. All rights reserved.
      </Text>
    </Box>
  );
};

export default LandingFooter;