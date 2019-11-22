insert into users (username, profile_img)
values (${username}, ${profile_img})
returning user_id;