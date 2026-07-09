import {
  DEFAULT_USER_AVATAR_URL,
  DEFAULT_USER_NICKNAME
} from "../constants/user";
import {
  INIT_REWARD_POINTS,
  INIT_REWARD_REMARK,
  USER_POINTS_TYPE_INIT_REWARD
} from "../constants/userPoints";
import type { QueryClient } from "../types/database";
import type { LoginUserInfo } from "../types/weappLogin";
import { ApiError } from "../utils/apiError";

interface UserProfileRow {
  id: number;
  nickname: string;
  avatar_url: string;
  status: number;
}

interface InsertUserRow {
  id: number;
}

interface LoginByWechatCodeOptions {
  code: string;
  client: QueryClient;
  getOpenid: (code: string) => Promise<string>;
}

const FIND_USER_SQL = `
select
  id,
  nickname,
  avatar_url,
  status
from users
where openid = $1
limit 1
`;

function toLoginUserInfo(row: UserProfileRow): LoginUserInfo {
  return {
    id: Number(row.id),
    nickname: row.nickname,
    avatarUrl: row.avatar_url,
    status: row.status
  };
}

async function findUserByOpenid(client: QueryClient, openid: string) {
  const result = await client.query<UserProfileRow>(FIND_USER_SQL, [openid]);

  return result.rows[0];
}

export async function loginByWechatCode(options: LoginByWechatCodeOptions) {
  const code = options.code.trim();

  if (!code) {
    throw new ApiError("登录 code 不能为空");
  }

  const openid = await options.getOpenid(code);
  const existingUser = await findUserByOpenid(options.client, openid);

  if (existingUser) {
    return toLoginUserInfo(existingUser);
  }

  try {
    await options.client.query("begin");

    const insertUserResult = await options.client.query<InsertUserRow>(
      `
insert into users (openid, nickname, avatar_url)
values ($1, $2, $3)
on conflict (openid) do nothing
returning id
`,
      [openid, DEFAULT_USER_NICKNAME, DEFAULT_USER_AVATAR_URL]
    );

    const newUserId = insertUserResult.rows[0]?.id;

    if (newUserId) {
      await options.client.query(
        `
insert into user_points_logs (user_id, type, change_points, remark)
values ($1, $2, $3, $4)
`,
        [
          newUserId,
          USER_POINTS_TYPE_INIT_REWARD,
          INIT_REWARD_POINTS,
          INIT_REWARD_REMARK
        ]
      );
    }

    await options.client.query("commit");
  } catch (error) {
    await options.client.query("rollback");
    throw error;
  }

  const user = await findUserByOpenid(options.client, openid);

  if (!user) {
    throw new ApiError("登录失败");
  }

  return toLoginUserInfo(user);
}
