
const mockTransactionError = async (func) => {
  const connection = {};
  try {
    return await func(connection);
  } catch (e) {
    return e;
  }
};

const mockTransaction = async (func) => {
  const connection = {};
  return await func(connection);
};

module.exports = {
  mockTransactionError,
  mockTransaction,
};
