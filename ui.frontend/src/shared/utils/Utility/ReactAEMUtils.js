import React from 'react';
import { Provider, connect } from 'react-redux';
import configureStore from 'shared/appStore/store';
import AsyncComponentWrapper from 'shared/components/Wrappers/components/AsyncComponentWrapper';

let storeRef = null;

/**
 * Store Provider Component
 * Used to attach the Redux Store into AEM Component Structure
 * @param {*} props - Object
 */
const StoreProviderComponent = (props) => {
    const { storeRef, children } = props;
    return (
        <Provider store={storeRef}>
            {children}
        </Provider>
    );
}

/**
 * Main Component which is used to render the React Components
 * @param {*} props - Object
 */
const MainComponent = (props) => {
    const { storeRef, children } = props;
    return (
        <StoreProviderComponent storeRef={storeRef}>
            {children}
        </StoreProviderComponent>
    );
};

/**
 * Connected Wrapper Component Used For Connecting the Component With Redux API - Child Component
 * @param {*} WrappedComponent - React Components
 * @param  {...any} args - Functions
 */
export const ConnectComponent = (WrappedComponent, ...args) => connect(...args)(WrappedComponent);

/**
 * Higher Order Component Used to Create the REAM Integrated Component - Synchronously
 * @param {*} WrappedComponent - React Component
 * @param  {...any} args - Fnctions
 */
export const connectWithStore = (WrappedComponent, ...args) => {
    if(storeRef === null || storeRef === undefined){
        storeRef = configureStore.configureStoreSync();
    }
    const ConnectedWrappedComponent = ConnectComponent(WrappedComponent, ...args);
    return ((props) => {
        return (<MainComponent storeRef={storeRef}>
            <ConnectedWrappedComponent {...props} />
        </MainComponent>);
    })
};

/**
 * Higher Order Component Used to Create the REAM Integrated Component - Asynchronously
 * @param {*} WrappedComponent - React Component
 * @param  {...any} args - Fnctions
 */
export const connectWithStoreAsync = (WrappedComponent, ...args) => {
    const asyncStoreRef = configureStore.configureStoreAsync; // JUST AN ASSIGNMENT NO FUNCTION CALL
    const ConnectedWrappedComponent = ConnectComponent(WrappedComponent, ...args);
    return ((props) => {
        return (<AsyncComponentWrapper promise={asyncStoreRef} childKey={"storeRef"}>
            <MainComponent>
                <ConnectedWrappedComponent {...props} />
            </MainComponent>
        </AsyncComponentWrapper>);
    });
};

/**
 * Higher Order Component Used to Create the REAM Integrated Component - Without Store Component
 * @param {*} WrappedComponent - React Component
 */
export const connectWithoutStore = (WrappedComponent) => {
    return ((props) => {
        return (<WrappedComponent {...props} />);
    });
};
