const express = require('express');
const router = express.Router();
const objectql = require('@steedos/objectql');

router.get('/api/taskover', async function (req, res) {
	console.log('/api/taskover');

	res.status(200).send({ message: 'router ok' });
});
exports.default = router;
