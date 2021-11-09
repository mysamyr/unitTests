const { err } = require("../../constants/errors");
const { User } = require("../../models/index");
const helper = require("./feature.helper");
const dateUtil = require("../../utils/date");

module.exports.get = User.get;

const setBirthYear = (user) => async (transaction) => {
  const birthYear = dateUtil.getCurrentYear() - user.age;
  const birthYearFromDB = await User.getBirthYear(user.id)(transaction);
  return (birthYear === birthYearFromDB)
    ? { ...user, birthYear }
    : { ...user, birthYear: birthYearFromDB };
};

module.exports.method2 = (id) => async (transaction) => {
  const user = await User.get(id)(transaction);
  if (!user) throw new Error(err);
  const userWithBirthYear = await setBirthYear(user)(transaction);
  if (userWithBirthYear.birthYear >= 2000) {
    return "Hi"
  } else if (userWithBirthYear.birthYear < 2000) {
    return "Hello"
  } else {
    return "#^%&*"
  }
};

module.exports.method3 = (ids, ill) => async (transaction) => {
  const users = await User.list(ids)(transaction);
  if (!users.length) throw new Error(err);
  return users.map(user => helper.setIll(user, ill));
};
