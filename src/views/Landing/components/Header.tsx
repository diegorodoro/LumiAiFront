import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Button, Image, HStack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('home');
    const observerRefs = useRef<IntersectionObserver | null>(null);

    const handleScroll = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id); // Update the active section
        }
    };

    // Set up intersection observer to detect active section on scroll
    useEffect(() => {
        const sections = ['home', 'about-us', 'how-does-it-work'];

        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.6 // 60% of the element must be visible
        };

        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        // Create observer
        observerRefs.current = new IntersectionObserver(callback, options);

        // Observe all sections
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                observerRefs.current?.observe(element);
            }
        });

        // Clean up
        return () => {
            if (observerRefs.current) {
                observerRefs.current.disconnect();
            }
        };
    }, []);

    return (
        <Box
            as="header"
            py={4}
            px={8}
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex={1000}
        >
            <Flex
                align="center"
                w="100%"
                position="relative"
                pt={3}
            >
                {/* Logo on the left */}
                <Image src="/logo.png" alt="LumiAI Logo" height="40px" />

                {/* Navigation in center (absolute positioned) */}
                <HStack
                    gap={8}
                    bgColor="rgba(0, 0, 0, 0.5)"
                    borderRadius="full"
                    px={6}
                    py={2}
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    backdropFilter="blur(8px)"
                    boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)"
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 'full',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                        pointerEvents: 'none'
                    }}
                >
                    {['home', 'about-us', 'how-does-it-work'].map((section) => (
                        <Text
                            key={section}
                            as="button"
                            onClick={() => handleScroll(section)}
                            color={activeSection === section ? 'white' : 'whiteAlpha.600'}
                            borderBottom={activeSection === section ? '2px solid white' : 'none'}
                            fontWeight="semibold"
                            transition="all 0.3s ease-in-out"
                            _hover={{
                                color: 'white',
                                textShadow: '0 0 8px white, 0 0 16px white, 0 0 24px white'
                            }}
                        >
                            {section === 'home' && 'Inicio'}
                            {section === 'about-us' && 'Sobre Nosotros'}
                            {section === 'how-does-it-work' && '¿Cómo Funciona?'}
                        </Text>
                    ))}
                </HStack>

                {/* Buttons on the right */}
                <HStack spacing={4} ml="auto">
                    <Button
                        as={RouterLink}
                        to="/sign-in"
                        variant="unstyled"
                        color="white"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
                        transition="all 0.3s ease"
                        px={5}
                        py={2}
                        _hover={{
                            bg: "rgba(255, 255, 255, 0.25)",
                            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)",
                            textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
                        }}
                    >
                        Iniciar Sesión
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/signup"
                        variant="unstyled"
                        bg="rgba(0, 0, 0, 0.5)"
                        color="white"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        backdropFilter="blur(8px)"
                        boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)"
                        transition="all 0.3s ease"
                        px={5}
                        py={2}
                        position="relative"
                        overflow="hidden"
                        _before={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                            pointerEvents: 'none'
                        }}
                        _hover={{
                            bg: "rgba(255, 255, 255, 0.25)",
                            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.2)",
                            textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
                        }}
                    >
                        Comenzar
                    </Button>
                </HStack>
            </Flex>
        </Box>
    );
};

export default Header;