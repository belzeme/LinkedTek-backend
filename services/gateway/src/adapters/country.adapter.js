module.exports.adaptCountryList = (countryList) => {
  return countryList.map(countryItem => countryItem._fields[0].properties.name);
};