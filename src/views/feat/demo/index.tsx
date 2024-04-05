import React from 'react'
import { Button, Card, Upload } from 'antd'
import useAsyncFetch from '@/apiFetch/useAsyncFetch'
import FileUpload from './components/fileUpload'
import UserList from './components/userList'

const Demo: React.FC = () => {
	return (
		<>
			<Card className="mb20">
				<FileUpload />
			</Card>
			<Card className="mb20">
				<UserList />
			</Card>
		</>
	)
}
export default Demo
