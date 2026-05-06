"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PresentationControls, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import FloatingOrb from "./FloatingOrb";
import { useTheme } from "next-themes";

export default function SceneContainer() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  if (!mounted) return <div className="w-full h-full min-h-[500px] lg:min-h-[700px] relative" />;

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-[700px] relative">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset={isDark ? "city" : "studio"} environmentIntensity={isDark ? 0.3 : 0.8} />
          <ambientLight intensity={isDark ? 0.2 : 0.5} color={isDark ? "#2A1A1A" : "#FBEAEA"} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={isDark ? 5 : 2}
            color={isDark ? "#ffffff" : "#D4AF37"}
            castShadow
          />
          <PresentationControls
            global
            snap={true}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <FloatingOrb />
          </PresentationControls>
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={isDark ? 0.8 : 0.4}
            scale={10}
            blur={2}
            far={4}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
