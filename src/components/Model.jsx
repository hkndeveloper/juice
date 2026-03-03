import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, Float, Html, useAnimations, useFBX } from '@react-three/drei';

function Loader() {
    return (
        <Html center>
            <div className="text-neon-green font-black text-[10px] uppercase tracking-[0.4em] whitespace-nowrap bg-space-void/80 p-4 rounded-xl backdrop-blur-md border border-neon-green/20 animate-pulse">
                Sistem Hazırlanıyor...
            </div>
        </Html>
    );
}

const PlaceholderBox = ({ position, scale, color, label }) => (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={position} scale={scale}>
            <boxGeometry />
            <meshStandardMaterial color={color} wireframe transparent opacity={0.3} />
            <Html distanceFactor={10} position={[0, 1.2, 0]} center>
                <div className="text-[8px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap bg-black/50 px-2 py-1 rounded">
                    {label} DOSYASI EKSİK
                </div>
            </Html>
        </mesh>
    </Float>
);

const Model = ({ path, position, rotation, scale, floatConfig }) => {
    const { scene } = useGLTF(path);
    return (
        <Float {...floatConfig}>
            <primitive object={scene} position={position} rotation={rotation} scale={scale} />
        </Float>
    );
};

const AnimatedModel = ({ path, position, rotation, scale = 0.012 }) => {
    const group = useRef();
    const fbx = useFBX(path);
    const { actions, names } = useAnimations(fbx.animations, group);

    useEffect(() => {
        if (fbx) {
            fbx.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.frustumCulled = false;
                }
            });

            if (names.length > 0) {
                const action = actions[names[0]];
                if (action) {
                    action.reset().fadeIn(0.5).play();
                }
            }
        }
    }, [fbx, actions, names]);

    return (
        <group ref={group} position={position} rotation={rotation} scale={scale} dispose={null}>
            <primitive object={fbx} />
        </group>
    );
};

export { Model, AnimatedModel, Loader, PlaceholderBox };
export default Model;
