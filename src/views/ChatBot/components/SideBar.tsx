import {
    Box,
    VStack,
    Text,
    Flex,
    useDisclosure
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import UserModal from './UserModal';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { isOpen: isOpenUser, onOpen: onOpenUser, onClose: onCloseUser } = useDisclosure();

    // Función para alternar el estado del sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    // Ancho del sidebar cuando está cerrado
    const closedWidth = '70px';
    // Ancho del sidebar cuando está abierto
    const openWidth = '250px';

    return (
        <Flex
            width={isSidebarOpen ? openWidth : closedWidth} // Usar closedWidth para mantener consistencia
            height="100vh"
            bg="gray.800"
            color="white"
            transition="width 0.3s ease-in-out"
            position="relative"
            justifyContent={"center"}
        >
            <VStack
                p={4}
                align="center"
                justify="center"
                width="100%"
                justifyContent={"space-between"}
            >
                <Box
                    w={"100%"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    pl={1}
                >
                    <MdMenu
                        size={30}
                        color="white"
                        onClick={toggleSidebar}
                        cursor="pointer"
                        style={{
                            transform: isSidebarOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease-in-out'
                        }}
                    />
                </Box>

                <VStack
                    w={"100%"}
                    gap={2}
                >
                    <Box
                        w={"100%"}
                        h={"40px"}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        pl={1}
                        position="relative"
                        transition="all 0.3s ease-in-out"
                        borderRadius="full"
                        cursor="pointer"
                        _hover={{
                            bg: "gray.700",
                            transform: "scale(1.05)",
                        }}
                        onClick={onOpenUser} // Abre el modal de usuario al hacer clic
                    >
                        <Box position="absolute" left="4px">
                            <FaUserCircle size={30} color="white" />
                        </Box>
                        <Box
                            ml="38px" // Espacio fijo para el icono
                            overflow="hidden"
                            opacity={isSidebarOpen ? 1 : 0}
                            transition="all 0.3s ease-in-out"
                        >
                            <Text
                                fontSize="md"
                                color="white"
                                whiteSpace={'nowrap'}
                            >
                                User Name
                            </Text>
                        </Box>
                    </Box>
                </VStack>
            </VStack>

            <UserModal isOpen={isOpenUser} onClose={onCloseUser} username="Usuario" email="" />
        </Flex >
    )
}

export default Sidebar;
