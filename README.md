Install dependenses
### `npm i`
set .env config and database user and password
init postgres database via:
### `psql -U postgres -f init.sql`
or create user 'shop' with password 'shop' and database 'shop_db' for postgresql
to start web server use:
### `npm run dev`

Для создания администратора online shop надо отправить запрос по адресу /user/create-admin, в базовом варианте создастся пользователь с 
### `email: test@mail.ru`
### `password: administrator`

Для авторизации используются JWT acesss и refresh токены, acesss хранится и передается в заголовке запроса в поле authorization для подтверждения своей сессии, refresh токен хранится в localStore, на его основе можно обновить сессию /token/refresh, если токен acess устарел

на любой запрос, где требуется авторизация следует прикреплять к заголовку запроса 
### `header:{'Authorization': `Bearer ${acessToken}`}`

### /user/log-in   POST {email, password} -> сохраняет в localStore refreshToken
### /user/sign-up  POST
### /user/log-out
### /token/refresh
### /user/profile
### /user/payment
### /product?p_id=123 GET <- {p_id}, -> {name, description, price, count, image_url}
### /products
### /products/add
### /cart
### /cart/add-product