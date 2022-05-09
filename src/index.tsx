import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { history } from './services/reducers';
import { ConnectedRouter } from 'connected-react-router';
import { store } from './services/store';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
