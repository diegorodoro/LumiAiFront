import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedCircles: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = canvasRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
            window.innerWidth / -2,
            window.innerWidth / 2,
            window.innerHeight / 2,
            window.innerHeight / -2,
            1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Circle geometry setup
        const circleCount = 150;
        const circles: THREE.Mesh[] = [];
        const geometry = new THREE.CircleGeometry(1, 32);

        for (let i = 0; i < circleCount; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(`hsl(${Math.random() * 360}, 70%, 50%)`),
                transparent: true,
                opacity: 0.5
            });

            const circle = new THREE.Mesh(geometry, material);
            circle.position.set(
                (Math.random() - 0.5) * window.innerWidth,
                (Math.random() - 0.5) * window.innerHeight,
                0
            );
            circle.scale.setScalar(Math.random() * 100 + 50); // Increased size of circles
            scene.add(circle);
            circles.push(circle);
        }

        camera.position.z = 10;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            circles.forEach((circle) => {
                circle.position.x += (Math.random() - 0.5) * 2;
                circle.position.y += (Math.random() - 0.5) * 2;

                if (circle.position.x - circle.scale.x / 2 < -window.innerWidth / 2 ||
                    circle.position.x + circle.scale.x / 2 > window.innerWidth / 2) {
                    circle.position.x *= -1;
                }

                if (circle.position.y - circle.scale.y / 2 < -window.innerHeight / 2 ||
                    circle.position.y + circle.scale.y / 2 > window.innerHeight / 2) {
                    circle.position.y *= -1;
                }
            });

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            container.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default AnimatedCircles;