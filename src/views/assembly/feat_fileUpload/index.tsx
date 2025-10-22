import React from 'react';
import { Card } from 'antd';
import FileUpload from './fileUpload';

const Demo: React.FC = () => {
	return (
		<>
			<Card className='w-full h-full'>
				<Card>
					<FileUpload />
				</Card>
			</Card>
		</>
	);
};
export default Demo;
