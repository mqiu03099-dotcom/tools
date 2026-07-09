create table if not exists user_resource_likes (
  id bigserial primary key,
  user_id bigint not null,
  resource_id bigint not null,
  owner_user_id bigint not null,
  created_at timestamp not null default current_timestamp,
  constraint uk_user_resource_likes_user_resource unique (user_id, resource_id),
  constraint fk_user_resource_likes_user_id foreign key (user_id) references users (id),
  constraint fk_user_resource_likes_owner_user_id foreign key (owner_user_id) references users (id),
  constraint fk_user_resource_likes_resource_id foreign key (resource_id) references resources (id)
);

create index if not exists idx_user_resource_likes_owner_user_id on user_resource_likes (owner_user_id);
create index if not exists idx_user_resource_likes_resource_id on user_resource_likes (resource_id);

comment on table user_resource_likes is '用户资源喜欢表';
comment on column user_resource_likes.id is '主键';
comment on column user_resource_likes.user_id is '喜欢资源的用户ID';
comment on column user_resource_likes.resource_id is '被喜欢的资源ID';
comment on column user_resource_likes.owner_user_id is '资源上传者用户ID';
comment on column user_resource_likes.created_at is '喜欢时间';
