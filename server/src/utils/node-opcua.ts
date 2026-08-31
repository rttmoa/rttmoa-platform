// const { OPCUAClient, AttributeIds, TimestampsToReturn } = require('node-opcua');

// const endpointUrl = 'opc.tcp://localhost:49320'; // 修改为你的Kepware OPC UA地址
// const nodeId = 'ns=2;s=Channel1.Device1.Tag1'; // 修改为你的Tag NodeId

// (async () => {
// 	try {
// 		const client = OPCUAClient.create({
// 			endpointMustExist: false,
// 		});
// 		await client.connect(endpointUrl);

// 		const session = await client.createSession();

// 		const dataValue = await session.read({
// 			nodeId,
// 			attributeId: AttributeIds.Value,
// 		});

// 		console.log('PLC信号值:', dataValue.value.value);

// 		await session.close();
// 		await client.disconnect();
// 	} catch (err) {
// 		console.error('读取失败:', err);
// 	}
// })();
