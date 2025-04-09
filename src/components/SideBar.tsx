import { Box, VStack, Text, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Función para alternar el estado del sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    // Ancho del sidebar cuando está cerrado
    const closedWidth = '70px';

    // Posición fija para el botón
    const buttonPosition = "15px";

    return (
        <Flex
            width={isSidebarOpen ? "250px" : 'max-content'}
            height="100vh"
            bg="gray.800"
            color="white"
            transition="width 0.3s ease-in-out"
        >
            <VStack
                gap={4}
                align="center"
                p={4}
                width="100%"
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Box
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    {isSidebarOpen ?
                        <MdMenu
                            size={24}
                            color="white"
                            onClick={toggleSidebar}
                            style={{ transform: 'rotate(90deg)' }}
                        />
                        :
                        <MdMenu
                            size={24}
                            color="white"
                            onClick={toggleSidebar}
                        />
                    }
                </Box>
                <VStack
                    display={'flex'}

                >
                    <Box>
                        <FaUserCircle
                            size={30}
                        />
                    </Box>
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Sidebar;
