import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Avatar,
    VStack,
    Text,
    Divider,
    Input,
    FormControl,
    FormLabel,
    Box
} from '@chakra-ui/react';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    username?: string;
    email?: string;
}

const UserModal: React.FC<UserModalProps> = ({
    isOpen,
    onClose,
    username = "Usuario",
    email = "usuario@ejemplo.com"
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent>
                <ModalHeader>Perfil de Usuario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={6} align="center">
                        <Avatar
                            size="xl"
                            name={username}
                            src="https://bit.ly/broken-link"
                            cursor="pointer"
                            _hover={{ opacity: 0.8 }}
                        />

                        <VStack spacing={1} align="center">
                            <Text fontWeight="bold" fontSize="xl">{username}</Text>
                            <Text color="gray.500">{email}</Text>
                        </VStack>

                        <Divider />

                        <FormControl>
                            <FormLabel>Nombre de usuario</FormLabel>
                            <Input defaultValue={username} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input defaultValue={email} type="email" />
                        </FormControl>

                        <Box w="100%">
                            <Button colorScheme="red" size="sm" variant="outline" w="100%">
                                Cerrar sesión
                            </Button>
                        </Box>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Guardar cambios
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UserModal;