import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers/index';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'authReducer',
    ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware),
);

let persistor = persistStore(store);

export {
    store,
    persistor,
};