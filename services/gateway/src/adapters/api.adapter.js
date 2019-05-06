const axios = require('axios');

const axiosErrorType = {
  response: 'response error',
  request: 'request error',
  internal: 'internal error'
};

const errorHandler = (axiosError) => {
  if (axiosError.response) {
    const { message, status } = axiosError.response;
    return ({ type: axiosErrorType.response, status, message });
  } else if (axiosError.request) {
    return ({ type: axiosErrorType.request, message: axiosError.request, status: 500 });
  } else {
    return ({ type: axiosErrorType.internal, message: axiosError.message, status: 500 });
  }
};

const create = (baseURL) => {
  return axios.create({ baseURL: baseURL });
};

module.exports = {
  create,
  errorHandler
};