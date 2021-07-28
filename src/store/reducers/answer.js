import { combineActions, createAction, handleActions } from 'redux-actions';

const prefix = 'ENVIRONMENT';
const setAnswers = createAction(`${prefix}/SET_ANSWERS`, answers => ({
  answers,
})); // 질문에 대한 답을 저장하는 부분
const setQuestions = createAction(`${prefix}/SET_QUESTIONS`, questions => ({
  questions,
})); // 질문 선택하는 부분

export const actions = {
  setAnswers,
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
    [combineActions(setAnswers, setQuestions)]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  {
    ...immutables,
    ...mutables,
  }
);
