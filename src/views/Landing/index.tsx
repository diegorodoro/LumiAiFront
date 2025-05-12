import React from 'react';
import { VStack, Flex, Box, Heading, Text, Grid, GridItem } from '@chakra-ui/react';
import LandingLayout from './Layout';
import ShaderCanvas from './components/backgroundEffect/ShaderCanvas';
import AnimatedCicles from './components/backgroundEffect/AnimatedCircles';

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
                bg="black"
                flexDirection={'column'}
                w={'100%'}
                py={24}
                position="relative"
                overflow="hidden" // Add this to ensure content doesn't spill out
                isolation="isolate" // Creates a new stacking context
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex={0}
                    overflow="hidden"
                    width="100%"
                    height="100%"
                >
                    <AnimatedCicles />
                </Box>

                <Box
                    display="flex"
                    flexDirection={'row'}
                    fontFamily="'Inter', sans-serif"
                    justifyContent={'space-between'}
                    gap={8}
                    py={14}
                    px={24}
                    position="relative"
                    zIndex={1}
                >
                    <Box w="50%" display="flex" alignItems="center" justifyContent="center">
                        <Heading
                            as="h2"
                            size="4xl"
                            textAlign="center"
                            fontFamily="'Roboto', sans-serif"
                            color="white"
                        >
                            Sobre Nosotros
                        </Heading>
                    </Box>

                    <Box w="50%" display="flex" alignItems="center">
                        <Text fontSize="xl" textAlign="justify" color="white">
                            LumiAI es una plataforma innovadora que combina la <strong>inteligencia artificial
                            </strong> con la <strong>psicología moderna</strong>. Nuestro objetivo es ofrecer
                            un espacio seguro y accesible para que las personas puedan explorar sus emociones y
                            recibir apoyo en su bienestar mental. Con LumiAI, buscamos democratizar el acceso a
                            la salud mental, brindando herramientas efectivas y personalizadas para cada individuo.
                        </Text>
                    </Box>
                </Box>

                <Grid
                    h={'100%'}
                    w={'100%'}
                    px={24}
                    py={14}
                    templateColumns={'repeat(12, 1fr)'}
                    gap={10}
                    position="relative"
                    zIndex={1}
                >
                    <GridItem colSpan={6}>
                        <Box
                            borderRadius={'3xl'}
                            bg="rgba(255, 255, 255, 0.08)"
                            backdropFilter="blur(20px)"
                            boxShadow="0 10px 30px 0 rgba(0, 0, 0, 0.3), inset 0 0 3px 0 rgba(255, 255, 255, 0.2)"
                            border="1px solid rgba(255, 255, 255, 0.2)"
                            p={8}
                            transition="all 0.3s ease"
                            h="100%"
                            position="relative"
                            overflow="hidden"
                            _before={{
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "2px",
                                background: "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1))"
                            }}
                            _after={{
                                content: '""',
                                position: "absolute",
                                top: "-50%",
                                left: "-50%",
                                width: "200%",
                                height: "200%",
                                background: "linear-gradient(60deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0) 30%)",
                                transform: "rotate(30deg)",
                                pointerEvents: "none"
                            }}
                        >
                            <Text
                                fontSize="70px"
                                textAlign="center"
                                color="white"
                                fontFamily="'Roboto', sans-serif"
                                fontWeight="bold"
                                textShadow="0 2px 10px rgba(0,0,0,0.2)"
                                position="relative"
                                zIndex={1}
                            >
                                +1,000,000 usuarios satisfechos
                            </Text>
                            <Text
                                fontSize="2xl"
                                textAlign="center"
                                color="rgba(255,255,255,0.9)"
                                fontFamily="'Roboto', sans-serif"
                                position="relative"
                                zIndex={1}
                            >
                                Ayudando a las personas a encontrar su camino hacia el bienestar emocional.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem colSpan={5}>
                        <Box
                            borderRadius={'3xl'}
                            bg="rgba(0, 50, 100, 0.15)"
                            backdropFilter="blur(20px)"
                            boxShadow="0 10px 30px 0 rgba(0, 0, 0, 0.3), inset 0 0 3px 0 rgba(100, 200, 255, 0.2)"
                            border="1px solid rgba(100, 200, 255, 0.2)"
                            p={6}
                            transition="all 0.3s ease"
                            h="100%"
                            position="relative"
                            overflow="hidden"
                            _before={{
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "2px",
                                background: "linear-gradient(to right, rgba(100,200,255,0.1), rgba(100,200,255,0.3), rgba(100,200,255,0.1))"
                            }}
                            _after={{
                                content: '""',
                                position: "absolute",
                                top: "-50%",
                                left: "-50%",
                                width: "200%",
                                height: "200%",
                                background: "linear-gradient(60deg, rgba(100,200,255,0) 20%, rgba(100,200,255,0.1) 25%, rgba(100,200,255,0) 30%)",
                                transform: "rotate(30deg)",
                                pointerEvents: "none"
                            }}
                        >
                            <Text
                                fontSize="4xl"
                                textAlign="center"
                                color="white"
                                fontFamily="'Roboto', sans-serif"
                                fontWeight="bold"
                                position="relative"
                                zIndex={1}
                            >
                                Algoritmos avanzados e Inteligencia Artificial
                            </Text>
                            <Text
                                fontSize="lg"
                                textAlign="center"
                                color="rgba(255,255,255,0.9)"
                                fontFamily="'Roboto', sans-serif"
                                mt={4}
                                position="relative"
                                zIndex={1}
                            >
                                Nuestro sistema utiliza modelos de IA de vanguardia para ofrecer respuestas precisas y personalizadas.
                            </Text>
                        </Box>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <Box
                            borderRadius={'3xl'}
                            bg="rgba(0, 50, 100, 0.15)"
                            backdropFilter="blur(20px)"
                            boxShadow="0 10px 30px 0 rgba(0, 0, 0, 0.3), inset 0 0 3px 0 rgba(100, 200, 255, 0.2)"
                            border="1px solid rgba(100, 200, 255, 0.2)"
                            p={6}
                            transition="all 0.3s ease"
                            h="100%"
                            position="relative"
                            overflow="hidden"
                        >
                            <Text
                                fontSize="4xl"
                                textAlign="center"
                                color="white"
                                fontFamily="'Roboto', sans-serif"
                                fontWeight="bold"
                                position="relative"
                            >
                                Para latinoamérica
                            </Text>
                        </Box>
                    </GridItem>
                </Grid>
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