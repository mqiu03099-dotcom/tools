create table if not exists resources (
  id bigserial primary key,
  user_id bigint not null,
  title varchar(100) not null,
  description varchar(500) not null default '',
  file_url varchar(500) not null,
  cover_url varchar(500) not null,
  file_ext varchar(20) not null,
  file_size bigint not null,
  width integer not null,
  height integer not null,
  download_count integer not null default 0,
  like_count integer not null default 0,
  status smallint not null default 0,
  reject_reason varchar(255) not null default '',
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  constraint fk_resources_user_id foreign key (user_id) references users (id),
  constraint fk_resources_file_ext foreign key (file_ext) references resource_ext_points (file_ext),
  constraint chk_resources_file_size check (file_size >= 0),
  constraint chk_resources_width check (width >= 0),
  constraint chk_resources_height check (height >= 0),
  constraint chk_resources_download_count check (download_count >= 0),
  constraint chk_resources_like_count check (like_count >= 0),
  constraint chk_resources_status check (status in (0, 1, 2, 3))
);

create index if not exists idx_resources_user_id on resources (user_id);
create index if not exists idx_resources_status_created_at on resources (status, created_at);
create index if not exists idx_resources_file_ext on resources (file_ext);

comment on table resources is '用户上传资源表';
comment on column resources.id is '主键';
comment on column resources.user_id is '上传用户ID';
comment on column resources.title is '资源标题';
comment on column resources.description is '资源描述';
comment on column resources.file_url is '原始资源文件地址';
comment on column resources.cover_url is '封面图地址';
comment on column resources.file_ext is '文件后缀';
comment on column resources.file_size is '文件大小，单位 byte';
comment on column resources.width is '宽度';
comment on column resources.height is '高度';
comment on column resources.download_count is '下载次数';
comment on column resources.like_count is '喜欢次数';
comment on column resources.status is '状态：0待审核，1通过，2拒绝，3下架';
comment on column resources.reject_reason is '拒绝原因';
comment on column resources.created_at is '创建时间';
comment on column resources.updated_at is '更新时间';
