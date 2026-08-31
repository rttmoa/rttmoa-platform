import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { Modal, message, List, Card, Input, Form, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { useTranslation } from 'react-i18next';

export interface ShowPassModalProps {
	name: string;
}

export interface PasswordModalRef {
	showModal: (param: ShowPassModalProps) => void;
}

// .
// todo
const PasswordModal = forwardRef<PasswordModalRef, {}>((_props, ref) => {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [pic, setPic] = useState([{ url: '' }]);
	const [username, setUserName] = useState('');
	const formRef = useRef(null);
	const [fileList, setFileList] = useState<UploadFile[]>([
		{
			uid: '-1',
			name: 'image.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
	]);

	useImperativeHandle(ref, () => ({ showModal }));

	const showModal = (params: ShowPassModalProps) => {
		console.log(params);
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		message.success('修改密码成功 🎉');
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const onPreview = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise(resolve => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

	let title = '修改用户信息（用户名，头像，密码）';
	return (
		<Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<Form
				layout='horizontal'
				// style={{ "--border-top": "none" }}
				// footer={
				//   <ButtonAgain color="primary" onClick={submit}>
				//     提交
				//   </ButtonAgain>
				// }
				ref={formRef}
				// initialValues={{ phone: "18888888888", code: "" }}
			>
				<Form.Item label='手机号' initialValue='18888888888' name='phone'>
					<Input placeholder='请输入手机号' disabled />
				</Form.Item>
				<Form.Item label='用户名' initialValue={t('user.username')} name='UserName'>
					<Input placeholder='请输入用户名' />
				</Form.Item>
				<Form.Item name='picture' label='图片上传'>
					<ImgCrop rotationSlider>
						<Upload action='https://www.mocky.io/v2/5cc8019d300000980a055e76' listType='picture-card' fileList={fileList} onChange={onChange} onPreview={onPreview}>
							{fileList.length < 5 && '+ Upload'}
						</Upload>
					</ImgCrop>
				</Form.Item>
			</Form>
		</Modal>
	);
});

PasswordModal.displayName = 'PasswordModal';

export default PasswordModal;
