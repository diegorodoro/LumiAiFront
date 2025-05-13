import React, { useEffect } from 'react';
import { Flex, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/SideBar';
import ChatBotComponent from './components/ChatBot';
import { useAuth } from '../../contexts/AuthContext';

const ChatBot: React.FC = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (!token) {
            toast({
                title: "Sesión no válida",
                description: "Por favor inicia sesión para acceder",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            navigate("/");
        }
    }, [token, navigate, toast]);

    return (
        <>
            <Flex flexDirection="row">
                <Sidebar />
                <ChatBotComponent />
            </Flex>
        </>
    );
};

export default ChatBot;