import React, { useCallback, useEffect, useState } from 'react';
import { moduleAPI } from '@/api/modules/module';
import { ShelfLane, ShelfItem } from './common';

const CurrLay: number = 3;

const Lane: React.FC = () => {
	const [apiData, setApiData] = useState<ShelfItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const execFunc = useCallback(async () => {
		try {
			setLoading(true);
			const { data }: any = await moduleAPI.getShelf_hk_freezing({});
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
