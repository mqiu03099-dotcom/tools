create or replace view user_profile_summary as
select
  u.id as user_id,
  coalesce(point_stats.points_balance, 0) as points_balance,
  coalesce(upload_stats.upload_count, 0) as upload_count,
  coalesce(download_stats.download_count, 0) as download_count,
  coalesce(like_stats.like_count, 0) as like_count,
  coalesce(downloaded_by_others_stats.downloaded_by_others_count, 0) as downloaded_by_others_count,
  coalesce(liked_by_others_stats.liked_by_others_count, 0) as liked_by_others_count
from users u
left join (
  select user_id, sum(change_points) as points_balance
  from user_points_logs
  group by user_id
) point_stats on point_stats.user_id = u.id
left join (
  select user_id, count(*) as upload_count
  from resources
  group by user_id
) upload_stats on upload_stats.user_id = u.id
left join (
  select user_id, count(*) as download_count
  from user_resource_downloads
  group by user_id
) download_stats on download_stats.user_id = u.id
left join (
  select user_id, count(*) as like_count
  from user_resource_likes
  group by user_id
) like_stats on like_stats.user_id = u.id
left join (
  select owner_user_id, count(*) as downloaded_by_others_count
  from user_resource_downloads
  group by owner_user_id
) downloaded_by_others_stats on downloaded_by_others_stats.owner_user_id = u.id
left join (
  select owner_user_id, count(*) as liked_by_others_count
  from user_resource_likes
  group by owner_user_id
) liked_by_others_stats on liked_by_others_stats.owner_user_id = u.id;
