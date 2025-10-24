/* eslint-disable prettier/prettier */

import { Card } from 'antd';
import React, { useState } from 'react';
import { Masonry } from 'masonic';

import UseLazyLoadImage from '@/hooks/useLazyloadImage';
import catArr from './cat';

const catNames = ['Mimi', 'Luna', 'Kitty', 'Tiger', 'Simba', 'Coco', 'Neko', 'Shadow', 'Smokey', 'Garfield', 'Pumpkin', 'Oreo', 'Fluffy', 'Snowball', 'Mocha', 'Chai'];

export function getRandomCatName(): string {
	const index = Math.floor(Math.random() * catNames.length);
	return catNames[index];
}

const CatDetail = () => {
	const [item, setItem] = useState(() => {
		let id = 0;
		return Array.from(Array(120), () => ({
			id: id++,
			name: getRandomCatName(),
			src: catArr[Math.floor(Math.random() * catArr.length)],
		}));
	});

	return (
		<Card className='relative w-full'>
			<h1 className='text-center font-quantico text-2xl font-extrabold tracking-tight z-[999] transition-all py-4 rounded-xl text-white bg-black'>🧱 MASONIC</h1>
			<main className='w-full'>
				<div className='p-2 w-full mx-auto box-border'>
					<Masonry items={item} columnGutter={6} columnWidth={272} overscanBy={5} render={FakeCard} />
				</div>
			</main>
		</Card>
	);
};

function FakeCard({ data: { id, name, src } }: any) {
	return (
		<div className='flex flex-col justify-center items-center w-full min-h-[100px] bg-[#1d2326] rounded-2xl transition-transform duration-500 hover:scale-110 hover:z-50 hover:bg-white shadow-lg'>
			<UseLazyLoadImage src={src || ''} alt='正在加载...' />
			<span className='text-white hover:text-[#1d2326] p-2'>{name}</span>
		</div>
	);
}

export default CatDetail;
