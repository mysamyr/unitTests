
module.exports.get = (id) => async (transaction) => {
  return transaction.run({
    id,
    name: "John",
    age: 25
  });
};
module.exports.list = (ids) => async (transaction) => {
  return ids.map(id => transaction.run({
    id,
    name: "John",
    age: 25
  }));
};
module.exports.getBirthYear = (id) => async (transaction) => {
  return transaction.run(1999);
};
