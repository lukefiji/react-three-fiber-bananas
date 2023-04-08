import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import Banana from './components/Banana';

interface Props {
  count: number;
  depth: number;
}

function App({ count = 100, depth = 80 }: Props) {
  return (
    <Canvas
      gl={{ alpha: false }}
      camera={{ near: 0.01, far: count + 10, fov: 30 }}
    >
      <color attach="background" args={['#ffbf40']} />
      {/* <ambientLight intensity={0.2} /> */}
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        {Array.from({ length: count }, (_, i) => (
          <Banana key={i} z={-(i / count) * depth - 20} />
        ))}
        <EffectComposer>
          <DepthOfField
            target={[0, 0, depth / 2]}
            focalLength={0.5}
            bokehScale={11}
            height={750}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export default App;
