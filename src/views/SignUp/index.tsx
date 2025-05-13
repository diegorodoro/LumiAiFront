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
  Flex,
  Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import ShaderCanvas from './component/backgroundEffect/ShaderCanvas';

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

      navigate("/questions");
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
      navigate("/error");
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
      navigate("/error");
    }
  };
  return (
    <Box position="relative" h="100vh" w="100%" overflow="hidden">
      {/* Background ShaderCanvas */}
      <Box position="absolute" top="0" left="0" right="0" bottom="0" zIndex="0">
        <ShaderCanvas />
      </Box>

      {/* Glass effect container */}
      <Flex
        justify="center"
        align="center"
        h="100%"
        w="100%"
        position="relative"
        zIndex="1"
      >
        <Box
          p={8}
          borderRadius="xl"
          bg="rgba(58, 52, 52, 0.56)"
          backdropFilter="blur(12px)"
          boxShadow="xl"
          border="1px solid rgba(255, 255, 255, 0.2)"
          w="full"
          maxW="400px"
        >
          <Heading mb={6} textAlign="center" color="white">Crear cuenta</Heading>
          <form onSubmit={handleSignUp}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel color="white">Nombre completo</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ingresa tu nombre"
                  bg="rgba(255, 255, 255, 0.15)"
                  color="white"
                  _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="white">Correo electrónico</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo"
                  bg="rgba(255, 255, 255, 0.15)"
                  color="white"
                  _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="white">Contraseña</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  bg="rgba(255, 255, 255, 0.15)"
                  color="white"
                  _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="white">Confirmar contraseña</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Vuelve a ingresar tu contraseña"
                  bg="rgba(255, 255, 255, 0.15)"
                  color="white"
                  _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                bg="blue.500"
                _hover={{ bg: "blue.600" }}
              >
                Registrarse
              </Button>
            </VStack>
          </form>

          <Box my={4} borderTop="1px solid rgba(255, 255, 255, 0.2)" pt={4}></Box>

          <Button
            leftIcon={<Icon as={FcGoogle} boxSize="20px" />}
            color="black"
            bg="white"
            _hover={{ bg: "gray.100" }}
            width="full"
            fontSize="sm"
            onClick={handleGoogleSignUp}
          >
            Registrar con Google
          </Button>

          <Button
            mt={4}
            variant="link"
            color="white"
            fontWeight="normal"
            onClick={() => navigate("/sign-in")}
            _hover={{ color: "blue.300" }}
          >
            ¿Ya tienes cuenta? Inicia sesión aquí
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUp;