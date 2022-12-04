const { test } = require('tap')
const fastifySwaggerGenerate = require('../')
const { getSampleRouteConfigs, getSampleRouteSwaggerDef } = require('./helper')

test('Get Swagger Spec for 2 routes', (t) => {
  const opts = {}
  fastifySwaggerGenerate(opts, getSampleRouteConfigs(), (err, results) => {
    t.notOk(err)
    t.equal(
      JSON.stringify(results),
      JSON.stringify(getSampleRouteSwaggerDef())
    )
    t.pass()
    t.end()
  })
})
