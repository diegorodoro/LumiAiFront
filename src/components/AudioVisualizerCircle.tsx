import React, { useEffect, useRef, useState } from 'react';

const AudioVisualizerCircle: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128).fill(0));
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Iniciar la captura de audio
  const startListening = async (): Promise<void> => {
    try {
      // Crear contexto de audio
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      // Solicitar permiso para usar el micrófono
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current.connect(analyserRef.current);
      
      setIsListening(true);
      updateAudioData();
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
      alert("No se pudo acceder al micrófono. Por favor, concede permisos.");
    }
  };

  // Detener la captura de audio
  const stopListening = (): void => {
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(console.error);
      audioContextRef.current = null;
    }
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setIsListening(false);
    setAudioData(new Uint8Array(128).fill(0));
  };

  // Actualizar los datos de audio en tiempo real
  const updateAudioData = (): void => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    setAudioData(dataArray);
    
    drawCircle(dataArray);
    animationRef.current = requestAnimationFrame(updateAudioData);
  };

  // Dibujar el círculo distorsionado con color liso
  const drawCircle = (dataArray: Uint8Array): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = Math.min(width, height) / 4;
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height);
    
    // Dibujar el círculo distorsionado
    ctx.beginPath();
    const segments = 128;
    
    // Factor de exageración para la distorsión
    const exaggerationFactor = 1.5;
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const amplitude = dataArray[i % dataArray.length] / 255;
      // Aplicamos el factor de exageración a la distorsión
      const radiusOffset = amplitude * baseRadius * 0.5 * exaggerationFactor;
      const radius = baseRadius + radiusOffset;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    
    // Calcular la intensidad promedio del audio para ajustar el color
    const avgAmplitude = Array.from(dataArray).reduce((a, b) => a + b, 0) / dataArray.length / 255;
    
    // Color liso con opacidad basada en la intensidad del audio
    // Usamos un azul vibrante como color base
    const baseColor = "rgb(65, 105, 225)"; // Azul real
    ctx.fillStyle = baseColor;
    ctx.fill();
    
    // Agregar un borde fino para dar definición
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Efecto de brillo central para dar más vida sin usar degradados
    if (avgAmplitude > 0.1) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * avgAmplitude * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, " + avgAmplitude * 0.3 + ")";
      ctx.fill();
    }
  };

  // Configurar el canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Dibujar círculo inicial
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, Math.min(width, height) / 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(65, 105, 225)"; // Color liso inicial
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="w-full max-w-xl p-4">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Visualizador de Audio</h1>
          <p className="text-gray-300 mb-4">Círculo con distorsión exagerada y color liso</p>
          <button 
            onClick={isListening ? stopListening : startListening}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isListening 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isListening ? "Detener" : "Iniciar"}
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <div className="relative w-full" style={{ height: "400px" }}>
            <canvas 
              ref={canvasRef} 
              className="w-full h-full"
            />
            {!isListening && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 text-lg">
                  {audioContextRef.current ? "Audio pausado" : "Haz clic en Iniciar para comenzar"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioVisualizerCircle;