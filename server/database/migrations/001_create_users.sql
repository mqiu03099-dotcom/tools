create table if not exists users (
  id bigserial primary key,
  openid varchar(64) not null,
  nickname varchar(50) not null,
  avatar_url varchar(500) not null,
  status smallint not null default 1,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,
  constraint uk_users_openid unique (openid),
  constraint chk_users_status check (status in (0, 1))
);

create index if not exists idx_users_status on users (status);

comment on table users is '用户表';
comment on column users.id is '主键';
comment on column users.openid is '小程序用户唯一标识';
comment on column users.nickname is '昵称';
comment on column users.avatar_url is '头像';
comment on column users.status is '状态：1正常，0禁用';
comment on column users.created_at is '创建时间';
comment on column users.updated_at is '更新时间';
