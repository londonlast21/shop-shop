import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { reducer } from './utils/reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as serviceWorker from './serviceWorker';
import { useProductReducer } from './utils/reducers';

const rootReducer = combineReducers({
  useProductReducer: useProductReducer
});

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension(): f => f
);

const store = createStore(rootReducer, enhancers);

store.dispatch((dispatch) => {
  dispatch({ type: 'FETCH_ITEMDATA_START' });
  axios.get('./products.json')
      .then((res) => {
          dispatch({ type: 'FETCH_ITEMDATA_SUCCESS', payload: res.data });
      }).catch((err) => {
          dispatch({ type: 'FETCH_ITEMDATA_ERROR', payload: err });
      })
})

render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
