import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.cjs'
import './index.less'

export default function Threejs() {
	return (
		<div className="root">
			<h2 className="title">React Three Fiber</h2>
			<Canvas camera={{ position: [0, 0, 1] }}>
				<Stars />
			</Canvas>
		</div>
	)
}
function Stars(props: any) {
	// const ref: any = useRef(null); // Error
	const ref: any = useRef({ rotation: { x: 0, y: 0, z: 0 } })
	const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
	useFrame((state: any, delta: number) => {
		ref.current.rotation.x -= delta / 10
		ref.current.rotation.y -= delta / 15
		ref.current.rotation.z -= 0
	})
	return (
		<group>
			<Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
				<PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
			</Points>
		</group>
	)
}
