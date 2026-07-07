# Big Two — Client

React 17 frontend for the Big Two card game.

## Commands

```bash
npm start      # Dev server on port 3000
npm run build  # Production build to build/
```

## Deploy

```bash
npm run build
# rsync the build/ folder to the Droplet, then:
docker compose up -d --build
```

## Stack

Create React App, Socket.IO client, Bootstrap.
