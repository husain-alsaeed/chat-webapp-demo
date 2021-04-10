# How to
- clone the repo

  `git clone https://github.com/husain-alsaeed/chat-webapp-demo.git`

## Redis Server
- run `redisServer.sh` as root (sudo).
- edit `redis.conf` (`/etc/redis/redis.conf`)
  - disable protected mode.

## web server
- clone this repo.
  - edit `src/index.ts` with redis server host.
- run `webServer.sh` as root (sudo)
- run `npm install` in application directory, to install dependnices.
- run `npm start` in application directory to start the application.