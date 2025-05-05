import React from 'react';
import { VStack, Box, Heading, Text } from '@chakra-ui/react';
import LandingLayout from './Layout';
import ShaderCanvas from './components/backgroundEffect/ShaderCanvas';

const Landing: React.FC = () => {
    return (
        <LandingLayout>
            <VStack align="stretch">
                {/* Home Section */}
                <Box id="home" h={'100vh'} position="relative">
                    <ShaderCanvas width={'100%'} height={'100%'} />
                    <VStack
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        textAlign="center"
                        gap={10}
                    >
                        <Heading
                            as="h1"
                            size="4xl"
                            color="white"
                            fontFamily={'Poppins, sans-serif'}
                        >
                            Welcome to LumiAI
                        </Heading>
                        <Box>
                            <Text fontSize="lg" color="whiteAlpha.800">
                                Your AI-powered assistant for smarter conversations.
                            </Text>
                            <Text fontSize="lg" color="whiteAlpha.800">
                                Explore our features and see how we can help you.
                            </Text>
                        </Box>
                    </VStack>
                </Box>

                {/* About Us Section */}
                <Box
                    id="about-us"
                    h={'100vh'}
                    bg="gray.100"
                    py={24}
                >
                    <Heading as="h2" size="xl" textAlign="center">
                        About Us
                    </Heading>
                    <Text textAlign="center" mt={4}>
                        Learn more about our mission and vision.
                    </Text>
                </Box>

                {/* How Does It Work Section */}
                <Box
                    id="how-does-it-work"
                    h={'100vh'}
                    py={24}
                >
                    <Heading as="h2" size="xl" textAlign="center">
                        How Does It Work?
                    </Heading>
                    <Text textAlign="center" mt={4}>
                        Understand how LumiAI can help you.
                    </Text>
                </Box>
            </VStack>
        </LandingLayout>
    );
};

export default Landing;