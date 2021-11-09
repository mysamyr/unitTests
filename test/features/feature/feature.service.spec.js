const { assert } = require("sinon");
const rewire = require("rewire");
const { expect } = require("chai");// імпорт бібліотек для тестування

const { err } = require("../../../src/constants/errors");// імпорт констант і потрібних змінних

const {
  mockTransaction,// для методів без помилок
  mockTransactionError// для методів з помилкою
} = require("../../common/dbMock");// імпорт моків
const { UserStub } = require("../../common/models");// імпорт заглушок
const { setBirthYearStub } = require("../../common/services/feature.service");// імпорт заглушок
const { setIllSpy } = require("../../common/helpers/feature.helper");// імпорт шпигунів

describe("features > feature > feature.service", () => {// шлях до файлу
  let SUT;// оголошуємо Subject Under Tests
  beforeEach(() => {
    SUT = rewire("../../../src/features/feature/feature.service");// назначаємо Subject Under Tests для кожного окремого тесту
  });
  // тут ставимо змінні спільні для тестування всіх методів модулю
  describe("method2", () => {// назва методу, що тестується
    const id = 1;// змінні, спільні для тестування конкретного методу
    it("should throw error if no user found", async () => {
      const User = UserStub({});// викликаємо методи й передаємо в них дані, які очікуємо
      const setBirthYear = setBirthYearStub({});

      // не замінюємо транзакцію, бо метод викликаний всередині транзакції
      SUT.__set__({ User, setBirthYear });// замінюємо всі модулі, які виконуються в методі

      const result = await mockTransactionError((transaction) => {
        return SUT.method2(id)(transaction);// викликаємо метод і записуємо результат
      });

      assert.calledOnce(User.get);// виклики інших методів, всередині методу, що тестується
      assert.calledWith(User.get, id);// параметри, з якими було викликано метод

      assert.notCalled(setBirthYear);// методи, що не викликалися протягом тесту

      expect(result.message).to.equal(err);// асертаємо дані помилки, якщо виклик закінчився нею
    });
    it("should return Hi for user with birth year 2000 or high", async () => {
      const user = {
        id,
        name: "Test",
        age: 25
      };
      const userWithBirthYear = {
        ...user,
        birthYear: 2000
      }// змінні для окремого тесту

      const User = UserStub({ user });
      const setBirthYear = setBirthYearStub(userWithBirthYear);

      SUT.__set__({ User, setBirthYear });

      const result = await mockTransaction((transaction) => {
        return SUT.method2(id)(transaction);
      });

      assert.calledOnce(User.get);
      assert.calledWith(User.get, id);

      assert.calledOnce(setBirthYear);
      assert.calledWith(setBirthYear, user);

      expect(result).to.equal("Hi");
    });
    it("should return Hello for user with birth year under 2000", async () => {
      const user = {
        id,
        name: "Test",
        age: 25
      };
      const userWithBirthYear = {
        ...user,
        birthYear: 1999
      }

      const User = UserStub({ user });
      const setBirthYear = setBirthYearStub(userWithBirthYear);

      SUT.__set__({ User, setBirthYear });

      const result = await mockTransaction((transaction) => {
        return SUT.method2(id)(transaction);
      });

      assert.calledOnce(User.get);
      assert.calledWith(User.get, id);

      assert.calledOnce(setBirthYear);
      assert.calledWith(setBirthYear, user);

      expect(result).to.equal("Hello");
    });
    it("should return Hello for user with not normal birth year", async () => {
      const user = {
        id,
        name: "Test",
        age: 25
      };
      const userWithBirthYear = {
        ...user,
        birthYear: "not a number"
      }// змінні для окремого тесту

      const User = UserStub({ user });// викликаємо методи й передаємо в них дані, які очікуємо
      const setBirthYear = setBirthYearStub(userWithBirthYear);

      // не замінюємо транзакцію, бо метод викликаний всередині транзакції
      SUT.__set__({ User, setBirthYear });// замінюємо всі модулі, які виконуються в методі

      const result = await mockTransaction((transaction) => {
        return SUT.method2(id)(transaction);// викликаємо метод і записуємо результат
      });

      assert.calledOnce(User.get);// виклики інших методів, всередині методу, що тестується
      assert.calledWith(User.get, id);// параметри, з якими було викликано метод

      assert.calledOnce(setBirthYear);
      assert.calledWith(setBirthYear, user);

      expect(result).to.equal("#^%&*");
    });
  });
  describe("method3", () => {
    let setIll;// оголошуємо шпигунів для хелперів
    beforeEach(() => {
      setIll = setIllSpy();// назначаємо шпигунів перед кожним окремим тестом
    });
    afterEach(() => {
      setIll.restore();// скидаємо шпигунів після тесту, щоб результати виклику не сумувалися
    });
    const ids = [1, 2];
    it("should throw error if no user found", async () => {
      const users = [];
      const ill = false;

      const User = UserStub({ users });// викликаємо методи й передаємо в них дані, які очікуємо

      // не замінюємо транзакцію, бо метод викликаний всередині транзакції
      SUT.__set__({ User });// замінюємо всі модулі, які виконуються в методі

      const result = await mockTransactionError((transaction) => {
        return SUT.method3(ids, ill)(transaction);// викликаємо метод і записуємо результат
      });

      assert.calledOnce(User.list);// виклики інших методів, всередині методу, що тестується
      assert.calledWith(User.list, ids);// параметри, з якими було викликано метод

      assert.notCalled(setIll);// методи, що не викликалися протягом тесту

      expect(result.message).to.equal(err);// асертаємо дані помилки, якщо виклик закінчився нею
    });
    it("should return Hi for user with birth year 2000 or high", async () => {
      const users = [{
        id: 1,
        name: "Test",
        age: 25
      }, {
        id: 2,
        name: "Test2",
        age: 26
      }];
      const ill = false;
      const expectResult = [{
        ...users[0],
        ill: true
      }, {
        ...users[1],
        ill: true
      }]// змінні для окремого тесту

      const User = UserStub({ users });

      SUT.__set__({ User });

      const result = await mockTransaction((transaction) => {
        return SUT.method3(ids, ill)(transaction);
      });

      assert.calledOnce(User.list);
      assert.calledWith(User.list, ids);

      assert.calledTwice(setIll);
      const firstCall = setIll.getCall(0);
      const secondCall = setIll.getCall(1);
      firstCall.calledWith(users[0], ill);
      secondCall.calledWith(users[1], ill);

      expect(result).to.deep.equal(expectResult);
    });
  });
});
