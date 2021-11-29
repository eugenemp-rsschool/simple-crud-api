const handlePath = (path) => {
  const pathArr = path.split('/');
  const regexPath = /^person$/;
  const regexUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

  return {
    path: pathArr[1] !== undefined ? pathArr[1] : null,
    pathValid:
      regexPath.test(pathArr[1]) && pathArr.length > 2 && pathArr.length <= 4 && !pathArr[3],
    id: pathArr[2] !== undefined ? pathArr[2] : null,
    idValid: regexUUID.test(pathArr[2]),
  };
};

module.exports = {
  handlePath,
};
