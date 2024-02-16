import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, message, Upload, UploadFile, FormInstance } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { UploadChangeParam } from "antd/es/upload";
import defaultImg from "@/assets/images/defaultImg.jpg";
import { productList } from "@/api/modules/module/product";
import BraftEditorText from "./component/braftEditorText";
// import RichBraftEditor from "./component/rich-text-editor";
import PicturesWall from "./component/pictures-wall";

const serverUrl = "http://localhost:3009";

const Edit = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const id = location.search.split("=")[1];

	// const [id, setId] = useState("")
	const [product, setproduct] = useState<any>({}); // 产品信息
	const [imageUrl, setImageUrl] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	// 初始化的时候执行
	useEffect(() => {
		if (id) {
			productList(1, 5).then((res: any) => {
				const result = res.data.list.filter((value: any) => value._id === id);
				console.log(result);
				setproduct(result[0]);
				setImageUrl([result[0].coverImg]);
			});
		}
	}, []);
	console.log(imageUrl);
	// 图片上传
	const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
		// console.log(info);return;
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// 上传成功
			// Get this url from response in real world.
			setLoading(false);
			// console.log(info);
			setImageUrl(info.file.response.info);
		}
	};

	const onFinish = (values: any) => {
		// editorState.toHTML()获取当前富文本的内容
		// console.log(editorState.toHTML());
		console.log(values); // {name: 'zhangsan', price: '444'}

		// e.preventDefault()
		// props.form.validateFieldsAndScroll((err, values) => {}

		// ? 判断是编辑 还是新建，做对应的操作
		// if (id) {
		//   modifyOne(id, {
		//     ...values,
		//     coverImg: imageUrl,
		//     content: editorState.toHTML()
		//   });
		// } else {
		//   createApi({
		//     ...values,
		//     coverImg: imageUrl,
		//     content: editorState.toHTML()
		//   })
		//     .then(res => {
		//       navigate("/list/curd/product");
		//       setCurrentData({});
		//       setImageUrl("");
		//       setLoading(false);
		//       setEditorState("");
		//     })
		//     .catch(err => { console.log(err); });
		// }
	};

	if (id) {
		if (JSON.stringify(product) === "{}") return;
	}
	const layout = {
		labelCol: { span: 2 },
		wrapperCol: { span: 12 }
	};
	return (
		<Card
			title={id ? "商品编辑" : "商品添加"}
			extra={
				<Button
					onClick={() => {
						navigate("/module/product");
					}}>
					返回
				</Button>
			}>
			<Form
				{...layout}
				name="control-hooks"
				onFinish={onFinish}
				initialValues={{
					name: product.name,
					price: product.price,
					desc: product.desc
				}}>
				<Form.Item name="name" label="商品名字" rules={[{ required: true, message: "请输入商品名字" }]}>
					<Input placeholder="请输入商品名字" />
				</Form.Item>
				<Form.Item name="desc" label="商品描述" rules={[{ required: true, message: "请输入商品描述信息" }]}>
					<Input.TextArea placeholder="请输入商品描述信息" />
				</Form.Item>
				<Form.Item
					name="price"
					label="商品价格"
					rules={[
						{
							required: true,
							message: "请输入商品价格",
							validator(rule, value, callback) {
								console.log(value, typeof value);
								value * 1 > 0 ? callback() : callback("商品价格必须大于 0");
							}
						}
					]}>
					<Input placeholder="请输入商品价格" addonAfter="元" />
				</Form.Item>

				<Form.Item label="商品图片">
					<PicturesWall images={imageUrl} ref={null} />
				</Form.Item>

				<Form.Item label="商品详情: " name="detail">
					{/* <BraftEditorText /> */}
					{/* <RichBraftEditor detail="初值" ref={null} /> */}
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 2 }}>
					<Button htmlType="submit" type="primary">
						保存
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};
export default Edit;
