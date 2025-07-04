/* eslint-disable prettier/prettier */
import { Card, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { ContainerStyled, MasonicStyled, HeaderStyled, CardStyled } from './styled';
import { Masonry } from 'masonic';
import catName from 'cat-names';
import catArr from './cat';
import UseLazyLoadImage from '@/hooks/useLazyloadImage';
import './index.less';

const CatDetail: React.FC = () => {
	const [item, setItem] = useState(() => {
		let id = 0;
		return Array.from(Array(120), () => ({
			id: id++,
			name: catName.random(),
			src: catArr[Math.floor(Math.random() * catArr.length)],
		}));
	});

	return (
		<>
			<Card className='rootCard max-w-full relative'>
				<HeaderStyled className='m-0' minify={'false'}>
					<span role='img' aria-hidden='true'>
						🧱
					</span>
					MASONIC
				</HeaderStyled>
				<ContainerStyled>
					<MasonicStyled>
						<Masonry items={item} columnGutter={6} columnWidth={272} overscanBy={5} render={FakeCard} />
					</MasonicStyled>
				</ContainerStyled>
			</Card>
		</>
	);
};

function FakeCard({ data: { id, name, src } }: any) {
	return (
		<CardStyled>
			<UseLazyLoadImage src={src || ''} alt='正在加载...' />
			<span children={name} />
		</CardStyled>
	);
}

export default CatDetail;
