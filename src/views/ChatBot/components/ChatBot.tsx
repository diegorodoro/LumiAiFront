import React, { useState, useRef, useEffect } from 'react';
import {
    Flex,
    Text,
    Box,
    Textarea,
    VStack,
} from '@chakra-ui/react';

import { IoMdSend } from "react-icons/io";

import AudioVisualizerCircle from './AudioVisualizerCircle';

interface Message {
    text: string;
    isUser: boolean;
}

const ChatBot: React.FC = () => {
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState<Message[]>([]); // Updated to store message type
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (msg.trim() !== '') {
            // Add user message
            setMessages([...messages, { text: msg, isUser: true }]);

            // Simulate bot response (you would replace this with actual API call)
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: `Response to: ${msg}`,
                    isUser: false
                }]);
            }, 1000);

            setMsg(''); // Clear the input field
        }
    };

    // Handle Enter key press
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
            overflow="hidden" // Prevent any overflow on the main container
        >
            <Box pt={"20px"} mb={4}>
                <Text
                    fontSize={["30px", "30px", "30px"]} // Responsive font size
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
                <AudioVisualizerCircle prompt={messages.length > 0 ? messages[messages.length - 1].text : ''} />
            </Box>

            {/* Messages container */}
            <Box
                flex="1"
                width="100%"
                maxW="70%"
                mx="auto"
                mb={4}
                overflowY="auto"
                overflowX="hidden" // Prevent horizontal overflow in messages container
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
                                wordBreak="break-word" // Break long words if needed
                                overflowWrap="break-word" // Ensure words wrap properly
                            >
                                <Text wordBreak="break-word">{message.text}</Text>
                            </Box>
                        </Flex>
                    ))}
                    <div ref={messagesEndRef} />
                </VStack>
            </Box>

            <Box
                justifyContent={"center"}
                display={"flex"}
                alignItems={"center"}
                w={"100%"}
                p={4}
            >
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
                    bg="rgba(255, 255, 255, 0.7)"  // Changed from "white" to semi-transparent
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