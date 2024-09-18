import { Button, Card, Space } from 'antd'
import React from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { MermaidConfig1, MermaidConfig2, MermaidConfig3, MermaidConfig4, InitMarkup } from './config'
import MermaidHooks from './hooks/mermaidHooks'
import MarkmapHooks from './hooks/markmapHooks'

// Mermaid: https://mermaid.js.org/
// react-zoom-pan-pinch: https://github.com/BetterTyped/react-zoom-pan-pinch
const Mermaid = () => {
	return (
		<>
			<Card className="mb30">
				<h3>演示 Mermaid：</h3>
				<TransformWrapper centerOnInit centerZoomedOut>
					{({ zoomIn, zoomOut, resetTransform }) => (
						<>
							<Space>
								<Button onClick={() => zoomIn()}>放大</Button>
								<Button onClick={() => zoomOut()}>缩小</Button>
								<Button onClick={() => resetTransform()}>还原</Button>
							</Space>
							<TransformComponent>
								<MermaidHooks chart={MermaidConfig2} />
							</TransformComponent>
						</>
					)}
				</TransformWrapper>
			</Card>
			<Card>
				<h3>演示 Markmap：</h3>
				<section>
					<MarkmapHooks markmap={InitMarkup} />
				</section>
			</Card>
		</>
	)
}

export default Mermaid
