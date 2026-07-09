import { loginByCode } from '../api/user.js'
import { USER_ID_STORAGE_KEY } from '../constants/storage.js'

function getLoginCode(uniApi) {
	return new Promise((resolve, reject) => {
		uniApi.login({
			provider: 'weixin',
			success(result) {
				if (result.code) {
					resolve(result.code)
					return
				}

				reject(new Error('微信登录失败'))
			},
			fail(error) {
				reject(new Error(error.errMsg || '微信登录失败'))
			}
		})
	})
}

export async function ensureWeappLogin(options = {}) {
	const uniApi = options.uniApi || uni
	const loginApi = options.loginApi || loginByCode

	const code = await getLoginCode(uniApi)
	const userInfo = await loginApi(code)

	uniApi.setStorageSync(USER_ID_STORAGE_KEY, userInfo.id)

	return userInfo.id
}
