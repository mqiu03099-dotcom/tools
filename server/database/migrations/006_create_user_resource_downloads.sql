create table if not exists user_resource_downloads (
  id bigserial primary key,
  user_id bigint not null,
  resource_id bigint not null,
  owner_user_id bigint not null,
  created_at timestamp not null default current_timestamp,
  constraint uk_user_resource_downloads_user_resource unique (user_id, resource_id),
  constraint fk_user_resource_downloads_user_id foreign key (user_id) references users (id),
  constraint fk_user_resource_downloads_owner_user_id foreign key (owner_user_id) references users (id),
  constraint fk_user_resource_downloads_resource_id foreign key (resource_id) references resources (id)
);

create index if not exists idx_user_resource_downloads_owner_user_id on user_resource_downloads (owner_user_id);
create index if not exists idx_user_resource_downloads_resource_id on user_resource_downloads (resource_id);

comment on table user_resource_downloads is '用户资源下载表';
comment on column user_resource_downloads.id is '主键';
comment on column user_resource_downloads.user_id is '下载者用户ID';
comment on column user_resource_downloads.resource_id is '被下载的资源ID';
comment on column user_resource_downloads.owner_user_id is '资源上传者用户ID';
comment on column user_resource_downloads.created_at is '下载时间';
