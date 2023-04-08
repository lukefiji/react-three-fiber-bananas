import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import Banana from './components/Banana';

interface Props {
  count?: number;
  speed?: number;
  depth?: number;
  fov?: number;
}

function App({ count = 80, speed = 1, depth = 80, fov = 25 }: Props) {
  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: count + 10, fov }}>
      <color attach="background" args={['#ffbf40']} />
      <spotLight
        position={[10, 20, 10]}
        penumbra={0.5}
        intensity={2.5}
        color="#ffbf40"
      />
      {Array.from({ length: count }, (_, i) => (
        <Banana key={i} z={-(i / count) * depth - 20} speed={speed} />
      ))}
      <Environment preset="sunset" />
      <EffectComposer multisampling={0}>
        <DepthOfField
          target={[0, 0, 60]}
          focalLength={0.4}
          bokehScale={14}
          height={700}
        />
      </EffectComposer>
    </Canvas>
  );
}

export default App;
