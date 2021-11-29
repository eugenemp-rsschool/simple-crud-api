const validatePerson = (person) => {
  const obj = JSON.parse(person);

  if (!('name' in obj) || !('age' in obj) || !('hobbies' in obj)) return false;

  if (
    typeof obj.name !== 'string' ||
    typeof obj.age !== 'number' ||
    !Array.isArray(obj.hobbies)
  )
    return false;

  if (
    obj.hobbies.length > 0 &&
    !obj.hobbies.every((el) => typeof el === 'string')
  )
    return false;

  return true;
};

module.exports = {
  validatePerson,
};
