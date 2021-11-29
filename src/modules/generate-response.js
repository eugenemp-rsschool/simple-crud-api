const {
  getAllPersons,
  getPerson,
  setPerson,
  updatePerson,
  deletePerson,
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

const genResponse = (res, status, data) => {
  if (status > 299) {
    res.writeHead(status, { 'Content-Type': 'text/plain' });
    res.end(`${status}: ${answers[data] || answers.INT_SERVER_ERR}`);

    return;
  }

  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(data);
};

const handleGet = (req, res, id) => {
  if (id) {
    if (getPerson(id)) genResponse(res, 200, getPerson(id));
    else genResponse(res, 404, 'UUID_NOT_EXIST');
  } else genResponse(res, 200, getAllPersons());
};

const handlePost = (req, res, id) => {
  if (id) genResponse(res, 404, 'PATH_NOT_VALID');
  else {
    req.on('data', (data) => {
      const newPerson = data;

      if (validatePerson(newPerson))
        genResponse(res, 201, setPerson(newPerson));
      else genResponse(res, 400, 'OBJ_NOT_VALID');
    });
  }
};

const handlePut = (req, res, id) => {
  if (!id) genResponse(res, 404, 'PATH_NOT_VALID');
  else {
    req.on('data', (data) => {
      const oldPerson = getPerson(id);
      const newPerson = data;

      if (!oldPerson) genResponse(res, 404, 'UUID_NOT_EXIST');
      else if (validatePerson(newPerson))
        genResponse(res, 200, updatePerson(id, newPerson));
      else genResponse(res, 400, 'OBJ_NOT_VALID');
    });
  }
};

const handleDelete = (req, res, id) => {
  if (deletePerson(id)) genResponse(res, 204, 'PERSON_DELETED');
  else genResponse(res, 404, 'UUID_NOT_EXIST');
};

module.exports = {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  genResponse,
};
