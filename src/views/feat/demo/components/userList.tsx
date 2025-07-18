import { Card, Descriptions } from 'antd';
import React, { useState } from 'react';
import type { DescriptionsProps } from 'antd';

interface UserType {
	name: string;
	age: number;
	address: string;
}

const UserDemo: React.FC<{ user: UserType }> = ({ user }): any => {
	const items: DescriptionsProps['items'] = [
		{
			key: '1',
			label: 'name',
			children: user['name'],
		},
		{
			key: '2',
			label: 'age',
			children: user['age'],
		},
		{
			key: '3',
			label: 'address',
			children: user['address'],
		},
	];
	return <Descriptions title='USERINFO' items={items} />;
};

const UserList = () => <UserDemo user={{ name: 'Dail', age: 16, address: 'Shanghai' }} />;

export default UserList;
