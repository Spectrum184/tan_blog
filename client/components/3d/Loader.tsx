import { FC } from "react";
import { Html, useProgress } from "@react-three/drei";

const Loader: FC = () => {
  const { progress } = useProgress();

  return (
    <Html center className="text-green-500">
      <progress max={100} value={progress} className="h-1 w-32 rounded-sm" />
    </Html>
  );
};

export default Loader;
