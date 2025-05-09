import React from 'react';
import { VStack, Box, Heading, Text } from '@chakra-ui/react';
import LandingLayout from './Layout';
import ShaderCanvas from './components/backgroundEffect/ShaderCanvas';

const Landing: React.FC = () => {
    return (
        <LandingLayout>
            <VStack align="stretch" gap={0}>
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
                            Bienvenido a LumiAI
                        </Heading>
                        <Box>
                            <Text fontSize="lg" color="whiteAlpha.800">
                                Tu asistente impulsado por IA para conversaciones más inteligentes.
                            </Text>
                            <Text fontSize="lg" color="whiteAlpha.800">
                                Explora nuestras funciones y descubre cómo podemos ayudarte.
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
                    mt={0}
                >
                    <Heading as="h2" size="xl" textAlign="center">
                        Sobre Nosotros
                    </Heading>
                    <Text textAlign="center" mt={4}>
                        Aprende más sobre nuestra misión y visión.
                    </Text>
                </Box>

                {/* How Does It Work Section */}
                <Box
                    id="how-does-it-work"
                    h={'100vh'}
                    py={24}
                    bg={'gray.900'}
                >
                    <Heading as="h2" size="xl" textAlign="center" color="white">
                        ¿Cómo Funciona?
                    </Heading>
                    <Text textAlign="center" mt={4} color="whiteAlpha.800">
                        Entiende cómo LumiAI puede ayudarte.
                    </Text>
                </Box>
            </VStack>
        </LandingLayout>
    );
};

export default Landing;