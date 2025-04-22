import { Box, VStack, Text, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";


const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Función para alternar el estado del sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    // Ancho del sidebar cuando está cerrado
    const closedWidth = '70px';


    return (
        <Flex
            width={isSidebarOpen ? "250px" : closedWidth} // Usar closedWidth para mantener consistencia
            height="100vh"
            bg="gray.800"
            color="white"
            transition="width 0.3s ease-in-out"
            position="relative"
            justifyContent={"center"}
        >
            <VStack
                align="flex-start" // Cambiar a flex-start para alinear los botones a la izquierda
                p={5}
                width="100%"
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Box
                    w={'100%'}
                    display={"block"}
                    margin={"0 auto"}
                    textAlign={"center"}
                >
                    <MdMenu
                        size={24}
                        color="white"
                        onClick={toggleSidebar}
                        style={{
                            transform: isSidebarOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease-in-out'
                        }}
                    />
                </Box>
                
                <VStack
                    alignItems="flex-start" // Alinear los botones a la izquierda
                    width="100%"
                    gap={4}
                >
                    <Box
                        borderRadius="full" // Hace el botón redondo
                        _hover={{ bg: "gray.700", cursor: "pointer", transform: "scale(1.1)" }} // Efecto hover
                        w={"80%"} // Asegura que el botón ocupe todo el ancho
                    >
                        <Flex
                            gap={3}
                            align={"center"}
                        >
                            <Box>
                                <IoMdSettings size={30} />
                            </Box>
                            <Text
                                fontSize="md"
                                color="white"
                                style={{
                                    transform: isSidebarOpen
                                        ? 'translateX(0) scale(1)'
                                        : 'translateX(-10px) scale(0.8)',
                                    transformOrigin: 'left center',
                                    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Configuración
                            </Text>
                        </Flex>
                    </Box>

                    <Box
                        borderRadius="full" // Hace el botón redondo
                        _hover={{ bg: "gray.700", cursor: "pointer", transform: "scale(1.1)" }} // Efecto hover
                        w={"80%"} // Asegura que el botón ocupe todo el ancho
                    >
                        <Flex
                            gap={3}
                            align={"center"}
                        >
                            <Box>
                                <FaUserCircle size={30} />
                            </Box>
                            <Text
                                fontSize="md"
                                color="white"
                                style={{
                                    opacity: isSidebarOpen ? 1 : 0,
                                    transform: isSidebarOpen
                                        ? 'translateX(0) scale(1)'
                                        : 'translateX(-10px) scale(0.8)',
                                    transformOrigin: 'left center',
                                    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Perfil
                            </Text>
                        </Flex>
                    </Box>
                </VStack>
            </VStack >
        </Flex>
    )
}

export default Sidebar;
