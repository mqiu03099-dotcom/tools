create table if not exists user_points_logs (
  id bigserial primary key,
  user_id bigint not null,
  type varchar(50) not null,
  change_points integer not null,
  resource_id bigint null,
  related_user_id bigint null,
  remark varchar(255) not null default '',
  created_at timestamp not null default current_timestamp,
  constraint fk_user_points_logs_user_id foreign key (user_id) references users (id),
  constraint fk_user_points_logs_related_user_id foreign key (related_user_id) references users (id),
  constraint chk_user_points_logs_type check (type in ('ad_video_reward', 'resource_download_income', 'resource_download_cost', 'init_reward')),
  constraint chk_user_points_logs_change_points check (change_points <> 0)
);

create index if not exists idx_user_points_logs_user_id_created_at on user_points_logs (user_id, created_at);
create index if not exists idx_user_points_logs_type on user_points_logs (type);
create index if not exists idx_user_points_logs_resource_id on user_points_logs (resource_id);
create index if not exists idx_user_points_logs_related_user_id on user_points_logs (related_user_id);

comment on table user_points_logs is '用户积分流水表';
comment on column user_points_logs.id is '主键';
comment on column user_points_logs.user_id is '积分变动用户ID';
comment on column user_points_logs.type is '积分类型：ad_video_reward、resource_download_income、resource_download_cost、init_reward';
comment on column user_points_logs.change_points is '积分变化，正数加分，负数扣分';
comment on column user_points_logs.resource_id is '关联资源ID';
comment on column user_points_logs.related_user_id is '关联用户ID';
comment on column user_points_logs.remark is '备注';
comment on column user_points_logs.created_at is '创建时间';
