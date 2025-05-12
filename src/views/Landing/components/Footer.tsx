import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const LandingFooter: React.FC = () => {
  return (
    <Box
      as="footer"
      bg="gray.900"
      py={12}
      px={8}
      color="whiteAlpha.800"
    >
      <Text
        textAlign="center"
        fontSize="sm"
      >
        © {new Date().getFullYear()} LumiAI. All rights reserved.
      </Text>
    </Box>
  );
};

export default LandingFooter;