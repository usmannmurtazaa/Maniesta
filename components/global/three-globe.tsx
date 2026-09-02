'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface ThreeGlobeProps {
  className?: string;
}

export default function ThreeGlobe({ className }: ThreeGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const animationRef = useRef<number>();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !reducedMotion,
      powerPreference: 'default',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    camera.position.z = 8;

    // Context loss handling
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      renderer.dispose();
    };
    const handleContextRestored = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Globe sphere
    const globeGeometry = new THREE.SphereGeometry(2.5, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a2e,
      emissive: 0x0a0a1a,
      shininess: 30,
      transparent: true,
      opacity: 0.9,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Wireframe overlay
    const wireGeometry = new THREE.SphereGeometry(2.52, 32, 32);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
    scene.add(wireframe);

    // Points with color palette
    const pointsCount = reducedMotion ? 100 : 300;
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointsCount * 3);
    const colors = new Float32Array(pointsCount * 3);
    const palette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#d946ef'),
    ];
    for (let i = 0; i < pointsCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.55;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Atmospheric glow (gradient shader)
    const glowGeometry = new THREE.SphereGeometry(2.7, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color('#8b5cf6') },
        color2: { value: new THREE.Color('#22d3ee') },
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
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          vec3 gradient = mix(color1, color2, intensity);
          gl_FragColor = vec4(gradient, intensity * 0.5);
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
    scene.add(new THREE.AmbientLight(0x222244, 1.2));
    const dirLight = new THREE.DirectionalLight(0x8b5cf6, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const pointLight1 = new THREE.PointLight(0x22d3ee, 2, 20);
    pointLight1.position.set(-3, 2, 4);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xd946ef, 1.5, 15);
    pointLight2.position.set(4, -1, 2);
    scene.add(pointLight2);

    // Arcs (connections)
    const arcsGroup = new THREE.Group();
    const arcCount = reducedMotion ? 6 : 12;
    const arcColors = [0x22d3ee, 0x3b82f6, 0x8b5cf6, 0xa855f7, 0xd946ef];
    for (let i = 0; i < arcCount; i++) {
      const sT = Math.random() * Math.PI * 2;
      const eT = sT + Math.PI * 0.5 + Math.random() * Math.PI * 0.8;
      const sP = Math.acos(2 * Math.random() - 1);
      const eP = Math.acos(2 * Math.random() - 1);
      const sR = 2.55;
      const eR = 2.55;
      const start = new THREE.Vector3(
        sR * Math.sin(sP) * Math.cos(sT),
        sR * Math.cos(sP),
        sR * Math.sin(sP) * Math.sin(sT)
      );
      const end = new THREE.Vector3(
        eR * Math.sin(eP) * Math.cos(eT),
        eR * Math.cos(eP),
        eR * Math.sin(eP) * Math.sin(eT)
      );
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(3.2);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const curvePoints = curve.getPoints(50);
      const arcGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const arcMaterial = new THREE.LineBasicMaterial({
        color: arcColors[i % arcColors.length],
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      arcsGroup.add(new THREE.Line(arcGeometry, arcMaterial));
    }
    scene.add(arcsGroup);

    // Rings
    const ringsGroup = new THREE.Group();
    const ringCount = reducedMotion ? 1 : 2;
    for (let i = 0; i < ringCount; i++) {
      const ringGeometry = new THREE.TorusGeometry(2.7 + i * 0.25, 0.01, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: [0x8b5cf6, 0x22d3ee, 0xd946ef][i % 3],
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + i * 0.3;
      ring.rotation.z = i * 0.6;
      ringsGroup.add(ring);
    }
    scene.add(ringsGroup);

    // Animation loop
    const animate = () => {
      if (!isInView) return; // pause rendering when offscreen
      const time = Date.now() * 0.001;
      globe.rotation.y += reducedMotion ? 0.002 : 0.004;
      wireframe.rotation.y = globe.rotation.y;
      points.rotation.y = globe.rotation.y;
      glow.rotation.y = globe.rotation.y;
      arcsGroup.rotation.y += reducedMotion ? 0.001 : 0.002;
      ringsGroup.rotation.y += reducedMotion ? 0.0005 : 0.001;
      ringsGroup.rotation.x += reducedMotion ? 0.0003 : 0.0006;
      pointLight1.position.x = Math.sin(time * 0.5) * 4;
      pointLight1.position.z = Math.cos(time * 0.5) * 4;
      pointLight2.position.x = Math.cos(time * 0.3) * 3;
      pointLight2.position.z = Math.sin(time * 0.3) * 3;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };

    // IntersectionObserver to pause/resume
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(container);

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      mountedRef.current = false;
      stopAnimation();
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isInView]); // re-run effect when isInView changes

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10',
        className
      )}
    />
  );
}
