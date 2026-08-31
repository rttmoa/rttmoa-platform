 
const Ids = {};
export default class Common {
	private idList: string[] = [];
	private imgTypeList: string[] = [];
	public uname =  ""

	constructor() {
		this.idList = ["restaurant_id", "food_id", "order_id", "user_id", "address_id", "cart_id", "img_id", "category_id", "item_id", "sku_id", "admin_id", "statis_id"];
		this.imgTypeList = ["shop", "food", "avatar", "default"];
		// this.uploadImg = this.uploadImg.bind(this)
		// this.qiniu = this.qiniu.bind(this)
		this.this_Id = this.this_Id.bind(this);
	}

	getId(type: number) {
		try {
			const idData = this.idList[type];
			return idData;
		} catch (err) {
			console.log("获取ID数据失败");
			throw new Error(err);
		}
	}

	this_Id(type: number) {
		try {
			const idData = this.idList[type];
			return idData;
		} catch (err) {
			console.log("获取ID数据失败");
			throw new Error(err);
		}
	}
}
