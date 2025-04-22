import React, { useState } from 'react';
import {
    Flex,
    Text,
    Box,
    InputGroup,
    Textarea,
} from '@chakra-ui/react';

import { IoMdSend } from "react-icons/io";

import AudioVisualizerCircle from './AudioVisualizerCircle';

const ChatBot: React.FC = () => {
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState<string[]>([]); // State to store messages

    const handleSendMessage = () => {
        if (msg.trim() !== '') {
            setMessages([...messages, msg]); // Add the new message to the list
            setMsg(''); // Clear the input field
        }
    };

    return (
        <Flex
            w={"100vw"} // Cambia de 100vh a 100vw para ocupar todo el ancho de la pantalla
            h={"100vh"} // Mantén 100vh para ocupar toda la altura de la pantalla
            justifyContent={"center"}
            bgColor={"gray.500"}
            flexDirection={"column"}
        >
            <Box
                pt={"20px"}
            >
                <Text
                    fontSize={"100px"}
                    fontWeight={"bold"}
                    color={"white"}
                    textAlign={"center"}
                >
                    Lumi AI
                </Text>
            </Box>

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
            >
                <AudioVisualizerCircle prompt='what' />
            </Box>

            <Box
                justifyContent={"center"}
                display={"flex"}
                alignItems={"center"}
                w={"100%"}
                p={4} // Padding para separar el input del borde
            >
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    width="70%"
                    position="relative"
                    gap={2}
                    border="1px solid" // Añadir borde al Flex
                    borderColor="gray.300" // Color del borde
                    borderRadius="xl" // Bordes más redondeados (opciones: sm, md, lg, xl, 2xl, o "20px")
                    p={2} // Padding interno
                    _focus={{ // Aplicar el focus al contenedor
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px blue.500',
                        outline: 'none'
                    }}
                    _focusWithin={{ // Estilo cuando un elemento hijo tiene focus
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px blue.500'
                    }}
                    bg="white" // Fondo blanco para el contenedor
                >
                    <Textarea
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Type your message here..."
                        resize="none"
                        size="lg"
                        border="none" // Eliminar el borde del Textarea
                        _focus={{
                            outline: 'none',
                            border: 'none',
                            boxShadow: 'none'
                        }} // Eliminar el focus del Textarea
                        bg="transparent" // Fondo transparente
                    />
                    <Box
                        as="button"
                        onClick={handleSendMessage}
                        cursor="pointer"
                        _hover={{ color: 'gray.700' }}
                        _active={{ transform: 'scale(0.7)' }}
                        _focus={{ outline: 'none' }}
                        transition="all 0.2s ease-in-out"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="40px"
                        width="40px"
                        bgColor="gray.100"
                        borderRadius="md"
                    >
                        <IoMdSend
                            size={24}
                            color="gray.500"
                        />
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
};

export default ChatBot;