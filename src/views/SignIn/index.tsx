import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Box, Button, Heading, Input, VStack, HStack, Icon, Flex } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import ShaderCanvas from "./component/backgroundEffect/ShaderCanvas";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      const response = await fetch("https://lumiapi-luzj.onrender.com/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response completo de la API:", response); // Imprime el objeto Response completo
      const data = await response.json();
      console.log("Inicio de sesión exitoso, respuesta del backend:", data);

      navigate("/chatbot"); // Redirige al usuario después de iniciar sesión

    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al iniciar sesión:", error.message);
      } else {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await fetch("https://lumiapi-luzj.onrender.com/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Inicio de sesión con Google exitoso, respuesta del backend:", data);

      navigate("/chatbot"); // Redirige al usuario después de iniciar sesión
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al iniciar sesión con Google:", error.message);
      } else {
        console.error("Error al iniciar sesión con Google:", error);
      }
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
          maxW="md"
          p={8}
          borderRadius="xl"
          bg="rgba(58, 52, 52, 0.56)"
          backdropFilter="blur(12px)"
          boxShadow="xl"
          border="1px solid rgba(255, 255, 255, 0.2)"
        >
          <Heading as="h2" size="lg" mb={6} textAlign="center" color="white">
            Iniciar sesión
          </Heading>
          <form onSubmit={handleSignIn}>
            <VStack spacing={4}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo"
                variant="filled"
                bg="rgba(255, 255, 255, 0.15)"
                color="white"
                _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                variant="filled"
                bg="rgba(255, 255, 255, 0.15)"
                color="white"
                _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
              />
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                bg="blue.500"
                _hover={{ bg: "blue.600" }}
              >
                Iniciar sesión
              </Button>
            </VStack>
          </form>
          <Button
            mt={4}
            variant="link"
            color="white"
            fontWeight="normal"
            onClick={() => navigate("/sign-up")}
            _hover={{ color: "blue.300" }}
          >
            ¿No tienes cuenta? Regístrate aquí
          </Button>
          <HStack mt={4} spacing={4} justify="center">
            <Button
              onClick={handleGoogleSignIn}
              leftIcon={<Icon as={FcGoogle} boxSize="20px" />}
              color="black"
              bg="white"
              _hover={{ bg: "gray.100" }}
              width="full"
              fontSize="sm"
            >
              Iniciar sesión con Google
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default SignIn;