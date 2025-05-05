import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Box, BoxProps } from '@chakra-ui/react';

interface ShaderCanvasProps extends BoxProps {
    width?: string | number;
    height?: string | number;
    backgroundColor?: string;
}

// Shader code
const vertexShaderSource = `
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float xScale;
uniform float yScale;
uniform float distortion;
void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  
  float d = length(p) * distortion;
  
  float rx = p.x * (1.0 + d);
  float gx = p.x;
  float bx = p.x * (1.0 - d);
  float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
  float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
  float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

const ShaderCanvas = ({
    width = "100%",
    height = "100%",
    backgroundColor = "#666666",
    ...boxProps
}: ShaderCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const uniformsRef = useRef<any>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    // Monitor container size
    useEffect(() => {
        if (!containerRef.current) return;

        const updateSize = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setCanvasSize({ width: clientWidth, height: clientHeight });
            }
        };

        // Initialize size
        updateSize();

        // Set up resize observer
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(containerRef.current);

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
            resizeObserver.disconnect();
        };
    }, []);

    // Initialize the scene
    useEffect(() => {
        if (!canvasRef.current || canvasSize.width === 0 || canvasSize.height === 0) return;

        // Create scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Create camera
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);
        cameraRef.current = camera;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(new THREE.Color(backgroundColor as string));
        renderer.setSize(canvasSize.width, canvasSize.height);
        rendererRef.current = renderer;

        // Create uniforms
        const uniforms = {
            resolution: { type: 'v2', value: [canvasSize.width, canvasSize.height] },
            time: { type: 'f', value: 0.0 },
            xScale: { type: 'f', value: 1.0 },
            yScale: { type: 'f', value: 0.5 },
            distortion: { type: 'f', value: 0.050 }
        };
        uniformsRef.current = uniforms;

        // Create geometry
        const position = [
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,
            1.0, -1.0, 0.0,
            -1.0, 1.0, 0.0,
            1.0, 1.0, 0.0
        ];

        const positions = new THREE.BufferAttribute(new Float32Array(position), 3);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', positions);

        // Create shader material
        const material = new THREE.RawShaderMaterial({
            vertexShader: vertexShaderSource,
            fragmentShader: fragmentShaderSource,
            uniforms: uniforms,
            side: THREE.DoubleSide
        });

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Animation loop
        const animate = () => {
            if (uniformsRef.current) {
                uniformsRef.current.time.value += 0.01;
            }

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        // Clean up resources
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            if (geometry) geometry.dispose();
            if (material) material.dispose();
            if (renderer) renderer.dispose();
            scene.clear();
        };
    }, [canvasSize, backgroundColor]);

    // Handle size changes
    useEffect(() => {
        if (!rendererRef.current || !uniformsRef.current || canvasSize.width === 0 || canvasSize.height === 0) return;

        // Update renderer size
        rendererRef.current.setSize(canvasSize.width, canvasSize.height);

        // Update uniforms
        uniformsRef.current.resolution.value = [canvasSize.width, canvasSize.height];

        // Update camera
        if (cameraRef.current) {
            cameraRef.current.updateProjectionMatrix();
        }
    }, [canvasSize]);

    return (
        <Box
            ref={containerRef}
            position="relative"
            width={width}
            height={height}
            overflow="hidden"
            {...boxProps}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%'
                }}
            />
        </Box>
    );
};

export default ShaderCanvas;