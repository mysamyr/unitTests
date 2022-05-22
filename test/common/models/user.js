const { stub } = require("sinon");

// метод заглушок модуля для тестування іншими методами
module.exports = ({ user, users, birthYearFromDB }) => ({
  get: stub().returns(stub().resolves(user)),
  list: stub().returns(stub().resolves(users)),
  getBirthYear: stub().returns(stub().resolves(birthYearFromDB)),
});
