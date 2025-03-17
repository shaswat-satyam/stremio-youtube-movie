const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const data = require("./data.json");
console.log(data);

const addon = new addonBuilder({
  id: "org.stremio.youtubemovie",
  name: "Youtube Movie",
  version: "1.0.0",
  description: "Watch Youtube Movies available on youtube",
  resources: ["catalog", "stream"],
  types: ["movie"],
  catalogs: [
    {
      type: "movie",
      id: "helloworldmovies",
    },
  ],
  idPrefixes: ["tt"],
});

const METAHUB_URL = "https://images.metahub.space";

const generateMetaPreview = function (value, key) {
  // To provide basic meta for our movies for the catalog
  // we'll fetch the poster from Stremio's MetaHub
  // see https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/api/responses/meta.md#meta-preview-object
  const imdbId = key.split(":")[0];
  return {
    id: imdbId,
    type: value.type,
    name: value.name,
    poster: METAHUB_URL + "/poster/medium/" + imdbId + "/img",
  };
};

addon.defineCatalogHandler(function (args, cb) {
  // filter the dataset object and only take the requested type
  const metas = Object.entries(data)
    .filter(([_, value]) => value.type === args.type)
    .map(([key, value]) => generateMetaPreview(value, key));

  return Promise.resolve({ metas: metas });
});

addon.defineStreamHandler(function (args) {
  if (data[args.id]) {
    return Promise.resolve({ streams: [data[args.id]] });
  } else {
    return Promise.resolve({ streams: [] });
  }
});
serveHTTP(addon.getInterface(), { port: 7001 });
