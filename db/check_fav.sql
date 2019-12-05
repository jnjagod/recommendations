select count(*) from favorites
where game_id = ${game_id} 
and user_id = ${user_id};