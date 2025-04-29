import React from 'react';
import {Flex} from '@chakra-ui/react';
import Sidebar from './components/SideBar';
import ChatBotComponent from './components/ChatBot';

const ChatBot: React.FC = () => {
    // Ejemplo de uso del modal
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