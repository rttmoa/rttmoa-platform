const express = require('express');
const router = express.Router();
const objectql = require('@steedos/objectql');

router.get('/api', async function (req, res) {
	// ! 增删改查 语句

	res.status(200).send({ message: 'router ok' });
});
exports.default = router;
