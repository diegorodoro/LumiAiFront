import React, { useEffect, useRef } from 'react';

interface AudioVisualizerCircleProps {
  prompt: string; // Recibe el texto como prop
}

const AudioVisualizerCircle: React.FC<AudioVisualizerCircleProps> = ({ prompt }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!prompt) return;

    const speakText = (text: string) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";

      const audioContext = new AudioContext();
      const destination = audioContext.createMediaStreamDestination();
      const synth = window.speechSynthesis;

      synth.speak(utterance);

      utterance.onstart = () => {
        const source = audioContext.createMediaStreamSource(destination.stream);
        audioContextRef.current = audioContext;
        analyserRef.current = audioContext.createAnalyser();
        analyserRef.current.fftSize = 256;

        source.connect(analyserRef.current);
        updateAudioData();
      };
    };

    const updateAudioData = (): void => {
      if (!analyserRef.current) return;

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      drawCircle(dataArray);
      animationRef.current = requestAnimationFrame(updateAudioData);
    };

    const drawCircle = (dataArray: Uint8Array): void => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Calcular el radio del círculo basado en la amplitud promedio
      const avgAmplitude = Array.from(dataArray).reduce((a, b) => a + b, 0) / dataArray.length;
      const baseRadius = Math.min(width, height) / 4;
      const radius = baseRadius + (avgAmplitude / 255) * baseRadius * 0.5;

      // Limpiar el canvas
      ctx.clearRect(0, 0, width, height);

      // Dibujar el círculo
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgb(0, 0, 0)"; // Azul real
      ctx.fill();

      // Agregar un borde
      ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    speakText(prompt);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, [prompt]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AudioVisualizerCircle;