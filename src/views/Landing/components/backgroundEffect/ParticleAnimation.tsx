import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const particleVertex = `
  attribute float scale;
  uniform float uTime;
  void main() {
    vec3 p = position;
    float s = scale;
    p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    p.x += (sin(p.y + uTime) * 0.5);
    s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = s * 15.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragment = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.5);
  }
`;

function lerp(start: number, end: number, amount: number): number {
    return (1 - amount) * start + amount * end;
}

interface ParticleAnimationProps {
    className?: string;
}

const ParticleAnimation = ({ className }: ParticleAnimationProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Setup
        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            // alpha: true
        });

        // Config
        const config = {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            aspectRatio: window.innerWidth / window.innerHeight,
            mouse: new THREE.Vector2(-10, -10)
        };

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, config.aspectRatio, 0.01, 1000);
        camera.position.set(0, 6, 5);

        // Renderer setup
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(config.winWidth, config.winHeight);

        // Particles
        const initParticles = () => {
            const gap = 0.3;
            const amountX = 200;
            const amountY = 200;
            const particleNum = amountX * amountY;
            const particlePositions = new Float32Array(particleNum * 3);
            const particleScales = new Float32Array(particleNum);

            let i = 0;
            let j = 0;
            for (let ix = 0; ix < amountX; ix++) {
                for (let iy = 0; iy < amountY; iy++) {
                    particlePositions[i] = ix * gap - ((amountX * gap) / 2);
                    particlePositions[i + 1] = 0;
                    particlePositions[i + 2] = iy * gap - ((amountX * gap) / 2);
                    particleScales[j] = 1;
                    i += 3;
                    j++;
                }
            }

            const particleGeometry = new THREE.BufferGeometry();
            particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
            particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

            const particleMaterial = new THREE.ShaderMaterial({
                transparent: true,
                vertexShader: particleVertex,
                fragmentShader: particleFragment,
                uniforms: {
                    uTime: { value: 0 }
                }
            });

            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);

            return { particleMaterial, particles };
        };

        const { particleMaterial } = initParticles();

        // Animation
        let animationFrameId: number;
        const animate = () => {
            particleMaterial.uniforms.uTime.value += 0.05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Event handlers
        const handleMouseMove = (e: MouseEvent) => {
            config.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            config.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const handleResize = () => {
            config.winWidth = window.innerWidth;
            config.winHeight = window.innerHeight;
            camera.aspect = config.winWidth / config.winHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(config.winWidth, config.winHeight);
        };

        // Bind events
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ width: '100%', height: '100%', display: 'block' }}
        />
    );
};

export default ParticleAnimation;