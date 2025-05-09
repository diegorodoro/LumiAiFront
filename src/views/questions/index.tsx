import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  Progress,
  Text,
  VStack,
  Flex,
  ScaleFade
} from "@chakra-ui/react";

const questions = [
  {
    question: "¿Te consideras una persona introvertida o extrovertida?",
    options: ["Introvertida", "Extrovertida", "Neutral"]
  },
  {
    question: "¿Te sientes cómodo/a conociendo nueva gente?",
    options: ["Si", "No", "A veces"]
  },
  {
    question: "¿Te resulta fácil expresar tus emociones?",
    options: ["Si", "No", "Más o menos"]
  },
  {
    question: "¿Has experimentado episodios de tristeza prolongados en el pasado?",
    options: ["Si", "No", "No lo sé"]
  },
  {
    question: "¿Sientes ansiedad de manera continua?",
    options: ["Sí", "A veces", "No"]
  },
  {
    question: "¿Has buscado ayuda profesional en el pasado?",
    options: ["Si", "No"]
  },
  {
    question: "¿Tienes pensamientos negativos recurrentes durante el día?",
    options: ["Sí", "A veces", "No"]
  },
  {
    question: "¿Te sientes satisfecho contigo mismo?",
    options: ["Sí", "No", "Prefiero no decir", "A veces"]
  },
  {
    question: "¿Sueles compararte de manera negativa con otras personas?",
    options: ["Si", "A veces", "No"]
  },
  {
    question: "¿Tiene demasiado peso lo que otras personas piensen de ti?",
    options: ["Si", "No", "Un poco"]
  },
  {
    question: "¿Estás pasando por alguna situación emocionalmente difícil en este momento?",
    options: ["Si", "No"]
  },
  {
    question: "¿Has experimentado cambios fuertes en tu vida recientemente?",
    options: ["Si", "No"]
  },
  {
    question: "¿Estás satisfecho con tus relaciones personales actuales?",
    options: ["Si", "No", "Más o menos"]
  },
  {
    question: "¿Sientes que tienes tus metas claras?",
    options: ["Si", "No", "Un poco"]
  }
];


const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Calcular el progreso
  const progress = ((currentQuestion) / questions.length) * 100;

  const handleOptionClick = (answer) => {
    setIsAnimating(true);

    setTimeout(() => {
      const updatedAnswers = [...answers, answer];
      setAnswers(updatedAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        console.log("Respuestas finales:", updatedAnswers);
        setTimeout(() => {
          navigate("/chatbot");// Redirigir al chatbot
        }, 1500);
      }
      
      setIsAnimating(false);
    }, 300);
  };

  const current = questions[currentQuestion];

  return (
    <Box 
      minH="100vh" 
      bg="lavender.50" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      p={4}
    >
      <Container maxW="md" p={0}>
        <Box 
          bg="white" 
          borderRadius="xl" 
          boxShadow="lg" 
          p={8} 
          textAlign="center"
          position="relative"
          overflow="hidden"
        >
          {/* Barra de progreso */}
          <Box mb={6}>
            <Progress 
              value={progress} 
              size="sm" 
              colorScheme="purple" 
              borderRadius="full"
              bg="lavender.100"
            />
            <Text 
              fontSize="sm" 
              color="lavender.600" 
              textAlign="right" 
              mt={1}
            >
              {currentQuestion + 1} de {questions.length}
            </Text>
          </Box>
          
          {currentQuestion < questions.length ? (
            <ScaleFade initialScale={0.9} in={!isAnimating}>
              <Heading 
                as="h2" 
                size="lg" 
                mb={8} 
                color="lavender.800"
                fontWeight="medium"
              >
                {current.question}
              </Heading>
              
              <VStack spacing={4} align="stretch">
                {current.options.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    size="lg"
                    fontSize="md"
                    fontWeight="medium"
                    py={6}
                    borderRadius="xl"
                    bg="lavender.100"
                    color="lavender.800"
                    _hover={{ 
                      bg: "lavender.200",
                      transform: "translateY(-2px)",
                      boxShadow: "md"
                    }}
                    _active={{ 
                      bg: "lavender.300",
                      transform: "translateY(0)"
                    }}
                    transition="all 0.2s ease-in-out"
                  >
                    {option}
                  </Button>
                ))}
              </VStack>
            </ScaleFade>
          ) : (
            <Flex 
              direction="column" 
              align="center" 
              justify="center" 
              minH="200px"
            >
              <Heading as="h2" size="lg" color="lavender.700">
                ¡Cuestionario completado!
              </Heading>
              <Text 
                fontSize="md" 
                mt={4} 
                color="lavender.600"
              >
                Gracias por tus respuestas
              </Text>
            </Flex>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Questionnaire;