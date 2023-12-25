const axios = `
import JsonP from "jsonp";
import axios from "axios";
import { Modal } from "antd";

export default class Axios {
	static axiosJSON() {
		return axios;
	}
	static jsonp(options) {
		return new Promise((resolve, reject) => {
			JsonP(
				options.url,
				{
					param: "callback"
				},
				function (err, response) {
					if (response && response.status === "success") {
						resolve(response);
					} else {
						reject(response && response.messsage);
					}
				}
			);
		});
	}

	static ajax(options) {
		// console.log(options)
		let loading;
		if (options.data && options.data.isShowLoading !== false) {
			loading = document.getElementById("ajaxLoading");
			loading.style.display = "block";
		}
		// let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
		let baseApi = " https://mock.mengxuegu.com/mock/6420434ee24b4b4cfeaca0ea/api";
		return new Promise((resolve, reject) => {
			axios({
				url: options.url,
				method: "get",
				baseURL: baseApi,
				timeout: 5000,
				params: (options.data && options.data.params) || ""
			})
				.then(response => {
					// console.log(response)
					if (options && options.data && options.data.isShowLoading !== false) {
						loading = document.getElementById("ajaxLoading");
						loading.style.display = "none";
					}
					if (response && response.status === 200) {
						// console.log(response.data)
						let res = response.data;
						// let newRes = JSON.parse(JSON.stringify(res))
						// console.log(newRes)
						if (res.code === "0") {
							resolve(res);
						} else {
							Modal.info({ title: "提示", content: res.msg });
						}
					} else {
						// console.log(response)
						reject(response.data);
					}
				})
				.catch(error => {
					loading.style.display = "none";
					console.log(error);
					reject(error);
				});
		});
	}
}
export default page;
`;

export default axios;
