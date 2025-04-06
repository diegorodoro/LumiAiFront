// src/layouts/MainLayout.tsx
import { Box, Flex } from '@chakra-ui/react'
import Sidebar from '../components/SideBar'

const MainLayout = () => {
    return (
        <Flex>
            <Sidebar />
            <Box flex="1" p={6}>
                a
            </Box>
        </Flex>
    )
}

export default MainLayout
