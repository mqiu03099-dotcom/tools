import { API_BASE_URL } from '../config/api.js'
import { API_CODE_SUCCESS } from '../constants/api.js'

export function request(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${API_BASE_URL}${options.url}`,
			method: options.method || 'GET',
			data: options.data || {},
			header: options.header || {},
			success(res) {
				const result = res.data || {}

				if (result.code === API_CODE_SUCCESS) {
					resolve(result.data)
					return
				}

				const message = result.msg || '请求失败'

				uni.showToast({
					title: message,
					icon: 'none'
				})
				reject(new Error(message))
			},
			fail(error) {
				const message = error.errMsg || '网络请求失败'

				uni.showToast({
					title: message,
					icon: 'none'
				})
				reject(new Error(message))
			}
		})
	})
}
