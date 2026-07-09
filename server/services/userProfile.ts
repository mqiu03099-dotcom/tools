import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/pagination";
import type { QueryClient } from "../types/database";
import type { ApiPage } from "../types/apiResponse";
import type { UserProfileInfo } from "../types/userProfile";
import { ApiError } from "../utils/apiError";

interface UserProfileRow {
  id: number;
  nickname: string;
  avatar_url: string;
  status: number;
  created_at: Date | string;
  updated_at: Date | string;
  points_balance: number;
  upload_count: number;
  download_count: number;
  like_count: number;
  downloaded_by_others_count: number;
  liked_by_others_count: number;
}

interface CountRow {
  total: string;
}

interface GetUserProfilePageOptions {
  client: QueryClient;
  userId: number;
  page?: number;
  pageSize?: number;
}

interface GetUserProfileByIdOptions {
  client: QueryClient;
  userId: number;
}

const USER_PROFILE_FIELDS_SQL = `
select
  u.id,
  u.nickname,
  u.avatar_url,
  u.status,
  u.created_at,
  u.updated_at,
  ups.points_balance,
  ups.upload_count,
  ups.download_count,
  ups.like_count,
  ups.downloaded_by_others_count,
  ups.liked_by_others_count
from users u
left join user_profile_summary ups on ups.user_id = u.id
where u.id = $1
`;

const USER_PROFILE_SQL = `
${USER_PROFILE_FIELDS_SQL}
order by u.id desc
limit $2 offset $3
`;

const USER_PROFILE_COUNT_SQL = `
select count(*) as total
from users u
where u.id = $1
`;

function normalizePositiveNumber(value: number | undefined, defaultValue: number) {
  if (!value || Number.isNaN(value) || value < 1) {
    return defaultValue;
  }

  return Math.floor(value);
}

function formatDateValue(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value;
}

function toUserProfileInfo(row: UserProfileRow): UserProfileInfo {
  return {
    id: Number(row.id),
    nickname: row.nickname,
    avatarUrl: row.avatar_url,
    status: row.status,
    createdAt: formatDateValue(row.created_at),
    updatedAt: formatDateValue(row.updated_at),
    pointsBalance: Number(row.points_balance),
    uploadCount: Number(row.upload_count),
    downloadCount: Number(row.download_count),
    likeCount: Number(row.like_count),
    downloadedByOthersCount: Number(row.downloaded_by_others_count),
    likedByOthersCount: Number(row.liked_by_others_count)
  };
}

export async function getUserProfileById(options: GetUserProfileByIdOptions) {
  if (!options.userId || Number.isNaN(options.userId) || options.userId < 1) {
    throw new ApiError("用户ID不能为空");
  }

  const result = await options.client.query<UserProfileRow>(USER_PROFILE_FIELDS_SQL, [
    options.userId
  ]);
  const userProfile = result.rows[0];

  if (!userProfile) {
    throw new ApiError("用户不存在");
  }

  return toUserProfileInfo(userProfile);
}

export async function getUserProfilePage(options: GetUserProfilePageOptions) {
  if (!options.userId || Number.isNaN(options.userId) || options.userId < 1) {
    throw new ApiError("用户ID不能为空");
  }

  const page = normalizePositiveNumber(options.page, DEFAULT_PAGE);
  const pageSize = normalizePositiveNumber(options.pageSize, DEFAULT_PAGE_SIZE);
  const offset = (page - 1) * pageSize;

  const [listResult, countResult] = await Promise.all([
    options.client.query<UserProfileRow>(USER_PROFILE_SQL, [
      options.userId,
      pageSize,
      offset
    ]),
    options.client.query<CountRow>(USER_PROFILE_COUNT_SQL, [options.userId])
  ]);
  const total = Number(countResult.rows[0]?.total ?? 0);
  const pageInfo: ApiPage = {
    page,
    pageSize,
    total,
    totalPage: Math.ceil(total / pageSize)
  };

  return {
    data: listResult.rows.map(toUserProfileInfo),
    page: pageInfo
  };
}
