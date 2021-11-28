const {
  getAllPersons,
  getPerson,
  setPerson,
  updatePerson,
} = require('./persons-mgmt');
const { validatePerson } = require('./validate-person');

const answers = {
  UUID_NOT_VALID: 'Invalid person UUID',
  UUID_NOT_EXIST: 'There is no person with specified ID',
  PATH_NOT_VALID: 'Invalid Path',
  INT_SERVER_ERR: 'Interanl Server Error',
  PERSON_DELETED: 'Specified person has been successfully deleted',
  OBJ_NOT_VALID:
    "Mandatory person's object properties are missing or it's values are invalid",
};

const regex = {
  path: /^\/person(\/)?$/,
  id: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  full: /^\/person\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(\/)?$/,
};

const genResponse = (res, status, data) => {
  if (status > 299) {
    res.writeHead(status, { 'Content-Type': 'text/plain' });
    res.end(`${status}: ${answers[data] || answers.INT_SERVER_ERR}`);

    return;
  }

  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(data);
};

const handleGet = (req, res) => {
  process.stdout.write(`GET request: ${req.url}\n`);

  if (regex.path.test(req.url)) genResponse(res, 200, getAllPersons());
  else if (regex.full.test(req.url)) {
    const person = getPerson(req.url.match(regex.id)[1]);

    if (person) genResponse(res, 200, person);
    else genResponse(res, 404, 'UUID_NOT_EXIST');
  } else genResponse(res, 404, 'PATH_NOT_VALID');
};

const handlePost = (req, res) => {
  process.stdout.write(`POST request: ${req.url}\n`);

  if (!regex.path.test(req.url)) genResponse(res, 404, 'PATH_NOT_VALID');
  else {
    const newPerson = JSON.parse(req.body);

    if (validatePerson(newPerson)) {
      genResponse(res, 201, setPerson(newPerson));
    } else genResponse(res, 400, 'OBJ_NOT_VALID');
  }
};

const handlePut = (req, res) => {
  process.stdout.write(`PUT request: ${req.url}\n`);

  if (!regex.full.test(req.url)) genResponse(res, 404, 'UUID_NOT_VALID');
  else {
    req.on('data', (data) => {
      const oldPerson = getPerson(req.url.match(regex.id)[1]);
      const newPerson = JSON.parse(data);

      if (!oldPerson) genResponse(res, 404, 'UUID_NOT_EXIST');
      else if (validatePerson(newPerson))
        genResponse(res, 200, updatePerson(newPerson));
    });
  }
};

const handleDelete = (req, res) => {
  process.stdout.write(`DELETE request: ${req.url}\n`);

  if (!regex.full.test(req.url)) genResponse(res, 404, 'UUID_NOT_VALID');
  else {
    const person = getPerson(req.url.match(regex.id)[1]);

    if (getPerson(person)) genResponse(res, 204, 'PERSON_DELETED');
  }
};

module.exports = {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  genResponse,
};
