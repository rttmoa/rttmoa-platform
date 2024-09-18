import React, { useEffect } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
	startOnLoad: true,
	theme: 'light',
	securityLevel: 'loose',
	fontFamily: 'monospace',
})

const MermaidHooks = ({ chart }: any) => {
	useEffect(() => {
		mermaid.contentLoaded()
	}, [chart])
	return (
		<div>
			<div className="mermaid" style={{ width: 800, height: '100%', backgroundColor: '#fff' }}>
				{chart}
			</div>
		</div>
	)
}

export default MermaidHooks
