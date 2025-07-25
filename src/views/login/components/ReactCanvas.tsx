import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Canvas, NodeProps, Overwrite, useFrame } from '@react-three/fiber';
import { Trail, Float, Line, Sphere, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

type ExtendedColors<T> = T & {
	color: number[];
	toneMapped: boolean;
};

// 使用类型断言
const MaterialProps1 = { color: [6, 0.5, 2], toneMapped: false } as ExtendedColors<Overwrite<Partial<{}>, NodeProps<{}, {}>>>;
const MaterialProps2 = { color: [10, 1, 10], toneMapped: false } as ExtendedColors<Overwrite<Partial<{}>, NodeProps<{}, {}>>>;

// refer: https://codesandbox.io/p/sandbox/react-ellipsecurve-xzi6ps?file=%2Fsrc%2FApp.js%3A12%2C17
export default function ReactCanvas() {
	return (
		<div className='w-full h-full bg-transparent'>
			<Canvas camera={{ position: [0, 0, 10] }}>
				{/* <color attach="background" args={['transparent']} /> */}
				<Float speed={4} rotationIntensity={1} floatIntensity={2}>
					<Atom />
				</Float>
				<Stars saturation={0} count={800} speed={0.5} />
				<EffectComposer>
					<Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
				</EffectComposer>
			</Canvas>
		</div>
	);
}

function Atom(props: any) {
	const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), []);
	return (
		<group {...props}>
			<Line worldUnits points={points} color='turquoise' lineWidth={0.3} />
			<Line worldUnits points={points} color='turquoise' lineWidth={0.3} rotation={[0, 0, 1]} />
			<Line worldUnits points={points} color='turquoise' lineWidth={0.3} rotation={[0, 0, -1]} />
			<Electron position={[0, 0, 0.5]} speed={6} />
			<Electron position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 3]} speed={6.5} />
			<Electron position={[0, 0, 0.5]} rotation={[0, 0, -Math.PI / 3]} speed={7} />
			<Sphere args={[0.55, 64, 64]}>
				<meshBasicMaterial {...MaterialProps1} />
			</Sphere>
		</group>
	);
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
	const ref = useRef<any>();
	useFrame(state => {
		const t = state.clock.getElapsedTime() * speed;
		ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0);
	});
	return (
		<group {...props}>
			<Trail local width={5} length={6} color={new THREE.Color(2, 1, 10)} attenuation={t => t * t}>
				<mesh ref={ref}>
					<sphereGeometry args={[0.25]} />
					<meshBasicMaterial {...MaterialProps2} />
				</mesh>
			</Trail>
		</group>
	);
}
