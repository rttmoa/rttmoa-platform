import React, { useCallback, useEffect, useState } from 'react';
import { moduleAPI } from '@/api/modules/module';
import { ShelfLane, ShelfItem } from './common';

const CurrLay: number = 1;

const Lane: React.FC = () => {
	const [apiData, setApiData] = useState<ShelfItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const execFunc = useCallback(async () => {
		try {
			setLoading(true);
			const { data }: any = await moduleAPI.getShelf_hk_mterial({});
			console.log('data', data);
			let rawData = [];
			if ([1, 2, 3, 4].includes(CurrLay)) {
				rawData = data.data.filter((v: any) => v.lay__c == CurrLay);
			}
			if (CurrLay == 0) {
				rawData = data.data;
			}
			setApiData((rawData || []) as ShelfItem[]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		execFunc();
	}, [execFunc]);

	return <ShelfLane currLay={CurrLay} apiData={apiData} loading={loading} onRefresh={execFunc} />;
};

export default Lane;

// 这个文件中，我先描述现在的写法，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到17列，1到25排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到5排为一组，7到12排为一组，13到18排为一组，20到25排为一组。其中入库1到5排入库升序，7到12排入库降序，13到18排入库升序，20到25排入库降序。现在的需求是，其他列都是正常分配的，只是5列、6列、11列、12列的7到18排，需要改成7到14排为一组入库降序，17到18排为一组入库升序分配
