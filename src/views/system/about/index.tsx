import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Descriptions, Tag, Typography } from 'antd';
import TestUtil from './test-util';
import Link from 'antd/lib/typography/Link';
import TestForm from './test-SearchForm';
import { Is } from '@/utils/is';
import { Compute } from '@/utils/compute';
import { randomHex } from '@/utils/color';
import { connectInfo, getGeolocation, mediaDevicesObj } from '@/utils/navigator';
import useViewport from '@/hooks/_/useWinViewport';
import useMousePosition from '@/hooks/_/useWinMouse';
import useThrottle from '@/hooks/_/use_Throttle';
import useClipboard from '@/hooks/useClipboard';
// import { suffix } from '@/utils/public';

const About: React.FC = () => {
	const { pkg, lastBuildTime } = __APP_INFO__;
	const { dependencies, devDependencies, version } = pkg;

	// const { x, y } = useMousePosition();
	// console.log('width, height', x, y);
	// useEffect(() => {
	// 	console.log('Is', Is.isString(123));
	// 	console.log('Is', Is.checkStr(123, '123'));
	// 	console.log('isBrowserType', Is.reqStringify('231085199811011415'));

	// 	console.log('Compute', Compute.add(3123, 123.2222, 0));
	// });
	const [inputText, setInputText] = useState('');
	const { copyToClipboard, isCopied, textareaRef } = useClipboard();
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(e.target.value);
	};
	const handleClickCopy = () => {
		copyToClipboard(inputText);
	};
	const onClick = async (_: any) => {
		// copyTextToClipboard('adsaf1231sssss23');
		// mediaDevicesObj.startMediaInput({ video: true, audio: true });
		// useThrottle(() => {}, 2000)
	};
	// console.log('copyResult', isCopied, textareaRef);
	return (
		<>
			{/* <TestUtil /> */}
			{/* <TestForm /> */}
			<Card className='mb-[10px]'>
				<Alert
					message={
						<span className='text-base text-gray-500'>
							<a href='https://github.com/rttmoa/rttmoa-platform' target='_blank'>
								rttmoa-platform：
							</a>
							技术基于 react@18、react-router@6、react-hook、react-redux@8、redux-toolkit、typeScript@5、vite@4、antd@5、tailwindcss@3
						</span>
					}
					type='success'
					showIcon
				/>
				{/* <div className='flex justify-end mt-[10px]'>
					<Button type='primary' onClick={onClick}>
						按钮
					</Button>
				</div> */}
			</Card>

			<Card className='mb-[10px]'>
				<Typography.Title level={4} className='mb-[15px]'>
					项目信息
				</Typography.Title>
				<Descriptions column={2} bordered size='middle' labelStyle={{ width: '280px' }}>
					<Descriptions.Item label='版本号'>
						<Tag color='processing'>{version}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label='发布时间'>
						<Tag color='processing'>{lastBuildTime}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label='Github'>
						<Link href='https://github.com/rttmoa/rttmoa-platform' target='_blank'>
							Github 地址
						</Link>
					</Descriptions.Item>
					<Descriptions.Item label='Issues'>
						<Link href='https://github.com/rttmoa/rttmoa-platform/issues' target='_blank'>
							Issues
						</Link>
					</Descriptions.Item>
					<Descriptions.Item label='预览地址'>
						<Link href='https://rttmoa.github.io/rttmoa-platform' target='_blank'>
							线上预览地址
						</Link>
					</Descriptions.Item>
				</Descriptions>
			</Card>

			<Card className='mb-[10px] '>
				<Typography.Title level={4} className='mb-[15px]'>
					生产环境依赖
				</Typography.Title>
				<Descriptions column={3} bordered size='small' labelStyle={{ width: '280px' }}>
					{Object.keys(dependencies).map(key => {
						return (
							<React.Fragment key={key}>
								<Descriptions.Item label={key}>
									<Tag color='default'>{dependencies[key]} </Tag>
								</Descriptions.Item>
							</React.Fragment>
						);
					})}
				</Descriptions>
			</Card>

			<Card className=''>
				<Typography.Title level={4} className='mb-[15px]'>
					开发环境依赖
				</Typography.Title>
				<Descriptions column={3} bordered size='small' labelStyle={{ width: '280px' }}>
					{Object.keys(devDependencies).map(key => {
						return (
							<React.Fragment key={key}>
								<Descriptions.Item label={key}>
									<Tag color='default'>{devDependencies[key]} </Tag>
								</Descriptions.Item>
							</React.Fragment>
						);
					})}
				</Descriptions>
			</Card>
		</>
	);
};
export default About;
