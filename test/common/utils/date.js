const {spy} = require("sinon");
const dateUtil = require("../../../src/utils/date");

module.exports = {
  getCurrentYearSpy: (data) => spy(dateUtil, "getCurrentYear")// оголошення шпигуна для методу без транзакції
};
