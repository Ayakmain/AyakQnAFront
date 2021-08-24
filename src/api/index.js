import Promise from 'bluebird';
import axios from 'axios';

const endpoint = '/api';

axios.interceptors.response.use(
  response => response.data,
  error => {
    const { data, status } = error.response;
    if (status === 422) return Promise.reject(data);
    console.error(data);
  }
);

const request = (url, process) => {
  const tokens = url.split('/');
  return (...args) =>
    new Promise(resolve => {
      const mappedURL =
        endpoint +
        tokens
          .map(token => (token.startsWith(':') ? args.shift() : token))
          .join('/');
      return resolve(process(mappedURL, args));
    });
};

const GET = (URL, headers) =>
  request(URL, (mappedURL, args) => {
    const [params] = args;
    return axios.get(mappedURL, { params, headers });
  });

const DELETE = (URL, headers) =>
  request(URL, (mappedURL, args) => {
    const [params] = args;
    return axios.delete(mappedURL, { params, headers });
  });

const POST = (URL, headers) =>
  request(URL, (mappedURL, args) => {
    const [body, params] = args;
    return axios.post(mappedURL, body, { params, headers });
  });

const PUT = (URL, headers) =>
  request(URL, (mappedURL, args) => {
    const [body, params] = args;
    return axios.put(mappedURL, body, { params, headers });
  });

const UserApi = {
  post: POST('/user'),
  get: GET('/user/:user_id'),
  getList: GET('/user'),
  update: PUT('/user/:_id'),
};

const NutritionApi = {
  add: POST('/nutrition/'),
  delete: DELETE('/nutrition/:nutrition_id'),
  get: GET('/nutrition/:nutrition_id'),
  list: GET('/policy/'),
  update: PUT('/nutrition/:nutrition_id'),
};

const QAApi = {
  add: POST('/qa/'),
  delete: DELETE('/qa/:qa_id'),
  get: GET('/qa/:qa_id'),
  list: GET('/qa'),
  update: PUT('/qa/:qa_id'),
};

export { UserApi, NutritionApi, QAApi };
