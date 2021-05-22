import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
export type RootState = ReturnType<typeof rootReducer>;

// Configures redux store with saga middleware.
export default function configureStore() {
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers: StoreEnhancer = compose(...enhancers);
  const store = createStore(rootReducer, composedEnhancers);
  sagaMiddleware.run(rootSaga);

  return store;
}
