select suggest_id, title, username, profile_img from suggestions s
join users u on u.user_id = s.user_id
order by suggest_id asc;