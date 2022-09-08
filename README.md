# Chat-Room Demo (Node.js)

### A homework for Tokenize Xchange interview / Tokenize Xchange 的面試作業
```
1. To create a chat room for 4 ppl(fixed user amount), no need to concern authentication.
2. It can send 1:1 message to user in any user id
3. It can use docker compose and npm script to launch locally.

Show your skills of system design and handling tools such as Redis, websocket/socket.io, db, container...etc
```

```
1. 建立一個四人聊天室(人數固定)，不用身份驗證
2. 可以與任何 id 一對一聊天
3. 可以在本地端用 docker compose 與 npm script 啟動.

透過此測驗讓我們知道你對系統設計的基礎概念，例如：Redis, websocket/socket.io, db, container...等
```

#### Run redis by default settings on docker / 在 docker 上用預設值啟動 redis

```
$ docker pull redis
$ docker run --name redis -d redis
```

#### Check your redis-server ip and edit in .env / 檢查你的 redis 伺服器 ip 並修改 .env

```
$ docker inspect redis
$ cd ../your-path/chat-room/
$ vim .env
```

Edit `REDIS_ENDPOINT_URL` and paste your host here / 將你的 host 貼在 `REDIS_ENDPOINT_URL`

#### Build chat-room with docker / 在 docker 上建立此專案

```
$ docker build . -t chat-room
$ docker run -p 8080:8080 -d --name chat-room chat-room
```

#### Open your browser and type: http://localhost:8080 / 打開你的瀏覽器並前往: http://localhost:8080

### Or you want to run it locally: / 或你想要在本機上執行：

#### Run server locally / 在本機上執行伺服端

```
$ cd ../your-path/chat-room/
$ yarn install
$ yarn start
```

#### Run client locally / 在本機上執行客戶端

```
$ cd ../your-path/chat-room/client/
$ yarn install
$ yarn start
```
