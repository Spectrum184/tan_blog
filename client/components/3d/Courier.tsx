import Loader from "./Loader";

import { useFrame } from "@react-three/fiber";
import { FC, useEffect, useState, useRef } from "react";
import { AnimationClip, AnimationMixer, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface IGroup {
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
}

interface IActions {
  idle:
    | {
        play: () => void;
      }
    | undefined;
}

const Courier: FC = () => {
  const group = useRef<IGroup>();
  const action = useRef<IActions>();
  const [model, setModel] = useState<Object3D | null>(null);
  const [animations, setAnimations] = useState<Array<AnimationClip> | null>(
    null,
  );
  const [mixer, setMixer] = useState<AnimationMixer>();

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load("scene.gltf", async (gltf) => {
      const nodes = await gltf.parser.getDependencies("node");
      const animations = await gltf.parser.getDependencies("animation");

      setModel(nodes[0]);
      setAnimations(animations);
      setMixer(new AnimationMixer(nodes[0]));
    });
  }, []);

  useEffect(() => {
    if (animations && typeof group.current !== "undefined") {
      action.current = {
        idle: mixer?.clipAction(animations[0], group.current as Object3D),
      };

      action.current?.idle?.play();

      return () => animations.forEach((clip) => mixer?.uncacheClip(clip));
    }
  }, [animations, mixer]);

  useFrame((_, delta) => mixer?.update(delta));

  // useFrame(() => {
  //   if (typeof group.current !== "undefined") {
  //     return (group.current.rotation.y += 0.002);
  //   }
  // });

  return (
    <>
      {model ? (
        <group ref={group}>
          <primitive ref={group} scale={0.02} object={model} />
        </group>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Courier;
