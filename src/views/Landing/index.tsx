import React from 'react';
import { VStack, Flex, Box, Heading, Text } from '@chakra-ui/react';
import LandingLayout from './Layout';
import ShaderCanvas from './components/backgroundEffect/ShaderCanvas';
import ParticleAnimation from './components/backgroundEffect/ParticleAnimation';

const Landing: React.FC = () => {
    const Home = () => {
        return (
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
                        fontFamily={'Poppins, sans-serif'}
                        style={{
                            background: "linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(200, 200, 200, 0.8))", // Degradado en el texto
                            WebkitBackgroundClip: "text", // Clip del fondo al texto
                            WebkitTextFillColor: "transparent", // Hace que el texto sea transparente para mostrar el degradado
                        }}
                    >
                        Bienvenido a LumiAI
                    </Heading>
                    <Box>
                        <Text
                            fontSize="xl"
                            style={{
                                background: "linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(200, 200, 200, 0.8))", // Degradado en el texto
                                WebkitBackgroundClip: "text", // Clip del fondo al texto
                                WebkitTextFillColor: "transparent", // Hace que el texto sea transparente para mostrar el degradado
                            }}
                        >
                            Tu asistente impulsado por IA para conversaciones más inteligentes.
                        </Text>
                        <Text
                            fontSize="xl"
                            style={{
                                background: "linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(200, 200, 200, 0.8))", // Degradado en el texto
                                WebkitBackgroundClip: "text", // Clip del fondo al texto
                                WebkitTextFillColor: "transparent", // Hace que el texto sea transparente para mostrar el degradado
                            }}
                        >
                            Explora nuestras funciones y descubre cómo podemos ayudarte.
                        </Text>
                    </Box>
                </VStack>
            </Box>
        )
    }

    const AboutUs = () => {
        return (
            <Flex
                id="about-us"
                h={'100vh'}
                bg="gray.100"
                py={24}
                flexDirection={'row'}
                w={'100%'}
                justifyContent={'space-around'}
            >
                <ParticleAnimation/>
                
                
            </Flex>
        )
    }

    const HowDoesWork = () => {
        return (
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
        )
    }
    return (
        <LandingLayout>
            <VStack align="stretch" gap={0} bgColor={'black'}>
                <Home />
                <AboutUs />
                <HowDoesWork />
            </VStack>
        </LandingLayout>
    );
};

export default Landing;