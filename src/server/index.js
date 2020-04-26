import axios from 'axios'
import qs from 'qs'
import { setStore, getStore } from '@/common/js/storage';
import router from '@/router';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { getCookie } from '@/common/js/cookie';

window.deleteNode = {
	checkIE: function () {
		function isIE() {
			if (!!window.ActiveXobject || "ActiveXObject" in window) {
				return true;
			} else {
				return false;
			}
		}
		function isIE11() {
			if ((/Trident\/7\./).test(navigator.userAgent)) {
				return true;
			} else {
				return false;
			}
		}
		if (isIE() || isIE11()) {
			return true;
		} else {
			return false;
		}
	}
}
// 创建axios实例
const Axios = axios.create();

// 根据不同模式切换不同的路径
if (process.env.NODE_ENV == 'development') {
	Axios.defaults.baseURL = '/';
} else if (process.env.NODE_ENV == 'debug') {
	Axios.defaults.baseURL = '/';
} else if (process.env.NODE_ENV == 'production') {
	Axios.defaults.baseURL = '/';
}
Axios.defaults.timeout = 60000; // 超时时间
Axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
Axios.defaults.responseType = 'json'; // 返回数据类型

function mesError(msg) {
	console.log(msg);
}


// POST等传参序列化(添加请求拦截器)
Axios.interceptors.request.use(config => {

	// 在发送请求之前做某件事
	if (!config.headers['Content-Type']) {
		if (config.method === "post" || config.method === "put" || config.method === "delete") {
			// if ( config.method === "put" || config.method === "delete" ){
			// 序列化
			config.data = qs.stringify(config.data);
		}
	}
	// 若是有做鉴权token , 就给头部带上token
	if (getCookie('token')) {
		config.headers['token'] = getCookie('token');
	}
	// 特殊路径 请求超时时间 单独设定
	// if (config.url.indexOf('/cordercore-74f4564b7-m47d4/api-ordershopcart/address-selection/copy-resources') >= 0) {
	// 	config.timeout = "60000"  // 60秒
	// }

	return config;
}, error => {
	let msg = "Before Ajax Error";
	mesError(msg);
	return Promise.reject(msg)
});

let errorMessageList = [];//历史错误提示列表
let errorMessageArr = [];//历史错误提示列表
let timeoutFlag = 0;

function errorMessage(error) {
	errorMessageArr.unshift(error);
	let hh = (function (errorMessageArr) {
		if (errorMessageArr.length <= 0) { return 'null' };
		var h = [];
		for (var i in errorMessageArr) {
			h.push('<li><span class="el-message-box__status el-icon-warning"></span>' + errorMessageArr[i] + '</li>');
		}
		return h.join('');
	}(errorMessageArr));

	if (document.getElementById("messageBoxError")) {
		//存在
		document.getElementById("messageBoxError").innerHTML = hh;
	} else {
		// 不存在
		MessageBox({
			title: '',
			message: '<div id="messageBoxError" class="messageBoxErrorList"><ul>' + hh + '</ul></div>',
			customClass: 'messageBoxError',
			closeOnClickModal: false, // 通过点击遮罩关闭 MessageBox
			dangerouslyUseHTMLString: true,
			confirmButtonText: '确定',
			callback: function () {

				if (deleteNode.checkIE()) {
					document.getElementById("messageBoxError").parentNode.parentNode.parentNode.parentNode.parentNode.removeNode(true);
				} else {
					document.getElementById("messageBoxError").parentNode.parentNode.parentNode.parentNode.parentNode.remove();
				}
				errorMessageArr = [];
			}
		}).then(action => {
			if (deleteNode.checkIE()) {
				document.getElementById("messageBoxError").parentNode.parentNode.parentNode.parentNode.parentNode.removeNode(true);
			} else {
				document.getElementById("messageBoxError").parentNode.parentNode.parentNode.parentNode.parentNode.remove();
			}
			errorMessageArr = [];
		});
	}
}
// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(res => {
	let resData = res.data;
	// 200: 请求处理成功
	if (res.status == 200) {
		if (res.data.code == 21002) {
			MessageBox({
				type: "error",
				title: "提示",
				message: "登录已超时，请重新登录"
			}).then(() => {
				router.push({ path: '/login' })
			});
		}
		return res;
	}
	let msg = "status格式错误！";
	mesError(msg);
	return Promise.reject(msg);
}, error => {
	console.log('errorMessageList', errorMessageList);
	//by gy. 历史错误提示列表中如果有当前接口对应的错误提示，先把历史错误提示关闭
	//   errorMessageList.forEach(function (item, index) {
	//     if (item.path == error.response.data.path) {
	//       item.message.close();
	//       errorMessageList.splice(index, 1);
	//     }
	//   });

	//  判断请求超时
	if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
		// let mes = Message({
		// 	showClose: true,
		// 	duration: 0,
		// 	dangerouslyUseHTMLString: true,
		// 	type: 'error',
		// 	message: '请求数据超时，请重新尝试！',
		// 	onClose: function () {
		// 		errorMessageList.forEach(function (item, index) {
		// 		if (item.path == error.response.data.path) {
		// 			errorMessageList.splice(index, 1);
		// 		}
		// 		});
		// 	},
		// });
		errorMessage('请求数据超时，请重新尝试！')

		//将当前错误提示加到 历史错误提示列表 中
		// if (error.response.data.path) {
		// 	errorMessageList.push({
		// 		path: error.response.data.path,
		// 		message: mes
		// 	});
		// }

		return Promise.reject(error.message);
		// return service.request(originalRequest);//例如再重复请求一次
	}

	// if(error.response.status == '403') {
	// 	timeoutFlag++;
	// 	if (timeoutFlag == 1) {
	// 		alert("登录超时!");
	// 		router.push({
	// 			path: "/login"
	// 		});
	// 		// document.location.href = "/#/login";
	// 	}
	// 	return false;
	// }

	let exception = '';
	// errorMessageArr.unshift(error.response.data.message ? error.response.data.message : 'null');
	errorMessageArr.unshift(error);
	let hh = (function (errorMessageArr) {
		if (errorMessageArr.length <= 0) { return 'null' };
		var h = [];
		for (var i in errorMessageArr) {
			h.push('<li><span class="el-message-box__status el-icon-warning"></span>' + errorMessageArr[i] + '</li>');
		}
		return h.join('');
	}(errorMessageArr));

	if (document.getElementById("messageBoxError")) {
		//存在
		document.getElementById("messageBoxError").innerHTML = hh;
	} else {
		// 不存在
		MessageBox({
			title: '',
			message: '<div id="messageBoxError" class="messageBoxErrorList"><ul>' + hh + '</ul></div>',
			customClass: 'messageBoxError',
			closeOnClickModal: false, // 通过点击遮罩关闭 MessageBox
			dangerouslyUseHTMLString: true,
			confirmButtonText: '确定',
			callback: function () {

				if (deleteNode.checkIE()) {
					document.getElementById("messageBoxError").parentNode.parentNode.parentNode.parentNode.parentNode.removeNode(true);
				} else {
					document.getElementById("messageBoxError").parentNode.parentNode.parentNode.parentNode.parentNode.remove();
				}
				errorMessageArr = [];
			}
		}).then(action => {
			if (deleteNode.checkIE()) {
				document.getElementById("messageBoxError").parentNode.parentNode.parentNode.parentNode.parentNode.removeNode(true);
			} else {
				document.getElementById("messageBoxError").parentNode.parentNode.parentNode.parentNode.parentNode.remove();
			}
			errorMessageArr = [];
		});
	}

	return Promise.reject(error);
});

export default Axios;
