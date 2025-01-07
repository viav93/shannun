import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import RootReducer from './reducers/rootReducer';

let composeEnhancers = compose;

// Need to add a check if it is production than remove below code.
if (process.env.NODE_ENV === 'development') {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
        composeEnhancers = composeWithDevToolsExtension;
    }
}

// Creating a thunk Middleware 
let middleware = [thunkMiddleware];
// Creating Logger Middleware
const loggerMiddleware = createLogger();

// Adding Logger Middleware in case if it is Development Environments 
if (process.env.NODE_ENV === 'development') {
    middleware = [...middleware, loggerMiddleware];
}

/**
 * Is Used for Creating the Redux Store
 */
const createReduxStore = () => createStore(RootReducer, composeEnhancers(applyMiddleware(...middleware)));

/**
 * App Store Configuration -- Used to configure the Redux Store with App Sychronously and Asynchronously
 */
const configureStore = {
    /**
     * Is Used to configure the Store in Synchronous Way 
     */
    configureStoreSync: () => createReduxStore(),
    /**
     * Is Used to Configuare the Redux Store Asynchronously
     */
    configureStoreAsync: () => new Promise((resolve) => {
        resolve(createReduxStore());
    })
};



// Default Export
export default configureStore;