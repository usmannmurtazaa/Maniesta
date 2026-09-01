'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface GlobeProps {
  className?: string;
}

export default function Globe({ className }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    camera.position.z = 8;

    // Globe sphere
    const globeGeometry = new THREE.SphereGeometry(2.5, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a2e,
      shininess: 30,
      transparent: true,
      opacity: 0.85,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Wireframe overlay
    const wireframeGeometry = new THREE.SphereGeometry(2.52, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Points
    const pointsCount = reducedMotion ? 100 : 300;
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsPositions = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.55;
      pointsPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pointsPositions[i * 3 + 1] = r * Math.cos(phi);
      pointsPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Atmospheric glow
    const glowGeometry = new THREE.SphereGeometry(2.7, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x8b5cf6) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(color, intensity * 0.5);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x333355, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0x22d3ee, 2, 20);
    pointLight.position.set(-3, 2, 4);
    scene.add(pointLight);

    // Arcs
    const arcsGroup = new THREE.Group();
    const arcCount = reducedMotion ? 3 : 8;
    for (let i = 0; i < arcCount; i++) {
      const startTheta = Math.random() * Math.PI * 2;
      const endTheta = startTheta + Math.PI * 0.5 + Math.random() * Math.PI * 0.5;
      const startPhi = Math.acos(2 * Math.random() - 1);
      const endPhi = Math.acos(2 * Math.random() - 1);
      const startR = 2.55;
      const endR = 2.55;

      const start = new THREE.Vector3(
        startR * Math.sin(startPhi) * Math.cos(startTheta),
        startR * Math.cos(startPhi),
        startR * Math.sin(startPhi) * Math.sin(startTheta)
      );
      const end = new THREE.Vector3(
        endR * Math.sin(endPhi) * Math.cos(endTheta),
        endR * Math.cos(endPhi),
        endR * Math.sin(endPhi) * Math.sin(endTheta)
      );

      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(3.2);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const curvePoints = curve.getPoints(50);
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const arcMaterial = new THREE.LineBasicMaterial({
        color: [0x22d3ee, 0x3b82f6, 0x8b5cf6, 0xd946ef][i % 4],
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const arc = new THREE.Line(arcGeometry, arcMaterial);
      arcsGroup.add(arc);
    }
    scene.add(arcsGroup);

    // Rings
    const ringsGroup = new THREE.Group();
    const ringCount = reducedMotion ? 1 : 2;
    for (let i = 0; i < ringCount; i++) {
      const ringGeometry = new THREE.TorusGeometry(2.7 + i * 0.3, 0.01, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: [0x8b5cf6, 0x22d3ee][i % 2],
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + i * 0.3;
      ring.rotation.z = i * 0.5;
      ringsGroup.add(ring);
    }
    scene.add(ringsGroup);

    // Animation
    let animationId: number;
    const animate = () => {
      const time = Date.now() * 0.001;
      globe.rotation.y += reducedMotion ? 0.002 : 0.004;
      wireframe.rotation.y = globe.rotation.y;
      points.rotation.y = globe.rotation.y;
      glow.rotation.y = globe.rotation.y;
      arcsGroup.rotation.y += reducedMotion ? 0.001 : 0.002;
      ringsGroup.rotation.y += reducedMotion ? 0.0005 : 0.001;
      ringsGroup.rotation.x += reducedMotion ? 0.0003 : 0.0006;
      pointLight.position.x = Math.sin(time * 0.5) * 4;
      pointLight.position.z = Math.cos(time * 0.5) * 4;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn('w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10', className)}
    />
  );
}