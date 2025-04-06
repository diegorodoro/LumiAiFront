import { Box, VStack, Text, IconButton, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { MdMenu } from "react-icons/md";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    // Función para alternar el estado del sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    // Ancho del sidebar cuando está cerrado
    const closedWidth = '70px';

    // Posición fija para el botón
    const buttonPosition = "15px";

    return (
        <Box
            bg="gray.800"
            color="white"
            w={isSidebarOpen ? '240px' : closedWidth}
            minH="100vh"
            transition="width 0.1s ease"
            position="relative"
        >
            {/* Botón de abrir/cerrar el sidebar */}
            <Flex justify='flex-start' p={3}>
                <IconButton
                    onClick={toggleSidebar}
                    border={'none'}
                    bg="transparent"
                    color="white"
                    aria-label="Toggle Sidebar"
                    position="absolute"
                    left={buttonPosition}
                    top="10px"
                >
                    {isSidebarOpen ? <MdMenu style={{ transform: 'rotate(90deg)' }} /> : <MdMenu />}
                </IconButton>
            </Flex>

            {/* Espacio para mantener el layout correcto cuando el botón está posicionado absolutamente */}
            <Box h="50px" />

            {/* Título del sidebar */}
            {isSidebarOpen && (
                <Text fontSize="2xl" mb={4} pl={10}>
                    Mi Menú
                </Text>
            )}

            {/* Contenido del Sidebar */}
            {isSidebarOpen && (
                <VStack align="start" p={3}>
                    <Text>Inicio</Text>
                    <Text>Acerca de</Text>
                </VStack>
            )}
        </Box>
    )
}

export default Sidebar