import { message } from '@/hooks/useMessage';
import { Button, Empty, Modal, Spin } from 'antd';
import { useEffect, useMemo, useRef, useState } from 'react';

type PrintModalProps = {
	api: {
		byOrderGetHTML: (params: { docNo: string; docType: string; isMaterial: string }) => Promise<any>;
	};
	open: boolean;
	onCancel: () => void;
	record?: any;
};

const removeAutoPrintScript = (html: string) => html.replace(/<script>\s*window\.onload\s*=\s*function\s*\(\)\s*\{\s*window\.print\(\);\s*\};\s*<\/script>/i, '');

const PrintModal = ({ api, open, onCancel, record }: PrintModalProps) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [loading, setLoading] = useState(false);
	const [html, setHtml] = useState('');
	const docNo = useMemo(() => record?.document_id__c || '', [record]);
	const docType = useMemo(() => record?.document_type__c || '', [record]);
	const isMaterial = useMemo(() => record?.is_material__c || '原料', [record]);

	useEffect(() => {
		const fetchPrintHtml = async () => {
			if (!open || !docNo || !docType) {
				setHtml('');
				return;
			}
			try {
				setLoading(true);
				const res: any = await api.byOrderGetHTML({ docNo, docType, isMaterial });
				// console.log("res", res);
				if (res.data.success) {
					setHtml(removeAutoPrintScript(typeof res?.data.data === 'string' ? res.data.data : ''));
				} else {
					setHtml('');
				}
			} catch (error: any) {
				setHtml('');
				message.error(error?.message || '获取打印内容失败');
			} finally {
				setLoading(false);
			}
		};

		fetchPrintHtml();
	}, [open, docNo]);

	const handlePrint = () => {
		if (!html) {
			message.warning('暂无可打印内容');
			return;
		}
		iframeRef.current?.contentWindow?.focus();
		iframeRef.current?.contentWindow?.print();
	};

	return (
		<Modal
			title={`打印单据${docNo ? ` - ${docNo}` : ''}`}
			open={open}
			onCancel={onCancel}
			width={1280}
			destroyOnClose
			styles={{ body: { minHeight: 760, padding: 16 } }}
			footer={[
				<Button key='cancel' onClick={onCancel}>
					关闭
				</Button>,
				<Button key='print' type='primary' loading={loading} onClick={handlePrint} disabled={!html}>
					打印
				</Button>,
			]}
		>
			{loading ? (
				<div className='flex min-h-[700px] items-center justify-center'>
					<Spin size='large' />
				</div>
			) : html ? (
				<iframe ref={iframeRef} title='print-preview' srcDoc={html} className='h-[700px] w-full border-0' />
			) : (
				<div className='flex min-h-[700px] items-center justify-center'>
					<Empty description='未获取到打印内容' />
				</div>
			)}
		</Modal>
	);
};

export default PrintModal;
