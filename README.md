# Chat-Room Demo (Node.js)

#### Run redis by default settings

```
$ docker pull redis
$ docker run --name redis -d redis
```

#### Check your redis-server ip and edit in ../your-path/chat-room/.env 

```
$ docker inspect redis
$ cd ../your-path/chat-room/
$ vim .env
```

Edit `REDIS_ENDPOINT_URL`

#### Build chat-room

```
$ docker build . -t chat-room
$ docker run -p 8080:8080 -d --name chat-room chat-room
```

#### Open your browser and type: http://localhost:8080

### Or you want to run it locally:

#### Run server

```
$ cd ../your-path/chat-room/
$ yarn install
$ yarn start
```

#### Run client

```
$ cd ../your-path/chat-room/client/
$ yarn install
$ yarn start
```



