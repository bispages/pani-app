import { applyMiddleware, compose, createStore, StoreEnhancer } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
export type RootState = ReturnType<typeof rootReducer>

// Persisted Storage.
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['onboard'],
};
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// Configures redux store with saga middleware. 
export default function configureStore() {
    const middlewares = [sagaMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [middlewareEnhancer];
    const composedEnhancers: StoreEnhancer = compose(...enhancers);
    const store = createStore(persistedReducer, composedEnhancers);

    const persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
    return { store, persistor };
}

