const checkNotValidArgument = (variable) => {
  return variable == null || variable === undefined || variable === '' || Number.isNaN(variable);
};
