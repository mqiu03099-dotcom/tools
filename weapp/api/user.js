import { request } from '../request/index.js'
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE
} from '../constants/pagination.js'

export function loginByCode(code) {
	return request({
		url: '/api/weapp/login',
		method: 'POST',
		data: {
			code
		}
	})
}

export function getUserProfilePage(userId, page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_SIZE) {
	return request({
		url: '/api/weapp/users',
		method: 'GET',
		data: {
			userId,
			page,
			pageSize
		}
	})
}

export function getUserProfileById(userId) {
	return request({
		url: '/api/weapp/user',
		method: 'GET',
		data: {
			userId
		}
	})
}
