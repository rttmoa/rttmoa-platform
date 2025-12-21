const express = require('express');
const router = express.Router();
const objectql = require('@steedos/objectql');

router.post('/api/taskpost', async function (req, res) {
	console.log('/api/taskover');

	const data = req.body;
	const { code, arriveNum, realNum } = data;
	if (code && arriveNum && realNum) {
		console.log('参数：', code, arriveNum, realNum);
		res.status(200).send({ success: true, message: 'router ok' });
	} else {
		res.status(400).send({ success: false, message: '缺少参数' });
	}
});
exports.default = router;
