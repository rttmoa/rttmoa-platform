import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

/**
 * 富文本编辑器
 * 配置：https://www.wangeditor.com/v5/
 * @returns
 */
function MyEditor() {
	// editor 实例
	const [editor, setEditor] = useState<IDomEditor | null>(null)

	// 编辑器内容
	const [html, setHtml] = useState('<p>hello</p>')

	// 模拟 ajax 请求，异步设置 html
	useEffect(() => {
		setTimeout(() => {
			setHtml('<p>hello world</p>')
		}, 1500)
	}, [])

	// 工具栏配置
	const toolbarConfig: Partial<IToolbarConfig> = {}

	// 编辑器配置
	const editorConfig: Partial<IEditorConfig> = {
		placeholder: '请输入内容...',
	}

	// 及时销毁 editor ，重要！
	useEffect(() => {
		return () => {
			if (editor == null) return
			editor.destroy()
			setEditor(null)
		}
	}, [editor])

	return (
		<>
			<div style={{ border: '1px solid #ccc', zIndex: 100 }}>
				<Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" style={{ borderBottom: '2px solid #ccc' }} />
				<Editor
					defaultConfig={editorConfig}
					value={html}
					onCreated={setEditor}
					onChange={(editor: IDomEditor) => setHtml(editor.getHtml())}
					mode="default"
					style={{ height: '500px', overflowY: 'hidden' }}
				/>
			</div>
			<pre>{html}</pre>
		</>
	)
}

export default MyEditor
