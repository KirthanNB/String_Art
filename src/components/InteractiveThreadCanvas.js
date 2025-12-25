'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Thread Line Component
function ThreadLines({ mousePosition, clickTrigger, shapeType }) {
    const groupRef = useRef();
    const threadDataRef = useRef([]);
    const breathingPhaseRef = useRef(0);

    const threadCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 120;

    useEffect(() => {
        // Generate elegant threads spanning edge to edge
        const threads = [];
        const colors = [
            new THREE.Color(0x00b8a9), // teal
            new THREE.Color(0xe91e63), // pink
            new THREE.Color(0xff6b35), // orange
            new THREE.Color(0xf4c430), // gold
            new THREE.Color(0x9b59b6), // purple
        ];

        // Define screen boundaries with padding
        const bounds = {
            left: -70,
            right: 70,
            top: 50,
            bottom: -50,
            depth: 20
        };

        for (let i = 0; i < threadCount; i++) {
            // Create threads that span from one edge to another
            const threadType = Math.random();
            let startPos, endPos;

            if (threadType < 0.25) {
                // Left to right
                startPos = new THREE.Vector3(
                    bounds.left,
                    (Math.random() - 0.5) * (bounds.top - bounds.bottom) * 1.5,
                    (Math.random() - 0.5) * bounds.depth
                );
                endPos = new THREE.Vector3(
                    bounds.right,
                    (Math.random() - 0.5) * (bounds.top - bounds.bottom) * 1.5,
                    (Math.random() - 0.5) * bounds.depth
                );
            } else if (threadType < 0.5) {
                // Top to bottom
                startPos = new THREE.Vector3(
                    (Math.random() - 0.5) * (bounds.right - bounds.left) * 1.5,
                    bounds.top,
                    (Math.random() - 0.5) * bounds.depth
                );
                endPos = new THREE.Vector3(
                    (Math.random() - 0.5) * (bounds.right - bounds.left) * 1.5,
                    bounds.bottom,
                    (Math.random() - 0.5) * bounds.depth
                );
            } else if (threadType < 0.75) {
                // Diagonal top-left to bottom-right
                startPos = new THREE.Vector3(
                    bounds.left + Math.random() * 20,
                    bounds.top - Math.random() * 20,
                    (Math.random() - 0.5) * bounds.depth
                );
                endPos = new THREE.Vector3(
                    bounds.right - Math.random() * 20,
                    bounds.bottom + Math.random() * 20,
                    (Math.random() - 0.5) * bounds.depth
                );
            } else {
                // Diagonal top-right to bottom-left
                startPos = new THREE.Vector3(
                    bounds.right - Math.random() * 20,
                    bounds.top - Math.random() * 20,
                    (Math.random() - 0.5) * bounds.depth
                );
                endPos = new THREE.Vector3(
                    bounds.left + Math.random() * 20,
                    bounds.bottom + Math.random() * 20,
                    (Math.random() - 0.5) * bounds.depth
                );
            }

            // Create smooth curve with natural sag (catenary-like)
            const points = [];
            const segments = 40; // More segments for ultra-smooth appearance
            const sagAmount = 2 + Math.random() * 4; // Natural sag/curve amount
            const curveDirection = Math.random() > 0.5 ? 1 : -1;

            for (let j = 0; j <= segments; j++) {
                const t = j / segments;

                // Natural catenary curve (like hanging string)
                const curveFactor = Math.sin(t * Math.PI) * sagAmount * curveDirection;

                // Smooth interpolation between start and end
                const x = startPos.x + (endPos.x - startPos.x) * t;
                const y = startPos.y + (endPos.y - startPos.y) * t + curveFactor;
                const z = startPos.z + (endPos.z - startPos.z) * t + Math.sin(t * Math.PI) * 2;

                points.push(new THREE.Vector3(x, y, z));
            }

            // Create smooth curve
            const curve = new THREE.CatmullRomCurve3(points);
            curve.curveType = 'catmullrom';
            curve.tension = 0.5; // Smooth tension

            const curvePoints = curve.getPoints(50); // Extra smooth
            const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints);

            // Elegant color selection
            const colorIndex = i % colors.length;
            const nextColorIndex = (colorIndex + 1) % colors.length;
            const colorMix = (i % 5) / 5;
            const threadColor = colors[colorIndex].clone().lerp(colors[nextColorIndex], colorMix);

            const material = new THREE.LineBasicMaterial({
                color: threadColor,
                transparent: true,
                opacity: 0.4 + Math.random() * 0.2,
                linewidth: 1,
            });

            const line = new THREE.Line(geometry, material);

            threads.push({
                line,
                originalPoints: curvePoints.map(p => p.clone()),
                targetPoints: curvePoints.map(p => p.clone()),
                velocities: curvePoints.map(() => new THREE.Vector3(0, 0, 0)),
                startPoint: curvePoints[0].clone(),
                endPoint: curvePoints[curvePoints.length - 1].clone(),
            });
        }

        threadDataRef.current = threads;

        // Clear existing lines
        while (groupRef.current?.children.length) {
            const child = groupRef.current.children[0];
            child.geometry?.dispose();
            child.material?.dispose();
            groupRef.current.remove(child);
        }

        // Add new lines to group
        threads.forEach(thread => {
            groupRef.current?.add(thread.line);
        });
    }, [threadCount]);

    // Handle shape transformations on click
    useEffect(() => {
        if (clickTrigger === 0 || threadDataRef.current.length === 0) return;

        const threads = threadDataRef.current;

        // Define shape patterns
        const shapes = {
            triangle: (threadIndex, pointIndex, totalPoints) => {
                const angle = (threadIndex / threads.length) * Math.PI * 2;
                const radius = 35 + Math.sin(angle * 3) * 12;
                const t = pointIndex / totalPoints;
                return new THREE.Vector3(
                    Math.cos(angle) * radius * (0.7 + t * 0.6),
                    Math.sin(angle) * radius * (0.7 + t * 0.6),
                    Math.cos(angle * 2 + t * Math.PI) * 6
                );
            },
            polygon: (threadIndex, pointIndex, totalPoints) => {
                const sides = 8;
                const angle = (Math.floor(threadIndex / threads.length * sides) / sides) * Math.PI * 2;
                const radius = 40;
                const t = pointIndex / totalPoints;
                return new THREE.Vector3(
                    Math.cos(angle) * radius * (0.8 + t * 0.4),
                    Math.sin(angle) * radius * (0.8 + t * 0.4),
                    Math.sin(t * Math.PI * 3) * 5
                );
            },
            mandala: (threadIndex, pointIndex, totalPoints) => {
                const angle = (threadIndex / threads.length) * Math.PI * 12;
                const t = pointIndex / totalPoints;
                const radius = 25 + Math.sin(angle * 4) * 18;
                const spiralHeight = (threadIndex / threads.length - 0.5) * 30;
                return new THREE.Vector3(
                    Math.cos(angle + t * Math.PI * 2) * radius * (0.6 + t * 0.4),
                    Math.sin(angle + t * Math.PI * 2) * radius * (0.6 + t * 0.4),
                    spiralHeight + Math.cos(angle * 8 + t * Math.PI * 3) * 6
                );
            }
        };

        const currentShape = shapes[shapeType] || shapes.triangle;

        // Animate each thread to shape with smooth transition
        threads.forEach((thread, threadIndex) => {
            thread.targetPoints.forEach((targetPoint, pointIndex) => {
                const newPos = currentShape(threadIndex, pointIndex, thread.targetPoints.length - 1);

                gsap.to(targetPoint, {
                    duration: 1.8,
                    ease: 'power2.inOut',
                    x: newPos.x,
                    y: newPos.y,
                    z: newPos.z,
                });
            });
        });

        // Return to original positions after 2.5 seconds
        setTimeout(() => {
            threads.forEach((thread) => {
                thread.targetPoints.forEach((targetPoint, pointIndex) => {
                    const originalPoint = thread.originalPoints[pointIndex];

                    gsap.to(targetPoint, {
                        duration: 2.5,
                        ease: 'power2.inOut',
                        x: originalPoint.x,
                        y: originalPoint.y,
                        z: originalPoint.z,
                    });
                });
            });
        }, 2500);
    }, [clickTrigger, shapeType]);

    useFrame((state, delta) => {
        if (!groupRef.current || threadDataRef.current.length === 0) return;

        breathingPhaseRef.current += delta * 0.3;

        threadDataRef.current.forEach((thread, threadIndex) => {
            const positions = thread.line.geometry.attributes.position;
            const points = thread.targetPoints;

            points.forEach((targetPoint, pointIndex) => {
                const idx = pointIndex * 3;
                const currentPos = new THREE.Vector3(
                    positions.array[idx],
                    positions.array[idx + 1],
                    positions.array[idx + 2]
                );

                // Gentle breathing animation
                const breathingForce = Math.sin(breathingPhaseRef.current + threadIndex * 0.08 + pointIndex * 0.03) * 0.25;

                // Refined cursor influence
                const dx = mousePosition.x * 50 - currentPos.x;
                const dy = mousePosition.y * 50 - currentPos.y;
                const dz = -currentPos.z * 0.5;

                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                const maxDistance = 50;

                if (distance < maxDistance && distance > 0) {
                    const force = (1 - distance / maxDistance) * 0.25;
                    thread.velocities[pointIndex].x += dx * force * 0.015;
                    thread.velocities[pointIndex].y += dy * force * 0.015;
                    thread.velocities[pointIndex].z += dz * force * 0.01;
                }

                // Elegant spring back to target
                const springStrength = 0.03;
                const damping = 0.88;

                thread.velocities[pointIndex].x += (targetPoint.x - currentPos.x) * springStrength;
                thread.velocities[pointIndex].y += (targetPoint.y - currentPos.y) * springStrength;
                thread.velocities[pointIndex].z += (targetPoint.z - currentPos.z) * springStrength;

                // Subtle breathing
                thread.velocities[pointIndex].x += breathingForce * 0.05;
                thread.velocities[pointIndex].y += breathingForce * 0.05;

                // Smooth damping
                thread.velocities[pointIndex].multiplyScalar(damping);

                // Update positions smoothly
                currentPos.add(thread.velocities[pointIndex]);
                positions.array[idx] = currentPos.x;
                positions.array[idx + 1] = currentPos.y;
                positions.array[idx + 2] = currentPos.z;
            });

            positions.needsUpdate = true;
        });
    });

    return <group ref={groupRef} />;
}

// Main Canvas Scene
function Scene({ mousePosition, clickTrigger, shapeType }) {
    return (
        <>
            <ThreadLines mousePosition={mousePosition} clickTrigger={clickTrigger} shapeType={shapeType} />
            <ambientLight intensity={0.5} />
        </>
    );
}

// Main Component
export default function InteractiveThreadCanvas() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [clickTrigger, setClickTrigger] = useState(0);
    const [shapeType, setShapeType] = useState('triangle');
    const containerRef = useRef(null);
    const shapes = ['triangle', 'polygon', 'mandala'];
    const currentShapeIndex = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            setMousePosition({ x, y });
        };

        const handleClick = () => {
            currentShapeIndex.current = (currentShapeIndex.current + 1) % shapes.length;
            setShapeType(shapes[currentShapeIndex.current]);
            setClickTrigger(prev => prev + 1);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        >
            <Canvas
                camera={{ position: [0, 0, 80], fov: 50 }}
                className="pointer-events-auto"
                gl={{ antialias: true, alpha: true }}
            >
                <Scene
                    mousePosition={mousePosition}
                    clickTrigger={clickTrigger}
                    shapeType={shapeType}
                />
            </Canvas>
        </div>
    );
}
