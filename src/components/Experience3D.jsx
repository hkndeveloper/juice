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
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={3} color="#00d2ff" />

                <Suspense fallback={<Loader />}>
                    {/* Deep Space Skybox */}
                    <ModelContainer fallback={<PlaceholderBox position={[0, 0, 0]} scale={[50, 50, 50]} color="#050510" label="SPACE" />}>
                        <Model
                            path={cvData.hero.models.skybox}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                            scale={[1, 1, 1]}
                        />
                    </ModelContainer>

                    {/* Character Corridor - Three Dancers */}
                    {showCharacter && (
                        <ModelContainer fallback={<PlaceholderBox position={[0, 0, 0]} scale={[1, 2, 1]} color="#22c55e" label="KARAKTER" />}>
                            {/* Three Lights for Three Characters */}
                            <pointLight position={[-2.5, 2, 4]} intensity={5} color="#ffffff" />
                            <pointLight position={[0, 2, 4]} intensity={6} color="#ffffff" />
                            <pointLight position={[2.5, 2, 4]} intensity={5} color="#ffffff" />

                            {/* Verstappen - Sol */}
                            <AnimatedModel
                                path={cvData.hero.models.character2}
                                position={[-2.4, -0.4, 1]}
                                rotation={[0, 0, 0]}
                                scale={1.2}
                            />

                            {/* Juice WRLD - Orta (öne çıkarılmış) */}
                            <AnimatedModel
                                path={cvData.hero.models.character}
                                position={[0, -0.4, 1.6]}
                                rotation={[0, 0, 0]}
                                scale={1.4}
                            />

                            {/* YMCA Dance - Sağ */}
                            <AnimatedModel
                                path={cvData.hero.models.character3}
                                position={[2.4, -0.4, 1]}
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
