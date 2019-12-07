select post_id, content, u.username, u.profile_img from posts p
join users u on u.user_id = p.user_id
where p.game_id = ${game_id}
order by post_id desc;