require('dotenv').config();
const http = require('http');
const {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  genResponse,
} = require('./src/modules/generate-response');
const { handlePath } = require('./src/modules/handle-path');

const conf = {
  port: process.env.PORT,
  host: process.env.HOST,
};

const requestHandler = (req, res) => {
  try {
    process.stdout.write(`${req.method} request: ${req.url}\n`);

    const url = handlePath(req.url);

    if (!url.path || !url.pathValid) {
      genResponse(res, 404, 'PATH_NOT_VALID');

      return;
    }
    if (url.id && !url.idValid) {
      genResponse(res, 400, 'UUID_NOT_VALID');

      return;
    }

    if (req.method === 'GET') {
      handleGet(req, res, url.id);
    }

    if (req.method === 'POST') {
      handlePost(req, res, url.id);
    }

    if (req.method === 'PUT') {
      handlePut(req, res, url.id);
    }

    if (req.method === 'DELETE') {
      handleDelete(req, res, url.id);
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    genResponse(res, 500, error.message);
  }
};

const server = http.createServer(requestHandler);

server.listen(conf.port, conf.host, () =>
  process.stdout.write(`Listening on port ${conf.port}\n`)
);
