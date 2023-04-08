import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';
import { useGLTF } from '@react-three/drei';

interface Props {
  z: number;
}

function Banana({ z }: Props) {
  // Exclamation mark is a non-null assertion that ref.current is defined
  const ref = useRef<Mesh>(null!);
  const { nodes, materials } = useGLTF('/public/banana-v1.glb');

  const { viewport, camera } = useThree();

  // Fixes viewport for futher elements
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), // Random value from -1 to 1
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    // Rotate object
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.001)
    );

    // Move object vertically
    ref.current.position.set(data.x * width, (data.y += 0.015), z);

    // If height reaches top of viewport, move to below viewport
    if (data.y > height / 1.25) {
      data.y = -height / 1.25;
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes.Banana.geometry}
      material={materials.Skin}
      material-emissive="orange"
    />
  );
}

export default Banana;
