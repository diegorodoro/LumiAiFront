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
  Select,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
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
  const [pronombre, setPronombre] = useState('');
  const [fetchResponse, setFetchResponse] = useState('');
  const [tokenStatus, setTokenStatus] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  interface Preferencias {
    nombre: string;
    tono: string;
    intereses: string[];
    objetivo: string;
    pronombre: string;
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({
        title: "Contraseña demasiado corta",
        description: "La contraseña debe tener al menos 6 caracteres",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    try {
      // 1. Registrar usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar el perfil con el nombre
      await updateProfile(user, {
        displayName: name,
      });

      // 2. Obtener el token de autenticación
      const token = await user.getIdToken();

      // Guardar el token en el contexto de autenticación
      setToken(token);
      setTokenStatus(`TOKEN GUARDADO EN CONTEXTO: ${token.substring(0, 20)}...`);
      console.log("%c TOKEN GUARDADO EN CONTEXTO: ", "background: #222; color: #bada55; font-size: 16px");
      console.log(token);

      // 3. Enviar preferencias (incluyendo nombre) al backend Flask
      const preferencias: Preferencias = {
        nombre: name,
        tono: "amigable",
        intereses: ["tecnología", "ciencia"],
        objetivo: "mejorar mi bienestar emocional",
        pronombre: pronombre,
      };

      try {
        const responsePref = await fetch("https://lumiapi-luzj.onrender.com/api/preferencias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(preferencias),
          credentials: "include" // Permitir envío de cookies en solicitudes cross-origin
        });

        const dataPref = await responsePref.json();
        setFetchResponse(JSON.stringify(dataPref, null, 2));

        if (responsePref.ok) {
          // Si la respuesta del servidor incluye un token, lo actualizamos en el contexto
          if (dataPref && dataPref.token) {
            setToken(dataPref.token);
            setTokenStatus(`Token actualizado desde la respuesta del servidor: ${dataPref.token.substring(0, 20)}...`);
          }
          toast({
            title: "¡Registro exitoso!",
            description: "Tu cuenta ha sido creada. Redirigiendo a preguntas...",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top"
          });
          // Se comenta la navegación para poder ver la respuesta
          // navigate("/questions");
        } else {
          toast({
            title: "Error al guardar preferencias",
            description: dataPref.error || "Ocurrió un error inesperado",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top"
          });
        }
      } catch (fetchError) {
        setFetchResponse(`Error en la solicitud fetch: ${String(fetchError)}`);
        toast({
          title: "Error de conexión",
          description: "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top"
        });
      }

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      setFetchResponse(`Error en el registro: ${errorMsg}`);
      toast({
        title: "Error al registrarse",
        description: errorMsg,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top"
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // 1. Registrar usuario con Google en Firebase Auth
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 2. Obtener el token de autenticación
      const token = await user.getIdToken();
      const fullName = user.displayName || '';

      // Guardar el token en el contexto de autenticación
      setToken(token);
      setTokenStatus(`TOKEN GUARDADO EN CONTEXTO (GOOGLE): ${token.substring(0, 20)}...`);
      console.log("%c TOKEN GUARDADO EN CONTEXTO (GOOGLE): ", "background: #222; color: #bada55; font-size: 16px");
      console.log(token);

      // En registro con Google, usamos un pronombre neutro por defecto
      const defaultPronombre = "neutro";

      // 3. Enviar preferencias al backend
      const preferencias: Preferencias = {
        nombre: fullName.trim(),
        tono: "amigable",
        intereses: ["tecnología", "ciencia"],
        objetivo: "mejorar mi bienestar emocional",
        pronombre: defaultPronombre,
      };

      try {
        const response = await fetch("https://lumiapi-luzj.onrender.com/api/preferencias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(preferencias),
          credentials: "include" // Permitir envío de cookies en solicitudes cross-origin
        });

        const data = await response.json();
        setFetchResponse(JSON.stringify(data, null, 2));

        if (response.ok) {
          // Si la respuesta del servidor incluye un token, lo actualizamos en el contexto
          if (data && data.token) {
            setToken(data.token);
            setTokenStatus(`Token actualizado desde la respuesta del servidor (Google): ${data.token.substring(0, 20)}...`);
          }
          toast({
            title: "¡Registro con Google exitoso!",
            description: "Tu cuenta ha sido creada. Redirigiendo a preguntas...",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top"
          });
          // Se comenta la navegación para poder ver la respuesta
          // navigate("/questions");
        } else {
          toast({
            title: "Error al guardar preferencias",
            description: data.error || "Ocurrió un error inesperado",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top"
          });
        }
      } catch (fetchError) {
        setFetchResponse(`Error en la solicitud fetch (Google): ${String(fetchError)}`);
        toast({
          title: "Error de conexión",
          description: "No se pudo conectar con el servidor durante el registro con Google.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top"
        });
      }

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      setFetchResponse(`Error con Google: ${errorMsg}`);
      toast({
        title: "Error al registrarse con Google",
        description: errorMsg,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top"
      });
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
                <FormLabel color="white">Pronombre preferido</FormLabel>
                <Select
                  value={pronombre}
                  onChange={(e) => setPronombre(e.target.value)}
                  placeholder="Selecciona tu pronombre"
                  bg="rgba(255, 255, 255, 0.15)"
                  color="white"
                  _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                  _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
                  sx={{
                    option: {
                      bg: "white",
                      color: "black",
                      _hover: {
                        bg: "blue.500",
                        color: "white"
                      }
                    }
                  }}
                >
                  <option value="femenino">Femenino (ella)</option>
                  <option value="masculino">Masculino (él)</option>
                  <option value="neutro">Neutro (elle)</option>
                  <option value="otro">Otro</option>
                </Select>
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

          {/* Área para mostrar el estado del token */}
          {tokenStatus && (
            <Box mt={4} p={3} bg="rgba(0, 0, 0, 0.5)" borderRadius="md">
              <Text color="green.300" fontSize="sm" fontFamily="monospace" overflowX="auto" whiteSpace="pre-wrap">
                {tokenStatus}
              </Text>
            </Box>
          )}

          {/* Área para mostrar la respuesta del fetch */}
          {fetchResponse && (
            <Box mt={4} p={3} bg="rgba(0, 0, 0, 0.5)" borderRadius="md" maxH="200px" overflowY="auto">
              <Text color="cyan.300" fontSize="sm" fontFamily="monospace" whiteSpace="pre-wrap">
                {fetchResponse}
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUp;