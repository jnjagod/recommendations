delete from favorites
where game_id = ${game_id};

delete from posts
where game_id = ${game_id};

delete from games 
where game_id = ${game_id};