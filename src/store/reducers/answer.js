import { combineActions, createAction, handleActions } from 'redux-actions';

const prefix = 'ENVIRONMENT';
const setQuestions = createAction(`${prefix}/SET_QUESTIONS`, questions => ({
  questions,
})); // 질문 선택하는 부분

export const actions = {
  setQuestions,
};

// 변하지 않는 값이 들어가는 곳
const immutables = {
  answers: [],
  questions: [],
};

// 변할 수 있는 값이 들어가는 곳
const mutables = {};

// Reducer 틀을 작성
export default handleActions(
  {
    // 액션을 묶어주는 부분
    [combineActions(setQuestions)]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  {
    ...immutables,
    ...mutables,
  }
);
