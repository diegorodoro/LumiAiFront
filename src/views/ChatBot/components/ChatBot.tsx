import React, { useState, useRef, useEffect } from 'react';
import {
    Flex,
    Text,
    Box,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { IoMdSend } from "react-icons/io";
import { getAuth } from "firebase/auth";
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

            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const idToken = await user.getIdToken();

                fetch('https://lumiapi-luzj.onrender.com/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${idToken}`,
                    },
                    body: JSON.stringify({ mensaje: msg }),
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        setMessages(prev => [...prev, { text: data.respuesta, isUser: false }]);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        navigate('/error');
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
            w="100vw"
            h="100vh"
            flexDirection="column"
            justifyContent="center"
            bgGradient="linear(to-b, gray.100, gray.300)"
            overflow="hidden"
        >
            <Box pt="20px" mb={4}>
                <Text
                    fontSize="32px"
                    fontWeight="bold"
                    color="gray.800"
                    textAlign="center"
                    letterSpacing="wide"
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
                bg="whiteAlpha.600"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                boxShadow="lg"
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'gray.400',
                        borderRadius: '8px',
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
                                bgColor={message.isUser ? "gray.700" : "gray.200"}
                                color={message.isUser ? "white" : "gray.800"}
                                boxShadow="md"
                                transition="all 0.3s"
                            >
                                <Text>{message.text}</Text>
                            </Box>
                        </Flex>
                    ))}
                    <div ref={messagesEndRef} />
                </VStack>
            </Box>

            <Box
                justifyContent="center"
                display="flex"
                alignItems="center"
                w="100%"
                p={4}
                bg="transparent"
            >
                <Flex
                    flexDirection="row"
                    alignItems="center"
                    width="70%"
                    gap={2}
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="xl"
                    p={2}
                    bg="whiteAlpha.800"
                    backdropFilter="blur(8px)"
                    boxShadow="md"
                    _focusWithin={{
                        borderColor: 'gray.600',
                        boxShadow: '0 0 0 1px gray.600'
                    }}
                >
                    <Textarea
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type your message..."
                        resize="none"
                        size="lg"
                        border="none"
                        _focus={{
                            outline: 'none',
                            border: 'none',
                            boxShadow: 'none'
                        }}
                        bg="transparent"
                        color="gray.800"
                    />
                    <Box
                        as="button"
                        onClick={handleSendMessage}
                        cursor="pointer"
                        _hover={{ bgColor: 'gray.200' }}
                        _active={{ transform: 'scale(0.95)' }}
                        _focus={{ outline: 'none' }}
                        transition="all 0.2s ease-in-out"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="40px"
                        width="40px"
                        bgColor="gray.100"
                        borderRadius="md"
                        boxShadow="sm"
                    >
                        <IoMdSend size={22} color="gray.600" />
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
};

export default ChatBot;
