# fastify-swagger-generate

Generate Swagger/OpenAPI definitions without running fastify app !

<!-- toc -->

- [fastify-swagger-generate](#fastify-swagger-generate)
  - [Install](#install)
  - [Disclaimer](#disclaimer)
  - [Usage](#usage)
  - [API](#api)
    - [Options](#options)

<!-- tocstop -->

## Install

`npm i fastify-swagger-generate`

## Disclaimer

- Only supports configuration based routes, i.e collection of route definitions
- This library has no new content added
- This library has just tweaked the original [fastify-swagger](https://github.com/fastify/fastify-swagger)

## Usage

1. Create a `generate.js` file which looks like

```javascript
const fastifySwagGen = require("fastify-swagger-generate");
const Routes = require("./routes");
const opts = {};

// generate swagger definitions
fastifySwagGen(opts, Routes, (err, definitions) => {
  // Write to a file
  require("fs")
    .createWriteStream("./app.swag.json")
    .write(JSON.stringify(definitions));
});
```

2. Let's say you have routes defined in `routes.js`

```javascript
const routes = [
  {
    url: "/users/:id",
    method: "GET",
    schema: {
      params: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
        },
      },
    },
  },
];

module.exports = routes; // should be an iterable routes
```

## API

### Options

[Refer here for more](https://github.com/fastify/fastify-swagger#register-options)
