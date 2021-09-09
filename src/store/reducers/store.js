import { combineReducers, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { routerReducer } from 'react-router-redux';
import * as reducers from 'store/reducers';

// redux에서 사용되는 하나의 store 생성하는 부분
export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// store의 persisted 버전을 선언
// localStorage에 저장하는 부분
export const persistor = persistStore(store);
