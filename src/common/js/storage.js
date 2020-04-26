// import { getCookie, setCookie } from './cookie';

function supportStorage () {
	if (window.localStorage) {
		return true;
	} else {
		return false;
	}
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) {
		throw new Error(" setStore 请求localStorage name:"+name+" 不存在");
		return;
	} else {
		if (typeof content !== 'string') {
			content = JSON.stringify(content);
		}
		if (window.localStorage) {
			window.localStorage.setItem(name, content);
		} else {
			throw new Error(" 不支持本地存储 localStorage");
			// setCookie(name, content);
		}
	}
};

/**
* 获取localStorage
*/
export const getStore = name => {
	if (!name) {
		throw new Error(" getStore 请求localStorage name:"+name+" 不存在");
		return;
	} else {
		if (supportStorage()) {
			return window.localStorage.getItem(name);
		} else {
			throw new Error(" 不支持本地存储 localStorage");
			// return getCookie(name);
		}
	}
};

/**
* 删除localStorage
*/
export const removeStore = name => {
	if (!name) {
		return;
	} else {
		if (window.localStorage) {
			window.localStorage.removeItem(name)
		}
	}
};
/**
 * 设置sessionStorage
* */
export const setSessionStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, val);
}
/**
 * 获取sessionStorage
 * */
export const getSessionStorage = (key) => {
  if (!key) return;
  return window.sessionStorage.getItem(key);
}
/**
 * 删除sessionStorage
 * */
export const removeSessionStorage = (key) => {
  if (!key) return;
  window.sessionStorage.removeItem(key);
}
