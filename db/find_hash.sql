select * from users u
join hash h on u.user_id = h.user_id
where username = $1;