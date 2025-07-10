import mongoose from "mongoose";
let Schema = mongoose.Schema;

const SchemaType = new Schema(
	{
		parent_id: {
			// type: Schema.Types.Mixed, // 可以是任意类型，如 0 或字符串
			type: [Number, String],
			default: 0,
			require: true,
		}, // 父级菜单ID（顶层为0或null） ^&  子部门parent_id为上级部门的name
		name: { type: String, required: false }, // 部门名称：研发部
		label: String, // 部同部门：研发部
		leader: String, // 部门负责人iD或姓名：张三

		email: String, // 邮箱： 908240440@qq.comments

		// * 2、支持多种类型（比如 0 或字符串）
		phone: {
			type: [Number, String],
			default: 0,
			require: true,
		},

		// * 3、枚举：enum
		status: {
			type: String,
			enum: ["todo", "doing", "done"], // 枚举：enum   限制取值范围、 只能是这几种值
			default: "todo",
		},

		// * 4、嵌套对象
		contact: {
			email: String,
			phone: String,
		},

		// * 5、数组类型
		tags: [String], // 字符串数组
		likes: [Number], // 数字数组

		// * 6、嵌套数组 + 对象
		items: [
			{
				productId: String,
				quantity: Number,
				price: Number,
			},
		],

		// * 7. ObjectId 引用关系（关联另一张表）
		postId: { type: Schema.Types.ObjectId, ref: "Post" }, // 引用 Post 表
		userId: { type: Schema.Types.ObjectId, ref: "User" }, // 引用 User 表

		// * 8. Mixed 类型（允许任意结构）
		data: { type: Schema.Types.Mixed }, // data 可以是任何结构

		// * 9. 自定义校验器
		price: {
			type: Number,
			validate: {
				validator: (v: number) => v >= 0,
				message: (props: { value: any }) => `价格不能为负数！当前是 ${props.value}`,
			},
		},

		createBy: "admin",
		updateBy: String,
		created_at: { type: Date, default: Date.now() }, // 创建时间
		updated_at: { type: Date, default: Date.now() }, // 更新时间
	},
	{
		collection: "SchemaType",
		versionKey: false,
	}
);
const SchemaTypes = mongoose.model("SchemaType", SchemaType);
