import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routerReducer } from 'react-router-redux';
import * as reducers from 'store/reducers';
import App from 'App.jsx';
import 'normalize.scss';

const MOUNT_NODE = document.getElementById('root');

// redux에서 사용되는 하나의 store 생성하는 부분
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Component />
      </BrowserRouter>
    </Provider>,
    MOUNT_NODE
  );

render(App);

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
