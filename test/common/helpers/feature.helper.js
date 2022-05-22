const { spy } = require("sinon");
const helper = require("../../../src/features/feature/feature.helper");

module.exports = {
  setIllSpy: () => spy(helper, "setIll")
};
