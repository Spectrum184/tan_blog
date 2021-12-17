import Loader from "./Loader";
import Blink from "./Blink";
import Light from "./Light";

import { FC, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const BlinkModel: FC = () => {
  return (
    <Canvas shadows>
      <Suspense fallback={<Loader />}>
        <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
        />
        <Light />
        <Blink />
      </Suspense>
    </Canvas>
  );
};

export default BlinkModel;
