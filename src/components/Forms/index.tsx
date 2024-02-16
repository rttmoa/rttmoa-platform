import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";

const initFilter = (arr: any[]) => {
	const obj: any = {};
	arr.forEach((item: any) => {
		switch (item.type) {
			case "inputString":
				obj[item.name] = item.initValue || "";
				break;
			case "select":
				obj[item.name] = item.initValue || 0;
				break;
			case "dateRange":
				item.name.forEach((name: string | number) => {
					obj[name] = "";
				});
				break;
			default:
				break;
		}
	});
	return obj;
};

function getOptionList(data = []) {
	if (!data) {
		return [];
	}
	let options: any = []; //[<Option value="0" key="all_key">全部</Option>];
	data.forEach((item: any) => {
		options.push(
			<Select.Option value={item.id} key={item.id}>
				{item.name}
			</Select.Option>
		);
	});
	return options;
}
function formateDate(time: string | number) {
	if (!time) return "";
	const date = new Date(time);
	const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
	const data = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	return `${date.getFullYear()}-${month}-${data}`;
}
/**
 * 封装 Form 表格查询条件条件
 * @param props
 * @returns
 */
export default function MultiForm(props: any) {
	const { filterSubmit, multiForm } = props;

	// 展开，收起按钮
	const [expand, setexpand] = useState(false);

	// 表单提交按钮
	const Submit = () => {
		let filterValue = multiForm.getFieldsValue();
		console.log("filterValue", filterValue);
		if (filterValue.startTime) {
			filterValue.startTime = formateDate(filterValue.startTime);
		}
		if (filterValue.endTime) {
			filterValue.endTime = formateDate(filterValue.endTime);
		}
		filterSubmit && filterSubmit(filterValue);
	};

	// 重置按钮
	const reset = () => {
		console.log("重置按钮");
		multiForm.resetFields();
	};

	const initFormList = (): React.ReactNode[] => {
		const { formList, extendFormList } = props;
		let formItemList: any[] = [];
		if (formList && formList.length > 0) {
			formList.forEach((item: any, index: number) => {
				const { label, field, tree, type, initialValue, placeholder, width, name } = item;
				switch (type) {
					case "TIME":
						formItemList.push(
							<Form.Item name={"startTime"} label={"开始时间"} key={"startTime"}>
								<DatePicker style={width} showTime={true} placeholder={placeholder} format="YYYY-MM-DD hh:mm:ss" />
							</Form.Item>,
							<Form.Item label="结束时间" name={"endTime"} key={"endTime"}>
								<DatePicker style={width} showTime={true} placeholder={placeholder} format="YYYY-MM-DD hh:mm:ss" />
							</Form.Item>
						);
						break;
					case "INPUT":
						formItemList.push(
							<Form.Item name={field} label={label} key={field}>
								<Input type="text" style={{ width }} placeholder={placeholder} />
							</Form.Item>
						);
						break;
					case "SELECT":
						formItemList.push(
							<Form.Item name={field} label={label} key={field}>
								<Select style={{ width }} placeholder={placeholder}>
									{getOptionList(item.list)}
								</Select>
							</Form.Item>
						);
						break;
					case "CHECKBOX":
						formItemList.push(
							<Form.Item name={field} label={label} key={field}>
								<Checkbox>{label}</Checkbox>
							</Form.Item>
						);
						break;
					default:
						break;
				}
			});
		}

		// 展开的表单
		if (extendFormList && extendFormList.length > 0) {
			extendFormList.forEach((item: any) => {
				const { label, field, tree, type, initialValue, placeholder, width, name, style } = item;
				if (type === "INPUT") {
					const INPUT = (
						<Form.Item name={field} label={label} key={field} style={style}>
							<Input type="text" placeholder={placeholder} style={{ width }} />
						</Form.Item>
					);
					if (expand === true) {
						formItemList.push(INPUT);
					} else {
						formItemList.push([]);
					}
				} else if (type === "SELECT") {
					const SELECT = (
						<Form.Item name={field} label={label} key={field} style={style}>
							<Select style={{ width }} placeholder={placeholder}>
								{getOptionList(item.list)}
							</Select>
						</Form.Item>
					);
					if (expand === true) {
						formItemList.push(SELECT);
					} else {
						formItemList.push([]);
					}
				}
			});
		}
		return formItemList;
	};

	return (
		<div>
			<Form layout="inline" form={multiForm}>
				<div style={{ display: "flex" }}>
					<Row style={{ width: "calc(100% - 300px)" }} gutter={[32, 24]}>
						{initFormList().map((value, index) => {
							return <Col span={8}>{value}</Col>;
						})}
					</Row>
					<div style={{ width: 300, position: "fixed", right: 0 }}>
						<Form.Item>
							<Button type="primary" onClick={Submit}>
								查询
							</Button>
							<Button className="mx-3" onClick={reset}>
								重置
							</Button>
							<a
								href="javascript:;"
								onClick={() => {
									setexpand(!expand);
								}}>
								{props && props.extendFormList && props.extendFormList.length > 0 ? (expand === false ? "展开" : "收起") : ""}
							</a>
						</Form.Item>
					</div>
				</div>
			</Form>
		</div>
	);
}
