module.exports.transaction = (func) => {
  const transaction = {
    run: (props) => props,
  };
  const data = func(transaction);
  data.end();
  return data
};
