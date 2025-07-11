import mongoose from "mongoose";
const Schema = mongoose.Schema;

// | 字段名          | 类型           | 含义                          |
// | ------------ | ------------ | --------------------------- |
// | `id`         | int (PK, AI) | 主键 ID                               |
// | `parent_id`  | int          | 父级菜单 ID（顶层为 0）                |
// | `path`       | varchar      | 路由路径 `/auth/button`               |
// | `element`    | varchar      | 对应组件路径 `/auth/button/index`     |
// | `redirect`   | varchar      | 重定向路径，如 `/auth/page`           |
// | `key`        | varchar      | 菜单/权限唯一标识，如 `authButton`     |
// | `title`      | varchar      | 菜单标题                              |
// | `icon`       | varchar      | 图标名，如 `LockOutlined`             |
// | `is_link`    | varchar      | 外链 URL，"" 表示不是外链              |
// | `is_hide`    | tinyint(1)   | 是否隐藏菜单项（0 否，1 是）            |
// | `is_full`    | tinyint(1)   | 是否全屏显示页面                       |
// | `is_affix`   | tinyint(1)   | 是否固定标签页                         |
// | `sort`       | int          | 排序值，越小越靠前                     |
// | `created_at` | datetime     | 创建时间                              |
// | `updated_at` | datetime     | 更新时间                              |



// | id | parent\_id | path              | element            | redirect   | key        | title | icon             | is\_hide | is\_full | is\_affix | created_at | updated_at
// | -- | ---------- | ----------------- | ------------------ | ---------- | ---------- | ----- | ---------------- | -------- | -------- | --------- |
// | 1  | 0          | /home/index       | /home/index        | NULL       | home       | 首页    | HomeOutlined     | 0        | 0        | 1         |
// | 2  | 0          | /dataScreen/index | /dataScreen/index  | NULL       | dataScreen | 数据大屏  | PieChartOutlined | 0        | 1        | 0         |
// | 3  | 0          | /auth             | NULL               | /auth/page | auth       | 权限管理  | LockOutlined     | 0        | 0        | 0         |
// | 4  | 3          | /auth/page        | /auth/page/index   | NULL       | pageMenu   | 页面权限  | AppstoreOutlined | 0        | 0        | 0         |
// | 5  | 3          | /auth/button      | /auth/button/index | NULL       | authButton | 按钮权限  | AppstoreOutlined | 0        | 0        | 0         |


const MenuSchema = new Schema(
	{
		parent_id: { type: Number, required: true }, // 父级菜单 ID（顶层为 0）
		path: { type: String, required: false }, // 路由路径 `/auth/button`
		element: { type: String, required: false }, // 对应组件路径 `/auth/button/index`
		redirect: { type: String, required: false }, // 重定向路径，如 `/auth/page`
		key: { type: String, required: false }, // 菜单/权限唯一标识，如 `authButton`
		title: { type: String, required: false }, // 菜单标题
		icon: { type: String, required: false }, // 图标名，如 `LockOutlined`
		is_link: { type: String }, // 外链 URL，"" 表示不是外链
		is_hide: { type: Number, min: 0, max: 1 }, // 是否隐藏菜单项（0 否，1 是）
		is_full: { type: Number }, // 是否全屏显示页面
		is_affix: { type: Number }, // 是否固定标签页
		sort: { type: Number }, // 排序值，越小越靠前
		created_at: { type: Date }, // 创建时间
		updated_at: { type: Date }, // 更新时间
	},
	{
		collection: "menu",
		versionKey: false,
	}
);
// const Menu = mongoose.model("Menu", MenuSchema);
