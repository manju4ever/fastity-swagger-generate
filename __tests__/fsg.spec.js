const { test } = require("tap");
const fastifySwaggerGenerate = require("..");
const {
  getSampleRoutesConfig,
  getSampleRoutesSwaggerDef,
  getSingleRouteConfig,
  getSingleRouteSwaggerDef,
} = require("./helper");

test("Get Swagger Spec for 2 routes", (t) => {
  const opts = {};
  fastifySwaggerGenerate(opts, getSampleRoutesConfig(), (err, results) => {
    t.notOk(err);
    t.equal(
      JSON.stringify(results),
      JSON.stringify(getSampleRoutesSwaggerDef())
    );
    t.pass();
    t.end();
  });
});

test("Get Swagger Spec for a plain route object - No Iterable", (t) => {
  const opts = {};
  fastifySwaggerGenerate(opts, getSingleRouteConfig(), (err, results) => {
    t.notOk(err);
    t.equal(
      JSON.stringify(results),
      JSON.stringify(getSingleRouteSwaggerDef())
    );
    t.pass();
    t.end();
  });
});
