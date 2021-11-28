require('dotenv').config();
const http = require('http');
const {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  genResponse,
} = require('./src/modules/generate-response');

const conf = {
  port: process.env.PORT,
  host: process.env.HOST,
};

const requestHandler = (req, res) => {
  try {
    if (req.method === 'GET') {
      handleGet(req, res);
    }

    if (req.method === 'POST') {
      handlePost(req, res);
    }

    if (req.method === 'PUT') {
      handlePut(req, res);
    }

    if (req.method === 'DELETE') {
      handleDelete(req, res);
    }
  } catch (error) {
    genResponse(res, 500, error);
  }
};

const server = http.createServer(requestHandler);

server.listen(conf.port, conf.host, () =>
  process.stdout.write(`Listening on port ${conf.port}\n`)
);
