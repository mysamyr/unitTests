const {stub} = require("sinon");

module.exports = {
  serviceStub: ({ user, users }) => ({// метод заглушок модуля для тестування іншими методами
    methode1: stub().returns(stub().resolves("data1")),  // заглушка методу з curry
    methode2: stub().returns(stub()), // заглушка методу з curry які нічого не повертають
    methode3: stub().returns("data2"),  // заглушка методу без curry, які щось повертають
    methode4: stub(),  // заглушка методу без curry, які нічого не повертають
    get: stub().returns(stub().resolves(user)),
    list: stub().returns(stub().resolves(users)),
  }),
  setBirthYearStub: (data) => stub().returns(stub().resolves(data))// заглушка методу для тестування всередині себе
};
