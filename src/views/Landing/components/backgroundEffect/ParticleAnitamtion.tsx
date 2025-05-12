import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GradientParticleEffect: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Create gradient background
        const texture = new THREE.CanvasTexture(createGradient());
        scene.background = texture;

        // Create particles
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 2 * 500;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * 500;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2 * 500;

            colors[i * 3] = Math.random();
            colors[i * 3 + 1] = Math.random();
            colors[i * 3 + 2] = Math.random();
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({ size: 1, vertexColors: true });
        const particleSystem = new THREE.Points(particles, material);
        scene.add(particleSystem);

        // Set camera position
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate particles
            particleSystem.rotation.x += 0.001;
            particleSystem.rotation.y += 0.001;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
        };
    }, []);

    // Function to create gradient texture
    const createGradient = (): HTMLCanvasElement => {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
            gradient.addColorStop(0, '#ff7e5f');
            gradient.addColorStop(1, '#feb47b');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        }
        return canvas;
    };

    return <canvas ref={canvasRef} />;
};

export default GradientParticleEffect;
