const { transaction } = require("../../services/db");
const {err} = require("../../constants/errors");
const service = require("./feature.service");
const helper = require("./feature.helper");

const method1 = async (id, ill) => {
  return transaction(async (transaction) => {
    const user = await service.get(id)(transaction);

    if (ill || !user) throw new Error(err);

    return helper.setIll(user, ill);
  });
};

module.exports = {
  method1
};
