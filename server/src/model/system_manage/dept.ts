import mongoose from "mongoose";
let Schema = mongoose.Schema;

const DeptSchemaModal = new Schema(
	{
		parent_id: {
			// type: Schema.Types.Mixed, // 可以是任意类型，如 0 或字符串
			type: [Number, String],
			default: 0,
		}, // 父级菜单ID（顶层为0或null） ^&  子部门parent_id为上级部门的name
		name: { type: String, required: false }, // 部门名称：研发部
		label: String, // 部同部门：研发部
		leader: String, // 部门负责人iD或姓名：张三
		phone: String, // 手机号：1233333333
		email: String, // 邮箱： 908240440@qq.com
		status: Boolean, // 开关状态：true
		sort: Number, // 部门排序：1-9999
		desc: String, // 部门描述
 
		createBy: {type: String, default: "admin"}, // 创建人
 		updateBy: String,
 		created_at: Date, // 创建时间
		updated_at: Date, // 更新时间
	},
	{
		collection: "dept",
		versionKey: false,
	}
);
const DeptSchema = mongoose.model("Dept", DeptSchemaModal);
export default DeptSchema