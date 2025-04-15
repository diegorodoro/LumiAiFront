import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import './questions.css';

const questions = [
  {
    question: "Te consideras una persona introvertida o extrovertida?",
    options: ["Introvertida", "Extrovertida", "Neutral"]
  },
  {
    question: "¿Te sientes cómodo/a conociendo nueva gente?",
    options: ["Si", "No", "A veces"]
  },
  {
    question: "Te resulta fácil expresar tus emociones?",
    options: ["Si", "No", "Mas o menos"]
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
    question: "¿Estas pasando por alguna situación emocionalmente difícil en este momento?",
    options: ["Si", "No"]
  },
  {
    question: "¿Has experimentado cambios fuertes en tu vida recientemente?",
    options: ["Si", "No"]
  },
  {
    question: "¿Estas satisfecho con tus relaciones personales actuales?",
    options: ["Si", "No", "Mas o menos"]
  },
  {
    question: "¿Sientes que tienes tus metas claras?",
    options: ["Si", "No", "Un poco"]
  }
];

const Questionnaire: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Respuestas finales:", updatedAnswers);
      setTimeout(() => {
        navigate("/");
      }, 1000); 
    }
  };

  const current = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {currentQuestion < questions.length ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">{current.question}</h2>
            <div className="flex flex-col gap-4">
              {current.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-semibold">
            Cuestionario completado
          </h2>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
