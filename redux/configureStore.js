import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form';

const config = {
    key: 'root',
    storage: storage,
    // blacklist: ['navigation',],
    whitelist: [],
    debug: false, //to get useful logging
    timeout: null
};

const middleware = [];

middleware.push(thunk);

if (__DEV__) {
    // middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, {form: formReducer});
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
   // console.log('Test', store.getState());
});
const configureStore = () => {
    return { persistor, store };
};

export default configureStore;
