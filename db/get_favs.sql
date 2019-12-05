select g.game_id, imgs[1], name from games g
join favorites f on g.game_id = f.game_id
where f.user_id = ${user_id}
order by name asc;