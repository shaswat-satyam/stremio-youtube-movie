const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");
const data = require("./res.json");
console.log(data);

const addon = new addonBuilder({
  id: "org.stremio.youtubemovie",
  name: "Youtube Movie",
  version: "0.0.1",
  description: "Watch Youtube Movies available on youtube",
  resources: ["catalog", "stream"],
  types: ["movie"],
  catalogs: [
    {
      id: "youtubeMovies",
      name: "Youtube Movies",
      type: "movie",
      extra: [{ name: "search" }],
    },
  ],
  idPrefixes: ["tt-"],
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

addon.defineStreamHandler((args) => {
  // serve one stream for big buck bunny
  return Promise((resolve, reject) => {
    try {
      async () => {
        const streams = { streams: [] };
        streams["streams"].push({
          ytId: "m3BKVSpP80s",
        });
        resolve(streams);
      };
    } catch (error) {
      reject(error);
    }
  });
  if (data[args.id]) {
    return Promise.resolve({ stream: [data[args.id]] });
  } else {
    const stream = {
      ytId: "m3BKVSpP80s",
    };
    return Promise.resolve({ streams: [stream] });
  }
});

serveHTTP(addon.getInterface(), { port: 7000 });
