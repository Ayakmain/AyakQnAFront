import { createAction, handleActions } from 'redux-actions';

const prefix = 'ENVIRONMENT';
const setUser = createAction(`${prefix}/SET_USER`, user => ({ user }));
export const actions = {
  setUser,
};

// 변하지 않는 값이 들어가는 곳
const immutables = {
  user: {
    name: null,
    sex: null,
    age: null,
    email: null,
  },
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
  },
  {
    ...immutables,
    ...mutables,
  }
);
