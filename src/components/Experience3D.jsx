import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Environment } from '@react-three/drei';
import { Model, AnimatedModel, Loader, PlaceholderBox } from './Model';
import { cvData } from '../data/cvData';

// Improved Error Boundary for 3D Components
class ModelErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        console.error("3D Model Load Error Caught:", error);
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // Logging error info to help debug if needed
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

const ModelContainer = ({ children, fallback }) => (
    <ModelErrorBoundary fallback={fallback}>
        <Suspense fallback={null}>
            {children}
        </Suspense>
    </ModelErrorBoundary>
);

const Experience3D = ({ showCharacter = true }) => {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas
                shadows
                gl={{ antialias: true, alpha: true }}
            >
                <PerspectiveCamera makeDefault position={[0, 1.5, 6]} fov={50} />

                {/* Global Atmosphere */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
                <ambientLight intensity={2} />
                <pointLight position={[10, 10, 10]} intensity={3} color="#00d2ff" />

                <Suspense fallback={<Loader />}>
                    {/* Nebula Case - Orijinal Konumuna Dönüldü */}
                    <ModelContainer fallback={<PlaceholderBox position={[0, -2, 0]} scale={[6, 3, 6]} color="#a855f7" label="NEBULA" />}>
                        <Model
                            path={cvData.hero.models.nebula}
                            position={[0, -2, 0]}
                            rotation={[0, 0, 0]}
                            scale={[1.5, 1.5, 1.5]}
                            floatConfig={{ speed: 1, rotationIntensity: 0.5, floatIntensity: 1 }}
                        />
                    </ModelContainer>

                    {/* Juice WRLD character - Derinlik ve Işık İyileştirmesi */}
                    {showCharacter && (
                        <ModelContainer fallback={<PlaceholderBox position={[0, 0, 0]} scale={[1, 2, 1]} color="#22c55e" label="KARAKTER" />}>
                            {/* Karakter Işığı */}
                            <pointLight position={[0, 2, 4]} intensity={5} color="#ffffff" />
                            <AnimatedModel
                                path={cvData.hero.models.character}
                                position={[0, -0.4, 1]}
                                rotation={[0, 0, 0]}
                                scale={1.2}
                            />
                        </ModelContainer>
                    )}

                    <Environment preset="night" />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Experience3D;
