const getSampleRouteConfigs = () => [
  {
    method: "GET",
    url: "/user/{userId}",
    schema: {
      params: {
        type: "object",
        properties: {
          userId: { type: "string" },
        },
      },
    },
    handler: () => {},
  },
  {
    method: "POST",
    url: "/users",
    schema: {
      body: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
        },
      },
    },
    handler: () => {},
  },
];

const getSampleRouteSwaggerDef = () => ({
  swagger: "2.0",
  info: {
    version: require(__dirname + "/../../package.json").version,
    title: "fastify-swagger-generate",
  },
  definitions: {},
  paths: {
    "/user/{userId}": {
      get: {
        parameters: [
          {
            type: "string",
            required: true,
            in: "path",
            name: "userId",
          },
        ],
        responses: {
          200: {
            description: "Default Response",
          },
        },
      },
    },
    "/users": {
      post: {
        parameters: [
          {
            name: "body",
            in: "body",
            schema: {
              type: "object",
              properties: {
                firstName: {
                  type: "string",
                },
                lastName: {
                  type: "string",
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Default Response",
          },
        },
      },
    },
  },
});

module.exports = { getSampleRouteConfigs, getSampleRouteSwaggerDef };
