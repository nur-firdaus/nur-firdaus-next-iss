import { applyMiddleware, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

//RootSaga
import rootSaga from "../Saga/index"

//Types
import { TRootState } from "../Types/RootStateType"
import { TPersistConfig } from "../Types/AppType"
import { Reducer } from "redux"

const persistConfig: TPersistConfig = {
    key: typeof process.env.APP_KEY === "undefined" ? "root" : process.env.APP_KEY,
    storage,
    whitelist: [],
}

export const configureStore = (rootReducer: Reducer<TRootState>) => {
    const enhancers = []

    //Connect the sagas to the redux store
    const sagaMiddleware = createSagaMiddleware()
    enhancers.push(applyMiddleware(sagaMiddleware))

    //Redux persist
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(persistedReducer, composeWithDevTools(...enhancers))
    const persistor = persistStore(store)

    //Start the root saga
    sagaMiddleware.run(rootSaga)

    return { store, persistor }
}
