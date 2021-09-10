import React from 'react';
import ReactDOM from 'react-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
// import { store, persistor } from 'store/reducers/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/reducers/store';
import App from 'App.jsx';
import 'normalize.scss';

const MOUNT_NODE = document.getElementById('root');

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        {/* <PersistGate persistor={persistor}> */}
        <Component />
        {/* </PersistGate> */}
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
