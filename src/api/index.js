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

const StaticApi = {
  add: POST('/static/'),
  delete: DELETE('/static/:static_id'),
  get: GET('/static/:static_id'),
  list: GET('/static'),
  update: PUT('/static/:static_id'),
};

const KnowApi = {
  add: POST('/knowayak/'),
  delete: DELETE('/knowayak/:knowayak_id'),
  get: GET('/knowayak/:knowayak_id'),
  list: GET('/knowayak'),
  update: PUT('/knowayak/:knowayak_id'),
};

const ResultApi = {
  add: POST('/result/'),
  delete: DELETE('/result/:result_id'),
  get: GET('/result/:result_id'),
  list: GET('/result'),
  update: PUT('/result/:result_id'),
};

const ImageApi = {
  get: id => `${endpoint}/image/${id}`,
};

export { UserApi, NutritionApi, StaticApi, KnowApi, ResultApi, ImageApi };
