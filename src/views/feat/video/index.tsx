import { Card } from 'antd'
import React from 'react'
import ReactPlayer from 'react-player'

// Render a YouTube video player

const Index = () => {
	return (
		<Card>
			<ReactPlayer
				url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
				playing
				controls
				loop={true} // 调试阶段为true
				light={false}
				volume={0.5}
			/>
		</Card>
	)
}
export default Index
