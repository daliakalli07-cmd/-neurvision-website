import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const nodes = [
  { label: "CAM", pos: [0, 1.5, 0] },
  { label: "GPU", pos: [1.8, 0.6, 0.8] },
  { label: "AI", pos: [1, -1.2, -0.4] },
  { label: "OPC", pos: [-1.2, -1.4, 0.7] },
  { label: "PLC", pos: [-2, 0.2, -0.5] },
  { label: "WEB", pos: [-0.8, 1, 1.2] },
];

const edges = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,0],
  [0,2],[1,3],[2,5],[4,0]
];

function Network() {
  const group = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    group.current.rotation.y = t * 0.18;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15;

    group.current.children.forEach((child, i) => {
      if (child.userData.float) {
        child.position.y =
          child.userData.baseY + Math.sin(t * 2 + i) * 0.08;
      }
    });
  });

  return (
    <group ref={group}>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[nodes[a].pos, nodes[b].pos]}
          color="#6EF2FF"
    lineWidth={2.8}
        />
      ))}

      {nodes.map((n, i) => (
        <group
          key={i}
          position={n.pos}
          userData={{ float: true, baseY: n.pos[1] }}
        >
       <Sphere args={[0.17,32,32]}>
           <meshPhysicalMaterial
  color={["#00F5FF", "#8B5CF6", "#FF4FD8", "#00FFA3", "#3B82F6", "#FFB703"][i]}
  emissive={["#00F5FF", "#8B5CF6", "#FF4FD8", "#00FFA3", "#3B82F6", "#FFB703"][i]}
  emissiveIntensity={8}
  roughness={0}
  metalness={0.3}
  clearcoat={1}
  clearcoatRoughness={0}
/>
          </Sphere>
<pointLight
    intensity={12}
    distance={4}
    color={["#00F5FF", "#8B5CF6", "#FF4FD8", "#00FFA3", "#3B82F6", "#FFB703"][i]}
/>

          <Text
            position={[0, 0.35, 0]}
            fontSize={0.16}
            color="#dff8ff"
            anchorX="center"
          >
            {n.label}
          </Text>
        </group>
      ))}
    </group>
  );
}

export default function HexDiagram() {
  return (
    <div
      style={{
        width: "600px",
        height: "520px",
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={["#080F20"]} />
<ambientLight intensity={0.35} />

<pointLight
  position={[4, 4, 4]}
  intensity={30}
  color="#00F5FF"
/>

<pointLight
  position={[-4, -2, 3]}
  intensity={25}
  color="#8B5CF6"
/>

<pointLight
  position={[0, 5, -4]}
  intensity={20}
  color="#FF4FD8"
/>

<Network />
   

        <OrbitControls
          autoRotate
          autoRotateSpeed={0.6}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
export { HexDiagram };