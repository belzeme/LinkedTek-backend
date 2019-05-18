module.exports.adaptCountryList = (countryList) => {
  return countryList.map(countryItem => countryItem._fields[0].properties.name);
};

module.exports.adaptSchoolList = (schoolList) => {
  return schoolList.map(countryItem => countryItem._fields[0].properties);
};

module.exports.adaptRespData = (data) => {
  return data.map(datum => Object.assign(datum._fields[0].properties, {
    id: datum._fields[0].identity.low, 
  }));
};