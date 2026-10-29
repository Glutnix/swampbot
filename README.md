# SwampBot

MIT Licenced

## Development

- use [asdf](https://asdf-vm.com/guide/getting-started.html) to honour .toolversions (NodeJS 26.12.1+)

- `npm install`

- copy .env.example to .env and insert your discord dev secrets

- `npm run dev` to run at dev time

- `npx drizzle-kit push` to get [Drizzle](https://orm.drizzle.team/docs/get-started/sqlite-new) to initialise SQLite database based on schema.

- Use [Drizzle ORM migration techniques](https://orm.drizzle.team/docs/sqlite/kit-overview) to commit database changes when making big changes, to make upgrading easier.
