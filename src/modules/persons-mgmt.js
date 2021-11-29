const { v4: uuidv4 } = require('uuid');

const persons = {};

const setPerson = (obj) => {
  const person = { ...JSON.parse(obj) };

  person.id = uuidv4();
  persons[person.id] = person;

  return JSON.stringify(persons[person.id]);
};

const getPerson = (id) => {
  if (persons[id]) return JSON.stringify(persons[id]);

  return false;
};

const deletePerson = (id) => {
  if (persons[id]) {
    delete persons[id];
    return true;
  }

  return false;
};

const updatePerson = (id, obj) => {
  persons[id] = { ...JSON.parse(obj) };

  return JSON.stringify(persons[id]);
};

const getAllPersons = () => JSON.stringify(Object.values(persons));

module.exports = {
  setPerson,
  getPerson,
  getAllPersons,
  deletePerson,
  updatePerson,
};
