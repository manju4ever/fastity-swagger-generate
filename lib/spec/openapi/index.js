'use strict'

const { shouldRouteHide } = require('../../util/common')
const {
  prepareDefaultOptions,
  prepareOpenapiObject,
  prepareOpenapiMethod,
  prepareOpenapiSchemas,
  normalizeUrl
} = require('./utils')

module.exports = function (opts, routes, Ref) {
  let ref

  const defOpts = prepareDefaultOptions(opts)

  return function (done) {
    try {
      // Base Openapi info
      const openapiObject = prepareOpenapiObject(defOpts)

      ref = Ref()
      openapiObject.components.schemas = prepareOpenapiSchemas(
        {
          ...openapiObject.components.schemas,
          ...ref.definitions().definitions
        },
        ref
      )

      for (const route of routes) {
        const transformResult = defOpts.transform
          ? defOpts.transform({ schema: route.schema, url: route.url })
          : {}

        const schema = transformResult.schema || route.schema
        const shouldRouteHideOpts = {
          hiddenTag: defOpts.hiddenTag,
          hideUntagged: defOpts.hideUntagged
        }

        if (shouldRouteHide(schema, shouldRouteHideOpts)) continue

        let url = transformResult.url || route.url
        url = normalizeUrl(url, defOpts.servers, defOpts.stripBasePath)

        const openapiRoute = Object.assign({}, openapiObject.paths[url])

        const openapiMethod = prepareOpenapiMethod(schema, ref, openapiObject)

        if (route.links) {
          for (const statusCode of Object.keys(route.links)) {
            if (!openapiMethod.responses[statusCode]) {
              throw new Error(
                `missing status code ${statusCode} in route ${route.path}`
              )
            }
            openapiMethod.responses[statusCode].links = route.links[statusCode]
          }
        }

        // route.method should be either a String, like 'POST', or an Array of Strings, like ['POST','PUT','PATCH']
        const methods =
          typeof route.method === 'string' ? [route.method] : route.method

        for (const method of methods) {
          openapiRoute[method.toLowerCase()] = openapiMethod
        }

        openapiObject.paths[url] = openapiRoute
      }

      return done(null, openapiObject)
    } catch (err) {
      console.error('[/spec/openapi] Error:', err.message || err)
      return done(err)
    }
  }
}
