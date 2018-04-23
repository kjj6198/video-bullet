import { createStore } from 'redux';
import rootReducers from '../reducers';

const configureStore = () => {
  if (module.hot) {
    module.hot.accept('../reducers/index.js', () => {
      const nextRootReducer = require('../reducers/index.js'); // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return createStore(rootReducers);
};

export default configureStore;
