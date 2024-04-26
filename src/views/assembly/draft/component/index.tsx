import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

// 接收父组件参数，并设置默认值
export interface RichEditorProps {
	value: string // 富文本值 ==> 必传
	toolbarConfig?: Partial<IToolbarConfig> // 工具栏配置 ==> 非必传（默认为空）
	editorConfig?: Partial<IEditorConfig> // 编辑器配置 ==> 非必传（默认为空）
	height?: string // 富文本高度 ==> 非必传（默认为 500px）
	mode?: 'default' | 'simple' // 富文本模式 ==> 非必传（默认为 default）
	hideToolBar?: boolean // 是否隐藏工具栏 ==> 非必传（默认为false）
	disabled?: boolean // 是否禁用编辑器 ==> 非必传（默认为false）
}

/**
 * 富文本编辑器
 * 配置：https://www.wangeditor.com/v5/
 * @returns
 */
function MyEditor(props: RichEditorProps) {
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

	/**
	 * @description 图片自定义上传
	 * @param file 上传的文件
	 * @param insertFn 上传成功后的回调函数（插入到富文本编辑器中）
	 * */
	// type InsertFnTypeImg = (url: string, alt?: string, href?: string) => void
	// props.editorConfig!.MENU_CONF!['uploadImage'] = {
	// 	async customUpload(file: File, insertFn: InsertFnTypeImg) {
	// 		if (!uploadImgValidate(file)) return
	// 		let formData = new FormData()
	// 		formData.append('file', file)
	// 		try {
	// 			// const { data } = await uploadImg(formData)
	// 			// insertFn(data.fileUrl)
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	},
	// }
	// // 图片上传前判断
	// const uploadImgValidate = (file: File): boolean => {
	// 	console.log(file)
	// 	return true
	// }
	/**
	 * @description 视频自定义上传
	 * @param file 上传的文件
	 * @param insertFn 上传成功后的回调函数（插入到富文本编辑器中）
	 * */
	// type InsertFnTypeVideo = (url: string, poster?: string) => void
	// props.editorConfig!.MENU_CONF!['uploadVideo'] = {
	// 	async customUpload(file: File, insertFn: InsertFnTypeVideo) {
	// 		if (!uploadVideoValidate(file)) return
	// 		let formData = new FormData()
	// 		formData.append('file', file)
	// 		try {
	// 			// const { data } = await uploadVideo(formData)
	// 			// insertFn(data.fileUrl)
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	},
	// }
	// // 视频上传前判断
	// const uploadVideoValidate = (file: File): boolean => {
	// 	console.log(file)
	// 	return true
	// }

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
