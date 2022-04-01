"use strict";

const { shouldRouteHide } = require("../../util/common");
const {
  prepareDefaultOptions,
  prepareSwaggerObject,
  prepareSwaggerMethod,
  normalizeUrl,
  prepareSwaggerDefinitions,
} = require("./utils");

module.exports = function (opts, routes, Ref) {
  let ref;

  const defOpts = prepareDefaultOptions(opts);

  return function (done) {
    try {
      const swaggerObject = prepareSwaggerObject(defOpts);

      ref = Ref();
      swaggerObject.definitions = prepareSwaggerDefinitions(
        {
          ...swaggerObject.definitions,
          ...ref.definitions().definitions,
        },
        ref
      );

      swaggerObject.paths = {};
      for (const route of routes) {
        const transformResult = defOpts.transform
          ? defOpts.transform({ schema: route.schema, url: route.url })
          : {};

        const schema = transformResult.schema || route.schema;
        const shouldRouteHideOpts = {
          hiddenTag: defOpts.hiddenTag,
          hideUntagged: defOpts.hideUntagged,
        };

        if (shouldRouteHide(schema, shouldRouteHideOpts)) continue;

        let url = transformResult.url || route.url;
        url = normalizeUrl(url, defOpts.basePath, defOpts.stripBasePath);

        const swaggerRoute = Object.assign({}, swaggerObject.paths[url]);

        const swaggerMethod = prepareSwaggerMethod(schema, ref, swaggerObject);

        if (route.links) {
          throw new Error(
            "Swagger (Open API v2) does not support Links. Upgrade to OpenAPI v3 (see fastify-swagger readme)"
          );
        }

        // route.method should be either a String, like 'POST', or an Array of Strings, like ['POST','PUT','PATCH']
        const methods =
          typeof route.method === "string" ? [route.method] : route.method;

        for (const method of methods) {
          swaggerRoute[method.toLowerCase()] = swaggerMethod;
        }

        swaggerObject.paths[url] = swaggerRoute;
      }

      return done(null, swaggerObject);
    } catch (err) {
      console.error(`[/spec/swagger] Error:`, err.message || err);
      return done(err);
    }
  };
};
