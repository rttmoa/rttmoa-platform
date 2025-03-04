import { Card } from 'antd'
import ScadaImage from './Scada.png'
import './index.less'

const Scada: React.FC = () => {
	return (
		<div className="scada-container flex">
			<Card className="sc-card relative w-full h-auto flex flex-col justify-center items-center overflow-hidden">
				<img className="sc-img" src={ScadaImage} alt="" />
				<div className="sc-1">123</div>
				<ScadaMap />
			</Card>
		</div>
	)
}

const ScadaMap = () => {
	const blueSquares = [
		{ x: 100, y: 200 },
		{ x: 300, y: 400 },
		{ x: 500, y: 600 },
	]
	return (
		<div style={{ position: 'relative', width: '1000px', height: '600px', background: "url('/Scada.png') no-repeat", backgroundSize: 'cover' }}>
			{blueSquares.map((square, index) => (
				<div
					key={index}
					style={{
						position: 'absolute',
						left: `${square.x}px`,
						top: `${square.y}px`,
						width: '20px',
						height: '20px',
						backgroundColor: 'blue',
						borderRadius: '5px',
					}}
				/>
			))}
		</div>
	)
}

export default Scada
