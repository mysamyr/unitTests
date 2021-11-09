const {expect} = require("chai"); // підключаємо chai
const helper = require("../../../src/features/feature/feature.helper");

describe("features > feature > feature.helper", () => {
  describe("helperExample", () => {
    const user = {
      id: 1,
      name: "Test",
      age: 25
    };
    it("should return object with ill user if ill = false", () => {
      const ill = false;
      const expectedResult = { ...user, ill: true };
      expect(helper.setIll(user, ill)).to.deep.equal(expectedResult);
    });
    it("should return object with healthy user if ill = true", () => {
      const ill = true;
      const expectedResult = { ...user, ill: false };
      expect(helper.setIll(user, ill)).to.deep.equal(expectedResult);
    });
    it("should return object with healthy user if no ill set", () => {
      const expectedResult = { ...user, ill: true };
      expect(helper.setIll(user, undefined)).to.deep.equal(expectedResult);
    });
    it("should return object with ill if no user set", () => {
      const ill = true;
      const expectedResult = { ill: false };
      expect(helper.setIll(undefined, ill)).to.deep.equal(expectedResult);
    });
    it("should return object with ill if both user and ill not set", () => {
      const expectedResult = {ill: true};
      expect(helper.setIll(undefined, undefined)).to.deep.equal(expectedResult);
    });
  });
});
