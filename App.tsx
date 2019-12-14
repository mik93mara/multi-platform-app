import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store/store';
import AppWrapper from "./src";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={null}
                persistor={persistor}
            >
                <AppWrapper />
            </PersistGate>
        </Provider>
    );
}

export default App;
