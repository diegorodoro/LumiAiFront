// src/layouts/MainLayout.tsx
import { Flex } from '@chakra-ui/react'
import Sidebar from '../views/ChatBot/components/SideBar'
import ChatBot from '../views/ChatBot/components/ChatBot'

const MainLayout = () => {
    return (
        <Flex
            flex-direction={"row"}
        >
            <Sidebar />
            <ChatBot />
        </Flex>
    )
}

export default MainLayout
