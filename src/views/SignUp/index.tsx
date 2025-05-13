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
  const toast = useToast();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  interface Preferencias {
    nombre: string;
    tono: string;
    intereses: string[];
    objetivo: string;
    pronombre: string;
  }  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
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

    toast({
      title: "Procesando registro",
      description: "Por favor espera un momento...",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top"
    });

    try {
      // 1. Registrar usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar el perfil con el nombre
      await updateProfile(user, {
        displayName: name,
      });      // 2. Obtener el token de autenticación
      const token = await user.getIdToken();      // Guardar el token en el contexto de autenticación
      setToken(token);
      console.log("%c TOKEN GUARDADO EN CONTEXTO: ", "background: #222; color: #bada55; font-size: 16px");
      console.log(token);// 3. Enviar preferencias (incluyendo nombre) al backend Flask
      const preferencias: Preferencias = {
        nombre: name,
        tono: "amigable",
        intereses: ["tecnología", "ciencia"],
        objetivo: "mejorar mi bienestar emocional",
        pronombre: pronombre,
      }; console.log("Enviando solicitud a /api/preferencias con token:", token.substring(0, 20) + "...");
      console.log("Preferencias a enviar:", preferencias);
      console.log("Cookies actuales:", document.cookie);
      let responsePref;
      let dataPref;
      try {
        responsePref = await fetch("https://lumiapi-luzj.onrender.com/api/preferencias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(preferencias),
          credentials: "include" // Permitir envío de cookies en solicitudes cross-origin
        });

        console.log("Headers de la respuesta:", Object.fromEntries([...responsePref.headers.entries()]));
        console.log("Estado de la respuesta:", responsePref.status, responsePref.statusText);

        dataPref = await responsePref.json();
        console.log("Respuesta del servidor:", dataPref);

        if (responsePref.ok) {
          // Si la respuesta del servidor incluye un token, lo actualizamos en el contexto
          if (dataPref && dataPref.token) {
            setToken(dataPref.token);
            console.log("Token actualizado desde la respuesta del servidor:", dataPref.token);
          }
          toast({
            title: "¡Registro exitoso!",
            description: "Tu cuenta ha sido creada. Redirigiendo a preguntas...",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top"
          });
          navigate("/questions");
        } else {
          console.error("Error en preferencias:", dataPref.error);
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
        console.error("Error en la solicitud fetch:", fetchError);
        console.log("Error CORS o de red detectado");
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
      console.error("Error en el registro:", errorMsg); toast({
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
      toast({
        title: "Conectando con Google",
        description: "Espera un momento mientras procesamos tu solicitud...",
        status: "info",
        duration: 2000,
        isClosable: true,
        position: "top"
      });

      // 1. Registrar usuario con Google en Firebase Auth
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;      // 2. Obtener el token de autenticación
      const token = await user.getIdToken();
      const fullName = user.displayName || '';      // Guardar el token en el contexto de autenticación
      setToken(token);
      console.log("%c TOKEN GUARDADO EN CONTEXTO (GOOGLE): ", "background: #222; color: #bada55; font-size: 16px");
      console.log(token);

      // En registro con Google, usamos un pronombre neutro por defecto
      const defaultPronombre = "neutro";      // 3. Enviar preferencias al backend
      const preferencias: Preferencias = {
        nombre: fullName.trim(),
        tono: "amigable",
        intereses: ["tecnología", "ciencia"],
        objetivo: "mejorar mi bienestar emocional",
        pronombre: defaultPronombre,
      }; console.log("Enviando solicitud a /api/preferencias (Google) con token:", token.substring(0, 20) + "...");
      console.log("Preferencias a enviar (Google):", preferencias);
      console.log("Cookies actuales en registro Google:", document.cookie);
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

        console.log("Headers de la respuesta (Google):", Object.fromEntries([...response.headers.entries()]));
        console.log("Estado de la respuesta (Google):", response.status, response.statusText);

        const data = await response.json();
        console.log("Respuesta del servidor (Google):", data);

        if (response.ok) {
          // Si la respuesta del servidor incluye un token, lo actualizamos en el contexto
          if (data && data.token) {
            setToken(data.token);
            console.log("Token actualizado desde la respuesta del servidor (Google):", data.token);
          }
          toast({
            title: "¡Registro con Google exitoso!",
            description: "Tu cuenta ha sido creada. Redirigiendo a preguntas...",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top"
          });
          navigate("/questions");
        } else {
          console.error("Error en preferencias Google:", data.error);
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
        console.error("Error en la solicitud fetch (Google):", fetchError);
        console.log("Error CORS o de red detectado en registro con Google");
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
      console.error("Error con Google:", errorMsg); toast({
        title: "Error al registrarse con Google",
        description: errorMsg,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top"
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
            <VStack spacing={4}>              <FormControl isRequired>
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
                    // Estilo para cuando se despliega el menú
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
        </Box>
      </Flex>
    </Box>
  );
};

export default SignUp;