function validate(input) {
  let error = {};

  var regName = /[A-Za-z0-9]+/g;
  var regNumberBetween = /^[1-5]+$/;
  const regInteger = /^\d+$/;

  console.log(input.name);
  if (!regName.test(input.name)) {
    error.name = 'Name is required';
  } else if (!regNumberBetween.test(input.difficulty)) {
    error.difficulty = 'Difficulty is required';
  } else if (!input.duration) {
    error.duration = 'Duration is required';
  } else if (!regInteger.test(input.duration)) {
    error.duration = 'Duration must be a number';
  } else if (!input.season) {
    error.season = 'Season is required';
  } else if (input.inputCountries.length === 0) {
    error.inputCountries = 'At least one country is required';
  }

  console.log('ERROR', error);
  return error;
}

module.exports = {
  validate,
};
