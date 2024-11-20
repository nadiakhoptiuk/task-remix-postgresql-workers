# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

For running docker container only for database

if you use pgAdmin app:

```shellscript
docker-compose up -d --build db
```

if you want to use pgAdmin at browser:

```shellscript
docker-compose up -d db pgadmin
```

To seed DB:

```shellscript
npm run seed
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app
server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already
configured for a simple default starting experience. You can use whatever css
framework you prefer. See the
[Vite docs on css](https://vitejs.dev/guide/features.html#css) for more
information.
