const { assert } = require("sinon"),
  rewire = require("rewire"),
  { expect } = require("chai");// імпорт бібліотек для тестування

const { err } = require("../../../src/constants/errors");// імпорт констант і потрібних змінних

const {
  mockTransaction,// для методів без помилок
  mockTransactionError// для методів з помилкою
} = require("../../common/dbMock");// імпорт моків
const { serviceStub } = require("../../common/services/feature.service");// імпорт заглушок
const { setIllSpy } = require("../../common/helpers/feature.helper");// імпорт шпигунів

describe("features > feature > feature.controller", () => {// шлях до файлу
  let SUT;// оголошуємо Subject Under Tests
  beforeEach(() => {
    SUT = rewire("../../../src/features/feature/feature.controller");// назначаємо Subject Under Tests для кожного окремого тесту
  });
  // тут ставимо змінні спільні для тестування всіх методів модулю
  describe("method1", () => {// назва методу, що тестується
    let setIll;// оголошуємо шпигунів для хелперів
    beforeEach(() => {
      setIll = setIllSpy();// назначаємо шпигунів перед кожним окремим тестом
    });
    afterEach(() => {
      setIll.restore();// скидаємо шпигунів після тесту, щоб результати виклику не сумувалися
    });
    const id = 1;// змінні, спільні для тестування конкретного методу
    it("should throw error if ill = true", async () => {
      const ill = true;
      const user = {
        id,
        name: "Test",
        age: 25
      };// змінні для окремого тесту

      const service = serviceStub({ user });// викликаємо методи й передаємо в них дані, які очікуємо

      SUT.__set__({ transaction: mockTransactionError, service });// замінюємо транзакцію замінюємо всі модулі, які виконуються в методі

      const result = await SUT.method1(id, ill);// викликаємо метод і записуємо результат

      assert.calledOnce(service.get);// виклики інших методів, всередині методу, що тестується
      assert.calledWith(service.get, id);// параметри, з якими було викликано метод

      assert.notCalled(setIll);// методи, що не викликалися протягом тесту

      expect(result.message).to.equal(err);// асертаємо дані помилки, якщо виклик закінчився нею
    });
    it("should throw error if no user found", async () => {
      const ill = true;

      const service = serviceStub({});// пустий об'єкт якщо метод має повернути undefined

      SUT.__set__({ transaction: mockTransactionError, service });

      const result = await SUT.method1(id, ill);

      assert.calledOnce(service.get);
      assert.calledWith(service.get, id);

      assert.notCalled(setIll);

      expect(result.message).to.equal(err);
    });
    it("should return user if ill = false", async () => {
      const ill = false;
      const user = {
        id,
        name: "Test",
        age: 25
      };
      const expectedResult = {
        id,
        name: "Test",
        age: 25,
        ill: true
      };

      const service = serviceStub({ user });

      SUT.__set__({ transaction: mockTransaction, service });

      const result = await SUT.method1(id, ill);

      assert.calledOnce(service.get);
      assert.calledWith(service.get, id);

      assert.calledOnce(setIll);
      assert.calledWith(setIll, user, ill);

      expect(result).to.deep.equal(expectedResult);// асертаємо вхідні й вихідні дані
    });
  });
});
