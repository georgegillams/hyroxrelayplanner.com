# [https://www.hyroxrelayplanner.com/](https://www.hyroxrelayplanner.com/?utm_source=GitHub)

![Build status](https://github.com/georgegillams/hyroxrelayplanner.com/workflows/CI/badge.svg)
![Dependencies status](https://img.shields.io/david/georgegillams/hyroxrelayplanner.com)

## Backlog

- Chose a random location where it's happy hour. Show this and the time etc. Show environmental warning about travelling.
- Show different message if it's happy hour in your location. Location can be determined using https://tools.keycdn.com/geo.json?host=IP_ADDRESS_HERE.

## Developing

### Prerequisites

Ensure redis is installed (`brew install redis`).

### Running locally

```
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install --frozen-lockfile
yarn dev
```

`yarn dev` will set all necessary environment variables needed to run the application.

A debugger can be attached to debug server-side code.

### Testing

If components have changed, snapshot tests may need to be updated. Backstop js visual regression tests may also need to be updated.

To update jest snapshots:

```
npx jest -u
```

To update backstopJS snapshots:

```
./scripts/docker/prepare.sh
./scripts/docker/run-tests.sh --update
./scripts/docker/clean-up.sh'
```

- The first will setup the docker image and container. If they already exist this will be super fast.
- The second will copy the project over, setup dependencies, build and run, and take screenshots. Failed screenshots will be copied back to your machine.
- The third simply stops the docker container.

Any changes resulting from these commands should be verified and checked in.

## Hosting

The following environment variables should be set up

| Env var        | Reason                          | Value                                                                     |
| -------------- | ------------------------------- | ------------------------------------------------------------------------- |
| NODE_ENV       | Makes the magic happen          | `production`                                                              |
| REDIS_URL      | To access the redis database.   | If no URL is provided, the server will connect to a local redis instance. |
| SECRET_API_KEY | Used to make admin API requests | Anything secret and impossible to guess                                   |
| SESSION_SECRET | Used to sign cookies            | Anything secret and impossible to guess                                   |

## Contributing

Contributions are welcome. Please fork and submit a PR if you want to add or change a feature.
