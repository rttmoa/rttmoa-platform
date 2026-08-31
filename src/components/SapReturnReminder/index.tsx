import { CheckCircleFilled } from '@ant-design/icons';
import { App } from 'antd';
import { useEffect } from 'react';

const REMINDER_KEY = 'sap-return-document-reminder';
const REMINDER_HOUR = 9;

const getNextReminderDelay = () => {
	const now = new Date();
	const nextReminder = new Date(now);
	nextReminder.setHours(REMINDER_HOUR, 0, 0, 0);

	if (now.getTime() >= nextReminder.getTime()) {
		nextReminder.setDate(nextReminder.getDate() + 1);
	}

	return nextReminder.getTime() - now.getTime();
};

const SapReturnReminder = () => {
	const { notification } = App.useApp();

	useEffect(() => {
		let timer: number | undefined;

		const showReminder = () => {
			notification.success({
				key: REMINDER_KEY,
				message: '请手动回传SAP系统单据 ⛅',
				description: '回传前一天入库或出库的单据！',
				duration: 0,
				icon: <CheckCircleFilled style={{ color: '#73d13d' }} />,
			});
		};

		const scheduleNextReminder = () => {
			timer = window.setTimeout(() => {
				showReminder();
				scheduleNextReminder();
			}, getNextReminderDelay());
		};

		scheduleNextReminder();

		return () => {
			if (timer) {
				window.clearTimeout(timer);
			}
		};
	}, [notification]);

	return null;
};

export default SapReturnReminder;
