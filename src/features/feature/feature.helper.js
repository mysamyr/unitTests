module.exports.setIll = (user, ill) => {
  return {
    ...user,
    ill: !ill
  }
};
