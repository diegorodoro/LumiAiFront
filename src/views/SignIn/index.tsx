import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Flex, Image } from '@chakra-ui/react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let userCredential;

      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const token = await userCredential.user.getIdToken();

      const response = await fetch('http://localhost:5000/protected', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(`${isRegistering ? 'Registro' : 'Login'} exitoso, respuesta del backend:`, data);

      if (isRegistering) {
        navigate('/preferencias');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error al ${isRegistering ? 'registrar' : 'iniciar sesión'}:`, error.message);
      } else {
        console.error(`Error al ${isRegistering ? 'registrar' : 'iniciar sesión'}:`, error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google User:', result.user);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50" p={4}>
      <Box
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        w="full"
        maxW="sm"
        p={8}
      >
        <VStack as="form" spacing={4} onSubmit={handleAuth}>
          <Heading as="h1" size="lg" textAlign="center">
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </Heading>

          <FormControl id="email" isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full">
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </Button>

          <Button
            onClick={handleGoogleSignIn}
            colorScheme="red"
            w="full"
            leftIcon={<Image src="/path-to-google-logo.png" alt="Google Logo" boxSize="20px" />}
          >
            Iniciar sesión con Google
          </Button>

          <Button
            onClick={() => setIsRegistering(!isRegistering)}
            variant="link"
            colorScheme="blue"
          >
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignIn;