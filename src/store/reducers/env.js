import { createAction, handleActions } from 'redux-actions';

const prefix = 'ENVIRONMENT';
const setUser = createAction(`${prefix}/SET_USER`, user => ({ user }));
const setResult = createAction(`${prefix}/SET_RESULT`, result => ({ result }));
const setStatic = createAction(`${prefix}/SET_STATIC`, staticData => ({
  staticData,
}));
export const actions = {
  setUser,
  setStatic,
  setResult,
};

// 변하지 않는 값이 들어가는 곳
const immutables = {
  user: {
    name: '',
    gender: null,
    birth: null,
    email: '',
    height: null,
    weight: null,
  },
  staticData: {
    healthy: null,
    sunning: Boolean,
    smoke: Boolean,
    drink: null,
    pragnant: null,
    pms: null,
  },
  result: null,
};

// 변할 수 있는 값이 들어가는 곳
const mutables = {};

// Reducer 틀을 작성
export default handleActions(
  // 액션을 묶어주는 부분
  {
    [setUser]: (state, { payload }) => {
      const { user } = payload;
      return { ...state, user };
    },
    [setStatic]: (state, { payload }) => {
      const { staticData } = payload;
      return { ...state, staticData };
    },
    [setResult]: (state, { payload }) => {
      const { result } = payload;
      return { ...state, result };
    },
  },
  {
    ...immutables,
    ...mutables,
  }
);
