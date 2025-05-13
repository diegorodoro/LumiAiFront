import React, { useState, useRef, useEffect } from 'react';
import {
    Flex,
    Text,
    Box,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { IoMdSend } from "react-icons/io";
import { getAuth } from "firebase/auth"; // Importación de Firebase Auth
import { useNavigate } from 'react-router-dom';

interface Message {
    text: string;
    isUser: boolean;
}

const ChatBot: React.FC = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (msg.trim() !== '') {
            setMessages([...messages, { text: msg, isUser: true }]);
     
            // Obtener el token del usuario autenticado
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const idToken = await user.getIdToken(); // Obtener el token
     
                fetch('https://lumiapi-luzj.onrender.com/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${idToken}`, // Incluir el token en el encabezado
                    },
                    body: JSON.stringify({ mensaje: msg }),
                    credentials: 'include'  // Importante para CORS
                })
                .then(res => res.json())
                .then(data => {
                    setMessages(prev => [...prev, { text: data.respuesta, isUser: false }]);
                })
                .catch(error => {
                    console.error("Error:", error);
                    navigate('/error'); // Redirige a la pantalla de error
                });
     
                setMsg('');
            } else {
                console.log("No estás autenticado.");
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Flex
            w={"100vw"}
            h={"100vh"}
            justifyContent={"center"}
            bgColor={"gray.500"}
            flexDirection={"column"}
            overflow="hidden"
        >
            <Box pt={"20px"} mb={4}>
                <Text
                    fontSize={["30px", "30px", "30px"]}
                    fontWeight={"bold"}
                    color={"white"}
                    textAlign={"center"}
                >
                    Lumi AI
                </Text>
            </Box>

            <Box
                flex="1"
                width="100%"
                maxW="70%"
                mx="auto"
                mb={4}
                overflowY="auto"
                overflowX="hidden"
                px={4}
                bgColor="rgba(255, 255, 255, 0.1)"
                borderRadius="xl"
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.5)'
                        }
                    }
                }}
            >
                <VStack spacing={4} align="stretch" p={4}>
                    {messages.map((message, index) => (
                        <Flex key={index} justify={message.isUser ? "flex-end" : "flex-start"}>
                            <Box
                                maxW="70%"
                                p={3}
                                borderRadius="lg"
                                bgColor={message.isUser ? "blue.500" : "gray.700"}
                                color="white"
                                boxShadow="md"
                                wordBreak="break-word"
                                overflowWrap="break-word"
                            >
                                <Text wordBreak="break-word">{message.text}</Text>
                            </Box>
                        </Flex>
                    ))}
                    <div ref={messagesEndRef} />
                </VStack>
            </Box>

            <Box justifyContent={"center"} display={"flex"} alignItems={"center"} w={"100%"} p={4}>
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    width="70%"
                    position="relative"
                    gap={2}
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="xl"
                    p={2}
                    _focusWithin={{
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px blue.500'
                    }}
                    bg="rgba(255, 255, 255, 0.7)"
                >
                    <Textarea
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message here..."
                        resize="none"
                        size="lg"
                        border="none"
                        _focus={{
                            outline: 'none',
                            border: 'none',
                            boxShadow: 'none'
                        }}
                        bg="transparent"
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
