update games
set name = ${name},
description = ${description},
complexity = ${complexity},
price = ${price}
where game_id = ${game_id};