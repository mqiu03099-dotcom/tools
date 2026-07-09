import { request } from '../request/index.js'

export function loginByCode(code) {
	return request({
		url: '/api/weapp/login',
		method: 'POST',
		data: {
			code
		}
	})
}
