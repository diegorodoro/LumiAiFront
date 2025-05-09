import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      const token = await userCredential.user.getIdToken();

      const response = await fetch("https://lumiapi-luzj.onrender.com/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Registro exitoso, respuesta del backend:", data);

      toast({
        title: "Registro exitoso",
        description: "Redirigiendo a preferencias...",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/chatbot");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Error al registrar:", errorMsg);
      toast({
        title: "Error",
        description: errorMsg,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await fetch("https://lumiapi-luzj.onrender.com/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Registro con Google exitoso:", data);

      toast({
        title: "Registro con Google exitoso",
        description: "Redirigiendo a preferencias...",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/preferencias");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Error con Google:", errorMsg);
      toast({
        title: "Error con Google",
        description: errorMsg,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.100"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        w="full"
        maxW="400px"
      >
        <Heading mb={6} textAlign="center">Crear cuenta</Heading>
        <form onSubmit={handleSignUp}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nombre completo</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ingresa tu nombre"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirmar contraseña</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Vuelve a ingresar tu contraseña"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Registrarse
            </Button>
          </VStack>
        </form>

        <Divider my={6} />

        <Button colorScheme="red" width="full" onClick={handleGoogleSignUp}>
          Registrarse con Google
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;