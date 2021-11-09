const sinon = require("sinon");
const helper = require("../../../src/features/feature/feature.helper");

module.exports = {
  setIllSpy: () => sinon.spy(helper, "setIll")
};
