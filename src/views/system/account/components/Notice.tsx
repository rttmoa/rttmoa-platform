import { Checkbox } from 'antd';
import React from 'react';

export default function Notice() {
	return (
		<div>
			<h2 className='text-lg mb-8'>事务待办</h2>
			<div className='flex mb-6'>
				<div className='w-[180px]'>有新的代办</div>
				<Checkbox onChange={() => {}}>短信推送</Checkbox>
				<Checkbox onChange={() => {}}>微信推送</Checkbox>
			</div>
			<div className='flex'>
				<div className='w-[180px]'>待办有效时间剩24小时</div>
				<Checkbox onChange={() => {}}>短信推送</Checkbox>
				<Checkbox onChange={() => {}}>微信推送</Checkbox>
			</div>
		</div>
	);
}
