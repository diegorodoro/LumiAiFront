import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Box,
    Spinner,
    Alert,
    AlertIcon,
    useToast
} from '@chakra-ui/react';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface UserInfo {
    uid?: string;
    preferencias?: {
        nombre?: string;
        pronombre?: string;
        tono?: string;
        objetivo?: string;
        intereses?: string[];
    };
}

const UserModal: React.FC<UserModalProps> = ({
    isOpen,
    onClose
}) => {
    const [info, setInfo] = useState<UserInfo | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (isOpen) {
            loadUserInfo();
        }
    }, [isOpen]);

    const loadUserInfo = () => {
        setLoading(true);
        setError('');

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Token no disponible");
            setLoading(false);
            return;
        }
        fetch("https://lumiapi-luzj.onrender.com/recuperarinfouser", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            credentials: "include"  // Esto permite enviar cookies cross-origin si existen
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setInfo(data);
                    console.log("Información del usuario cargada:", data);
                }
                setLoading(false);
            })
            .catch(err => {
                setError("Error al conectar con el servidor: " + err.message);
                console.error("Error al cargar información del usuario:", err);
                setLoading(false);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast({
            title: "Sesión cerrada",
            description: "Has cerrado sesión correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
        navigate("/");
    }; return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent>
                <ModalHeader>Perfil de Usuario</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loading ? (
                        <VStack spacing={4} py={8}>
                            <Spinner size="xl" color="blue.500" />
                            <Text>Cargando información del usuario...</Text>
                        </VStack>
                    ) : error ? (
                        <Alert status="error">
                            <AlertIcon />
                            {error}
                        </Alert>
                    ) : info && (
                        <VStack spacing={6} align="center">                            <Avatar
                                size="xl"
                                name={info.preferencias?.nombre || "Usuario"}
                                src="https://bit.ly/broken-link"
                                bg="blue.500"
                            />

                            <VStack spacing={1} align="center">
                                <Text fontWeight="bold" fontSize="xl">{info.preferencias?.nombre || "Usuario"}</Text>
                                <Text color="gray.500">ID: {info.uid || "No disponible"}</Text>
                            </VStack>

                            <Divider />

                            {info.preferencias && (
                                <Box w="100%">
                                    <Text fontWeight="bold" mb={2}>Preferencias</Text>
                                    <Text>Pronombre: {info.preferencias.pronombre || "No especificado"}</Text>
                                    <Text>Tono: {info.preferencias.tono || "No especificado"}</Text>
                                    <Text>Objetivo: {info.preferencias.objetivo || "No especificado"}</Text>
                                    {info.preferencias.intereses && (
                                        <Text>Intereses: {info.preferencias.intereses.join(", ")}</Text>
                                    )}
                                </Box>
                            )}                            <Box w="100%" mt={4}>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    w="100%"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </Button>
                            </Box>
                        </VStack>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UserModal;