import React from 'react'
import { Alert, Card, Descriptions, Tag, Typography } from 'antd'
import TestUtil from './test-util'
import Link from 'antd/lib/typography/Link'
import TestForm from './test-form'

const About: React.FC = () => {
	const { pkg, lastBuildTime } = __APP_INFO__
	const { dependencies, devDependencies, version } = pkg

	return (
		<>
			<TestUtil />
			{/* <TestForm /> */}
			<Card className="mb10">
				<Alert
					message={
						<span className="text-base text-gray-500">
							<a href="https://github.com/rttmoa/rttmoa-platform" target="_blank">
								rttmoa-platform：
							</a>
							技术基于 react@18、react-router@6、react-hook、react-redux@8、redux-toolkit、typeScript@5、vite@4、antd@5、tailwindcss@3
						</span>
					}
					type="success"
					showIcon
				/>
			</Card>

			<Card className="mb10">
				<Typography.Title level={4} className="mb15">
					项目信息
				</Typography.Title>
				<Descriptions column={2} bordered size="middle" labelStyle={{ width: '280px' }}>
					<Descriptions.Item label="版本号">
						<Tag color="processing">{version}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="发布时间">
						<Tag color="processing">{lastBuildTime}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Github">
						<Link href="https://github.com/rttmoa/rttmoa-platform" target="_blank">
							Github 地址
						</Link>
					</Descriptions.Item>
					<Descriptions.Item label="Issues">
						<Link href="https://github.com/rttmoa/rttmoa-platform/issues" target="_blank">
							Issues
						</Link>
					</Descriptions.Item>
					<Descriptions.Item label="预览地址">
						<Link href="https://rttmoa.github.io/rttmoa-platform" target="_blank">
							线上预览地址
						</Link>
					</Descriptions.Item>
				</Descriptions>
			</Card>

			<Card className="mb10 ">
				<Typography.Title level={4} className="mb15">
					生产环境依赖
				</Typography.Title>
				<Descriptions column={3} bordered size="small" labelStyle={{ width: '280px' }}>
					{Object.keys(dependencies).map(key => {
						return (
							<React.Fragment key={key}>
								<Descriptions.Item label={key}>
									<Tag color="default">{dependencies[key]} </Tag>
								</Descriptions.Item>
							</React.Fragment>
						)
					})}
				</Descriptions>
			</Card>

			<Card className="">
				<Typography.Title level={4} className="mb15">
					开发环境依赖
				</Typography.Title>
				<Descriptions column={3} bordered size="small" labelStyle={{ width: '280px' }}>
					{Object.keys(devDependencies).map(key => {
						return (
							<React.Fragment key={key}>
								<Descriptions.Item label={key}>
									<Tag color="default">{devDependencies[key]} </Tag>
								</Descriptions.Item>
							</React.Fragment>
						)
					})}
				</Descriptions>
			</Card>
		</>
	)
}
export default About
