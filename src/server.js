const Hapi = require('@hapi/hapi');
require('dotenv').config();

const router = require('./router');

const init = async () => {
  const server = Hapi.server({
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(router);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
