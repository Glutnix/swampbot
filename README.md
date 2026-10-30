# SwampBot

MIT Licenced

## Features

### /birthday

- Allows users to set their birthday
- The first time they chat on the Discord server on their birthday, they will be wished a happy birthday
  by the bot
- The first time they chat on the Twitch channel:
  - they will be wished a happy birthday by the bot
  - a message will be broadcast on a web socket

## Development

- use [asdf](https://asdf-vm.com/guide/getting-started.html) to honour .toolversions (NodeJS 26.12.1+)

- `npm install`

- copy .env.example to .env and insert your Discord dev secrets

- `npm run dev` to run at dev time

- `npx drizzle-kit push` to get [Drizzle](https://orm.drizzle.team/docs/get-started/sqlite-new) to initialise SQLite database based on schema.

- Use [Drizzle ORM migration techniques](https://orm.drizzle.team/docs/sqlite/kit-overview) to commit database changes when making big changes, to make upgrading easier.
