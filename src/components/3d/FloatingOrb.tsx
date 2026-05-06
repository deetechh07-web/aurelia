"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshPhysicalMaterial, Color } from "three";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";

export default function FloatingOrb() {
  const groupRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      
      // Subtle mouse reaction
      groupRef.current.position.x += (state.pointer.x * 0.5 - groupRef.current.position.x) * 0.1;
      groupRef.current.position.y += (state.pointer.y * 0.5 - groupRef.current.position.y) * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * -0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      {/* Outer Glass Shell */}
      <mesh ref={groupRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhysicalMaterial
          transmission={0.95}
          opacity={1}
          metalness={isDark ? 0.3 : 0.1}
          roughness={isDark ? 0.02 : 0.05}
          ior={1.5}
          thickness={2}
          specularIntensity={isDark ? 1.5 : 1}
          specularColor={new Color("#ffffff")}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial
          color={isDark ? "#F4E7BE" : "#D4AF37"}
          emissive={isDark ? "#D4AF37" : "#D4AF37"}
          emissiveIntensity={isDark ? 1 : 0.5}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* Soft internal light */}
      <pointLight position={[0, 0, 0]} intensity={isDark ? 4 : 2} color={isDark ? "#ffffff" : "#F4E7BE"} distance={10} />
    </Float>
  );
}
