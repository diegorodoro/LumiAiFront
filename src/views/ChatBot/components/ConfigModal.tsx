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
    FormControl,
    FormLabel,
    Switch,
    Select,
    Stack
} from '@chakra-ui/react';

// Define las propiedades que recibirá el componente
interface ConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent>
                <ModalHeader>Configuración</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4}>
                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor="dark-mode" mb="0">
                                Modo oscuro
                            </FormLabel>
                            <Switch
                                id="dark-mode"
                                defaultChecked={false}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Modelo de IA</FormLabel>
                            <Select defaultValue="gpt-4">
                                <option value="gpt-4">GPT-4</option>
                                <option value="gpt-3.5">GPT-3.5</option>
                                <option value="claude">Claude</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Idioma</FormLabel>
                            <Select defaultValue="es">
                                <option value="es">Español</option>
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                            </Select>
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Guardar
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfigModal;