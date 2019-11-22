drop table if exists hash;
drop table if exists users;

create table users (
user_id serial primary key,
username varchar(40),
profile_img text,
is_admin bool default false
);

create table hash (
hash_id serial primary key,
user_id int references users(user_id),
hash text
);

insert into users (username, profile_img)
values ('jimbob', 'https://robohash.org/jimbob'),
('joedirt', 'https://robohash.org/joedirt');

insert into hash (user_id, hash)
values (1, 'password'),
(2, 'passw0rd');