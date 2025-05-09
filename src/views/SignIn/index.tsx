import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Box, Button, Heading, Input, VStack, HStack, Icon } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../contexts/AuthContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, setToken } = useAuth(); // Obtiene el token desde el contexto de autenticación

  console.log("Token actual:", token);

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
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
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
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            variant="filled"
          />
          <Button type="submit" colorScheme="blue" width="full">
            Iniciar sesión
          </Button>
        </VStack>
      </form>
      <Button
        mt={4}
        variant="link"
        colorScheme="blue"
        onClick={() => navigate("/sign-up")}
      >
        ¿No tienes cuenta? Regístrate aquí
      </Button>
      <HStack mt={4} spacing={4} justify="center">
        <Button
          onClick={handleGoogleSignIn}
          leftIcon={<Icon as={FcGoogle} />}
          colorScheme="gray"
          variant="outline"
          width="full"
        >
          Iniciar sesión con Google
        </Button>
      </HStack>
    </Box>
  );
}

export default SignIn;