import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import './questions.css';

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

const Questionnaire: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Actualizar la barra de progreso cuando cambia la pregunta actual
  useEffect(() => {
    const progress = (currentQuestion / questions.length) * 100;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress}%`;
    }
  }, [currentQuestion]);

  // Añadir efecto de onda al hacer clic en un botón
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, answer: string) => {
    const button = e.currentTarget;
    
    // Obtener la posición del clic relativa al botón
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Aplicar la posición del efecto de onda
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
    
    // Añadir clase para activar la animación
    button.classList.add('clicked');
    
    // Procesar la respuesta después de un breve retraso para que se vea la animación
    setTimeout(() => {
      button.classList.remove('clicked');
      processAnswer(answer);
    }, 300);
  };

  // Procesar la respuesta y avanzar a la siguiente pregunta
  const processAnswer = (answer: string) => {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Respuestas finales:", updatedAnswers);
      // Redirigir después de completar el cuestionario
      setTimeout(() => {
        navigate("/");
      }, 1500); 
    }
  };

  const current = questions[currentQuestion];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        {/* Barra de progreso */}
        <div className="questionnaire-progress">
          <div ref={progressBarRef} className="progress-bar"></div>
        </div>
        
        {currentQuestion < questions.length ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">{current.question}</h2>
            <div className="flex flex-col gap-4">
              {current.options.map((option, index) => (
                <button
                  key={option}
                  ref={el => buttonRefs.current[index] = el}
                  onClick={(e) => handleButtonClick(e, option)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-2xl shadow"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-2xl font-semibold">
            ¡Cuestionario completado!<br/>
            <span className="text-base font-normal mt-2 block">Gracias por tus respuestas</span>
          </h2>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;