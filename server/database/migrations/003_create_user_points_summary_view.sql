create or replace view user_points_summary as
select
  user_id,
  coalesce(sum(change_points), 0) as points_balance
from user_points_logs
group by user_id;
