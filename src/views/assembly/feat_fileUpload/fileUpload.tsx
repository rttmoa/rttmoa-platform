/* eslint-disable prettier/prettier */
import { message } from '@/hooks/useMessage';
import { LoadingOutlined, StarOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';

let defaultFileList: any = [
	{
		uid: '1',
		name: 'xxx.png',
		status: 'uploading',
		url: 'http://www.baidu.com/xxx.png',
		percent: 33,
	},
	{
		uid: '2',
		name: 'yyy.png',
		status: 'done',
		url: '	https://designer.mocky.io/static/media/chi-hang-leong-hehYcAGhbmY-unsplash.6914f9ac.jpg',
	},
	{
		uid: '3',
		name: 'zzz.png',
		status: 'error',
		response: 'Server Error 500', // custom error message to show
		url: '	https://designer.mocky.io/static/media/chi-hang-leong-hehYcAGhbmY-unsplash.6914f9ac.jpg',
	},
];
let getBase64 = (file: RcFile): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});
};
const FileUpload: React.FC = () => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);
	const [loading, setLoading] = useState<boolean>(false);
	// upload: https://ant.design/components/upload-cn
	const uploadProps: UploadProps = {
		fileList: fileList,
		name: 'file',
		action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
		headers: {
			authorization: 'authorization-text',
		},
		onChange(info) {
			setFileList(info.fileList);
			if (info.file.status == 'uploading') {
				setLoading(true);
				// console.log("a", info.file, info.fileList);
				return;
			}
			if (info.file.status === 'done') {
				setLoading(false);
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === 'error') {
				setLoading(false);
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onRemove(file) {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice(index);
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		// 上传前校验 & 上传前转换文件
		beforeUpload(file: RcFile, FileList) {
			const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/png';
			if (!isJpgOrPng) {
				console.log('仅接收传递的 jpg|png');
			}
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				console.log('上传的文件必须小于 2M');
				return;
			}
			if (file.type.includes('image')) {
				return new Promise((resolve: any) => {
					const reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = () => {
						const img = document.createElement('img');
						img.src = reader.result as string;
						img.onload = () => {
							const canvas = document.createElement('canvas');
							canvas.width = img.naturalWidth;
							canvas.height = img.naturalHeight;
							const ctx = canvas.getContext('2d')!;
							ctx.drawImage(img, 0, 0);
							ctx.fillStyle = 'red';
							ctx.textBaseline = 'middle';
							ctx.font = '33px Arial';
							ctx.fillText('Watermark', 20, 20);
							canvas.toBlob(result => resolve(result as any));
						};
					};
				});
			}
			return true; // 任何都可以
			// return isJpgOrPng && isLt2M; // 为图片&文件大小
		},
		progress: {
			strokeColor: {
				'0%': '#108ee9',
				'100%': '#87d068',
			},
			size: 3,
			format: (percent: number | undefined): any => percent && `${parseFloat(percent.toFixed(2))}%`,
		},
		multiple: true,
		maxCount: 15,
		listType: 'picture-card', // 'picture-circle'
		// 自定义交互图标, 使用 showUploadList 设置列表交互图标。
		showUploadList: {
			// showDownloadIcon: true,
			// downloadIcon: "Download",
			showRemoveIcon: true,
			removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
		},
		onPreview: async function (file: UploadFile) {
			if (!file.url && !file.preview) {
				file.preview = await getBase64(file.originFileObj as RcFile);
			}
			setPreviewImage(file.url || (file.preview as string));
			setPreviewOpen(true);
			setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
		},
	};
	const handleCancel = () => setPreviewOpen(false);
	return (
		<>
			<div>
				<h3>
					<b>文件上传</b>
				</h3>
				<Upload {...uploadProps}>
					<Button icon={loading ? <LoadingOutlined /> : <UploadOutlined />}></Button>
				</Upload>
				<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
					<img alt='example' style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</div>
		</>
	);
};

export default FileUpload;
