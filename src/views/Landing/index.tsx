import React, { useEffect, useState, useRef } from 'react';
import { VStack, Flex, Box, Heading, Text, Grid, GridItem, Stack, Circle, Icon, useBreakpointValue, StackDirection } from '@chakra-ui/react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaBrain, FaUserCog, FaChartLine, FaClipboardCheck } from 'react-icons/fa';
import LandingLayout from './Layout';
import ShaderCanvas from './components/backgroundEffect/ShaderCanvas';
import ParticleAnimation from './components/backgroundEffect/ParticleAnimation';

const Landing: React.FC = () => {
    const Home = () => {
        return (
            <Box id="home" minH={'100vh'} h={'100%'} position="relative">
                <ShaderCanvas width={'100%'} height={'100%'} />
                <VStack
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    textAlign="center"
                    gap={{ base: 4, md: 6, lg: 10 }}
                    width={{ base: "90%", md: "80%", lg: "70%" }}
                    px={4}
                >
                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                        fontFamily={'Poppins, sans-serif'}
                        style={{
                            background: "linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(200, 200, 200, 0.8))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Bienvenido a LumiAI
                    </Heading>
                    <Box>
                        <Text
                            fontSize="xl"
                            style={{
                                background: "linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(200, 200, 200, 0.8))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Tu asistente impulsado por IA para conversaciones más inteligentes.
                        </Text>
                        <Text
                            fontSize="xl"
                            style={{
                                background: "linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(200, 200, 200, 0.8))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Explora nuestras funciones y descubre cómo podemos ayudarte.
                        </Text>
                    </Box>
                </VStack>
            </Box>
        );
    };

    const AboutUs = () => {
        useEffect(() => {
            const elementsToAnimate: HTMLElement[] = [];
            const activateAnimations = (isVisible: boolean): void => {
                elementsToAnimate.length = 0;

                const titleBox = document.querySelector('#about-us-title-box') as HTMLElement | null;
                const glassBoxes = document.querySelectorAll('.glass-box');
                const textElements = document.querySelectorAll('.animated-text');
                if (titleBox) elementsToAnimate.push(titleBox);
                if (glassBoxes) glassBoxes.forEach(box => elementsToAnimate.push(box as HTMLElement));
                if (textElements) textElements.forEach(text => elementsToAnimate.push(text as HTMLElement));

                if (isVisible) {
                    elementsToAnimate.forEach(element => {
                        if (element.dataset.animation) {
                            element.style.animation = element.dataset.animation;
                        }
                    });
                } else {
                    elementsToAnimate.forEach(element => {
                        element.style.opacity = '0';
                        element.style.animation = 'none';
                    });
                }
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    activateAnimations(entry.isIntersecting);
                });
            }, { threshold: 0.2 });

            const aboutUsSection = document.getElementById('about-us');
            if (aboutUsSection) {
                observer.observe(aboutUsSection);
                activateAnimations(false);
            }

            return () => {
                if (aboutUsSection) {
                    observer.unobserve(aboutUsSection);
                }
            };
        }, []);

        return (
            <Flex
                id="about-us"
                minH={'100vh'}
                h={'auto'}
                bg="black"
                flexDirection={'column'}
                w={'100%'}
                py={{ base: 12, md: 16, lg: 24 }}
                px={{ base: 4, md: 6, lg: 8 }}
                position="relative"
                overflow="hidden"
                isolation="isolate"
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
                    style={{
                        pointerEvents: 'none',
                    }}
                >
                    <ParticleAnimation />
                </Box>
                <Box
                    display="flex"
                    flexDirection={{ base: 'column', lg: 'row' }}
                    fontFamily="'Inter', sans-serif"
                    justifyContent={'space-between'}
                    gap={{ base: 4, md: 6, lg: 8 }}
                    py={{ base: 8, md: 10, lg: 14 }}
                    px={{ base: 4, md: 10, lg: 24 }}
                    position="relative"
                    zIndex={1}
                    className="content-box"
                    sx={{
                        '@keyframes fadeIn': {
                            '0%': { opacity: 0 },
                            '100%': { opacity: 1 }
                        },
                        animation: "fadeIn 1.5s ease-out"
                    }}
                >
                    <Box
                        id="about-us-title-box"
                        w={{ base: '100%', lg: '50%' }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        opacity="0"
                        transform="translateY(20px)"
                        data-animation="fadeInUp 0.8s ease-out forwards"
                        sx={{
                            '@keyframes fadeInUp': {
                                '0%': { opacity: 0, transform: 'translateY(20px)' },
                                '100%': { opacity: 1, transform: 'translateY(0)' }
                            }
                        }}
                    >
                        <Heading
                            as="h2"
                            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                            textAlign="center"
                            fontFamily="'Roboto', sans-serif"
                            color="white"
                        >
                            Sobre Nosotros
                        </Heading>
                    </Box>
                    <Box
                        id="about-us-description-box"
                        w={{ base: '100%', lg: '50%' }}
                        display="flex"
                        alignItems="center"
                        className="description-text"
                        opacity="1"
                        zIndex={2}
                    >
                        <Text
                            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                            textAlign="justify"
                            color="white"
                            style={{
                                textShadow: "0 0 10px rgba(255,255,255,0.3)"
                            }}
                        >
                            LumiAI es una plataforma innovadora que combina la <strong>inteligencia artificial
                            </strong> con la <strong>psicología moderna</strong>. Nuestro objetivo es ofrecer
                            un espacio seguro y accesible para que las personas puedan explorar sus emociones y
                            recibir apoyo en su bienestar mental. Con LumiAI, buscamos democratizar el acceso a
                            la salud mental, brindando herramientas efectivas y personalizadas para cada individuo.
                        </Text>
                    </Box>
                </Box>
                <Grid
                    w={'100%'}
                    px={{ base: 4, md: 10, lg: 24 }}
                    py={{ base: 8, md: 10, lg: 14 }}
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(12, 1fr)'
                    }}
                    gap={{ base: 6, md: 8, lg: 10 }}
                    position="relative"
                    zIndex={1}
                    mb={{ base: 4, md: 6, lg: 8 }}
                >
                    <GridItem colSpan={{ base: 1, md: 2, lg: 5 }}>
                        <Box
                            className="glass-box"
                            borderRadius={'16px'}
                            bg="rgba(255, 255, 255, 0.13)"
                            backdropFilter="blur(9.6px)"
                            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                            p={8}
                            transition="all 0.3s ease"
                            h="100%"
                            position="relative"
                            overflow="hidden"
                            border="1px solid rgba(255, 255, 255, 0.18)"
                            _hover={{
                                bg: "rgba(255, 255, 255, 0.18)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                                transform: "translateY(-5px)"
                            }}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            opacity="0"
                            transform="translateY(30px)"
                            data-animation="fadeInUp 0.8s ease-out 0.5s forwards"
                            sx={{
                                '@keyframes fadeInUp': {
                                    '0%': { opacity: 0, transform: 'translateY(30px)' },
                                    '100%': { opacity: 1, transform: 'translateY(0)' }
                                }
                            }}
                        >
                            <Text
                                className="animated-text"
                                fontSize="60px"
                                textAlign="center"
                                color="white"
                                fontFamily="'Roboto', sans-serif"
                                fontWeight="bold"
                                textShadow="0 2px 10px rgba(0,0,0,0.2)"
                                position="relative"
                                zIndex={1}
                                opacity="0"
                                data-animation="fadeIn 1s ease-out 1.1s both"
                                sx={{
                                    '@keyframes fadeIn': {
                                        '0%': { opacity: 0 },
                                        '100%': { opacity: 1 }
                                    }
                                }}
                            >
                                +1,000,000 usuarios satisfechos
                            </Text>
                            <Text
                                className="animated-text"
                                fontSize="2xl"
                                textAlign="center"
                                color="rgba(255,255,255,0.9)"
                                fontFamily="'Roboto', sans-serif"
                                position="relative"
                                zIndex={1}
                                opacity="0"
                                data-animation="fadeIn 1s ease-out 1.3s both"
                                sx={{
                                    '@keyframes fadeIn': {
                                        '0%': { opacity: 0 },
                                        '100%': { opacity: 1 }
                                    }
                                }}
                            >
                                Ayudando a las personas a encontrar su camino hacia el bienestar emocional.
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 2, lg: 4 }}>
                        <Box
                            className="glass-box"
                            borderRadius={'16px'}
                            bg="rgba(255, 255, 255, 0.13)"
                            backdropFilter="blur(9.6px)"
                            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                            p={6}
                            transition="all 0.3s ease"
                            h="100%"
                            position="relative"
                            overflow="hidden"
                            _hover={{
                                bg: "rgba(255, 255, 255, 0.18)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                                transform: "translateY(-5px)"
                            }}
                            border="1px solid rgba(255, 255, 255, 0.18)"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            opacity="0"
                            transform="translateY(30px)"
                            data-animation="fadeInUp 0.8s ease-out 0.7s forwards"
                            sx={{
                                '@keyframes fadeInUp': {
                                    '0%': { opacity: 0, transform: 'translateY(30px)' },
                                    '100%': { opacity: 1, transform: 'translateY(0)' }
                                }
                            }}
                        >
                            <Text
                                className="animated-text"
                                fontSize="4xl"
                                textAlign="center"
                                color="white"
                                fontFamily="'Roboto', sans-serif"
                                fontWeight="bold"
                                position="relative"
                                zIndex={1}
                                opacity="0"
                                data-animation="fadeIn 1s ease-out 1.2s both"
                                sx={{
                                    '@keyframes fadeIn': {
                                        '0%': { opacity: 0 },
                                        '100%': { opacity: 1 }
                                    }
                                }}
                            >
                                Algoritmos avanzados e Inteligencia Artificial
                            </Text>
                            <Text
                                className="animated-text"
                                fontSize="2xl"
                                textAlign="center"
                                color="rgba(255,255,255,0.9)"
                                fontFamily="'Roboto', sans-serif"
                                mt={4}
                                position="relative"
                                zIndex={1}
                                opacity="0"
                                data-animation="fadeIn 1s ease-out 1.4s both"
                                sx={{
                                    '@keyframes fadeIn': {
                                        '0%': { opacity: 0 },
                                        '100%': { opacity: 1 }
                                    }
                                }}
                            >
                                Nuestro sistema utiliza modelos de IA de vanguardia para ofrecer respuestas precisas y personalizadas.
                            </Text>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 2, lg: 3 }}>
                        <Box
                            className="glass-box"
                            borderRadius={'16px'}
                            bg="rgba(255, 255, 255, 0.13)"
                            backdropFilter="blur(9.6px)"
                            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                            p={6}
                            transition="all 0.3s ease"
                            h="100%"
                            position="relative"
                            overflow="hidden"
                            _hover={{
                                bg: "rgba(255, 255, 255, 0.18)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                                transform: "translateY(-5px)"
                            }}
                            border="1px solid rgba(255, 255, 255, 0.18)"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            opacity="0"
                            transform="translateY(30px)"
                            data-animation="fadeInUp 0.8s ease-out 0.9s forwards"
                            sx={{
                                '@keyframes fadeInUp': {
                                    '0%': { opacity: 0, transform: 'translateY(30px)' },
                                    '100%': { opacity: 1, transform: 'translateY(0)' }
                                }
                            }}
                        >
                            <Text
                                className="animated-text"
                                fontSize="4xl"
                                textAlign="center"
                                color="white"
                                fontFamily="'Roboto', sans-serif"
                                fontWeight="bold"
                                position="relative"
                                zIndex={1}
                                opacity="0"
                                data-animation="fadeIn 1s ease-out 1.3s both"
                                sx={{
                                    '@keyframes fadeIn': {
                                        '0%': { opacity: 0 },
                                        '100%': { opacity: 1 }
                                    }
                                }}
                            >
                                Para latinoamérica
                            </Text>
                            <Text
                                className="animated-text"
                                fontSize="2xl"
                                textAlign="center"
                                color="rgba(255,255,255,0.9)"
                                fontFamily="'Roboto', sans-serif"
                                mt={4}
                                position="relative"
                                zIndex={1}
                                opacity="0"
                                data-animation="fadeIn 1s ease-out 1.5s both"
                                sx={{
                                    '@keyframes fadeIn': {
                                        '0%': { opacity: 0 },
                                        '100%': { opacity: 1 }
                                    }
                                }}
                            >
                                LumiAI está diseñado para entender y adaptarse a las necesidades culturales y emocionales de la región.
                            </Text>
                        </Box>
                    </GridItem>
                </Grid>
            </Flex>
        );
    };

    const HowDoesWork = () => {
        const containerRef = useRef(null);
        const isInView = useInView(containerRef, { once: false, amount: 0.2 });
        const controls = useAnimation();
        const [activeStep, setActiveStep] = useState(0);

        const containerVariants = {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.3
                }
            }
        };

        const itemVariants = {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        };

        const steps = [
            {
                title: "Interacción Inicial",
                description: "LumiAI comienza a conocerte a través de conversaciones naturales, estableciendo una base para entender tus necesidades emocionales.",
                icon: FaUserCog,
                color: "blue.400"
            },
            {
                title: "Aprendizaje Continuo",
                description: "Con cada interacción, nuestro sistema aprende más sobre tus patrones de pensamiento, emociones y comportamientos.",
                icon: FaBrain,
                color: "purple.400"
            },
            {
                title: "Análisis Personalizado",
                description: "Utilizamos algoritmos avanzados para analizar tus datos y crear un perfil emocional único adaptado a ti.",
                icon: FaChartLine,
                color: "green.400"
            },
            {
                title: "Diagnóstico y Recomendaciones",
                description: "Basándonos en el análisis, te ofrecemos perspectivas sobre tu bienestar emocional y estrategias personalizadas para mejorarlo.",
                icon: FaClipboardCheck,
                color: "orange.400"
            }
        ];

        useEffect(() => {
            if (isInView) {
                controls.start("visible");

                const interval = setInterval(() => {
                    setActiveStep((prev) => (prev + 1) % steps.length);
                }, 4000);

                return () => clearInterval(interval);
            } else {
                controls.start("hidden");
            }
        }, [isInView, controls, steps.length]);

        const timelineDirection = useBreakpointValue({ base: "column", md: "row" });
        const stepWidth = useBreakpointValue({ base: "100%", md: "25%" });
        const circleSize = useBreakpointValue({ base: "40px", md: "50px", lg: "60px" });
        const iconSize = useBreakpointValue({ base: 5, md: 6, lg: 7 });

        return (
            <Box
                id="how-does-it-work"
                minH={'100vh'}
                h={'auto'}
                py={{ base: 12, md: 16, lg: 24 }}
                px={{ base: 4, md: 6, lg: 8 }}
                bg={'gray.900'}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
                ref={containerRef}
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient="linear(to-b, gray.900, purple.900, blue.900)"
                    opacity={0.6}
                    zIndex={0}
                />

                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                    style={{
                        width: '100%',
                        zIndex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <motion.div variants={itemVariants}>
                        <Heading
                            as="h2"
                            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                            textAlign="center"
                            color="white"
                            mb={3}
                        >
                            ¿Cómo Funciona?
                        </Heading>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Text
                            textAlign="center"
                            mb={12}
                            fontSize={{ base: "md", md: "lg", lg: "xl" }}
                            color="whiteAlpha.800"
                            maxW="800px"
                        >
                            LumiAI utiliza inteligencia artificial avanzada para crear una experiencia personalizada
                            que se adapta a tus necesidades y aprende continuamente para brindarte diagnósticos precisos.
                        </Text>
                    </motion.div>

                    <Box w="100%" maxW="1200px" mt={10}>
                        <Stack
                            direction={timelineDirection as StackDirection | undefined}
                            spacing={{ base: 8, md: 0 }}
                            justify="center"
                            align="center"
                            w="100%"
                            position="relative"
                        >
                            {timelineDirection === "row" && (
                                <Box
                                    position="absolute"
                                    height="2px"
                                    bg="gray.600"
                                    w="80%"
                                    top="30px"
                                    zIndex={0}
                                />
                            )}

                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    style={{ width: stepWidth }}
                                >
                                    <VStack spacing={4} position="relative" align="center">
                                        <Circle
                                            size={circleSize}
                                            bg={index === activeStep ? step.color : "gray.700"}
                                            borderWidth={3}
                                            borderColor={index === activeStep ? "white" : "gray.500"}
                                            color="white"
                                            boxShadow={index === activeStep ? "0 0 15px" + step.color : "none"}
                                            zIndex={1}
                                            as={motion.div}
                                            animate={{
                                                scale: index === activeStep ? [1, 1.1, 1] : 1,
                                                transition: { duration: 0.5, repeat: index === activeStep ? Infinity : 0, repeatType: "reverse" }
                                            }}
                                        >
                                            <Icon as={step.icon} boxSize={iconSize} />
                                        </Circle>

                                        <Heading
                                            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                                            color={index === activeStep ? "white" : "gray.400"}
                                            textAlign="center"
                                            fontWeight={index === activeStep ? "bold" : "medium"}
                                            transition="all 0.3s ease"
                                        >
                                            {step.title}
                                        </Heading>

                                        <Box
                                            as={motion.div}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: index === activeStep ? 1 : 0.6,
                                                height: "auto",
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <Text
                                                color={index === activeStep ? "whiteAlpha.900" : "whiteAlpha.700"}
                                                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                                                textAlign="center"
                                                px={4}
                                            >
                                                {step.description}
                                            </Text>
                                        </Box>
                                    </VStack>
                                </motion.div>
                            ))}
                        </Stack>
                    </Box>

                    <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                        gap={8}
                        w="100%"
                        maxW="1200px"
                        mt={{ base: 16, md: 20, lg: 24 }}
                    >
                        <GridItem as={motion.div} variants={itemVariants}>
                            <Box
                                bg="rgba(26, 32, 44, 0.8)"
                                backdropFilter="blur(10px)"
                                borderRadius="lg"
                                borderWidth="1px"
                                borderColor="purple.700"
                                p={6}
                                boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
                                h="100%"
                                transition="transform 0.3s, box-shadow 0.3s"
                                _hover={{
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)"
                                }}
                            >
                                <Icon as={FaUserCog} boxSize={8} color="blue.400" mb={4} />
                                <Heading fontSize="xl" color="white" mb={3}>Totalmente Personalizable</Heading>
                                <Text color="whiteAlpha.800">
                                    Configura a LumiAI según tus preferencias y necesidades. Desde el tono de la conversación
                                    hasta los temas que prefieres explorar, tú tienes el control.
                                </Text>
                            </Box>
                        </GridItem>

                        <GridItem as={motion.div} variants={itemVariants}>
                            <Box
                                bg="rgba(26, 32, 44, 0.8)"
                                backdropFilter="blur(10px)"
                                borderRadius="lg"
                                borderWidth="1px"
                                borderColor="blue.700"
                                p={6}
                                boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
                                h="100%"
                                transition="transform 0.3s, box-shadow 0.3s"
                                _hover={{
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)"
                                }}
                            >
                                <Icon as={FaBrain} boxSize={8} color="purple.400" mb={4} />
                                <Heading fontSize="xl" color="white" mb={3}>Aprendizaje Adaptativo</Heading>
                                <Text color="whiteAlpha.800">
                                    Nuestro sistema se adapta continuamente a tus respuestas, aprendiendo de cada interacción
                                    para ofrecerte un apoyo cada vez más preciso y relevante.
                                </Text>
                            </Box>
                        </GridItem>

                        <GridItem as={motion.div} variants={itemVariants} colSpan={{ base: 1, md: 2, lg: 1 }}>
                            <Box
                                bg="rgba(26, 32, 44, 0.8)"
                                backdropFilter="blur(10px)"
                                borderRadius="lg"
                                borderWidth="1px"
                                borderColor="green.700"
                                p={6}
                                boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
                                h="100%"
                                transition="transform 0.3s, box-shadow 0.3s"
                                _hover={{
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)"
                                }}
                            >
                                <Icon as={FaClipboardCheck} boxSize={8} color="green.400" mb={4} />
                                <Heading fontSize="xl" color="white" mb={3}>Diagnósticos Precisos</Heading>
                                <Text color="whiteAlpha.800">
                                    Basándose en investigaciones psicológicas y en tu historial de interacciones, LumiAI
                                    proporciona insights valiosos y recomendaciones específicas para tu bienestar emocional.
                                </Text>
                            </Box>
                        </GridItem>
                    </Grid>
                </motion.div>
            </Box>
        );
    };

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