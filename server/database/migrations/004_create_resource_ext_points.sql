create table if not exists resource_ext_points (
  id bigserial primary key,
  file_ext varchar(20) not null,
  media_type varchar(20) not null,
  points integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  constraint uk_resource_ext_points_file_ext unique (file_ext),
  constraint chk_resource_ext_points_media_type check (media_type in ('image', 'gif', 'video')),
  constraint chk_resource_ext_points_points check (points > 0)
);

create index if not exists idx_resource_ext_points_media_type on resource_ext_points (media_type);

comment on table resource_ext_points is '资源后缀积分配置表';
comment on column resource_ext_points.id is '主键';
comment on column resource_ext_points.file_ext is '文件后缀';
comment on column resource_ext_points.media_type is '资源类型：image、gif、video';
comment on column resource_ext_points.points is '下载扣除/被下载增加的积分';
comment on column resource_ext_points.created_at is '创建时间';
comment on column resource_ext_points.updated_at is '更新时间';

insert into resource_ext_points (file_ext, media_type, points)
values
  ('jpg', 'image', 1),
  ('jpeg', 'image', 1),
  ('png', 'image', 1),
  ('webp', 'image', 1),
  ('gif', 'gif', 2),
  ('mp4', 'video', 3)
on conflict (file_ext) do update set
  media_type = excluded.media_type,
  points = excluded.points,
  updated_at = current_timestamp;
