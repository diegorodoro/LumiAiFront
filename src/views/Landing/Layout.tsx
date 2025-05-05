import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import LandingHeader from './components/Header';
import LandingFooter from './components/Footer';

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <LandingHeader />
      <Box as="main" flex="1">
        {children}
      </Box>
      <LandingFooter />
    </Box>
  );
};

export default LandingLayout;