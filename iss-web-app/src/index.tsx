import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import "./index.css"

import { rootStore } from "./Redux"
import MainScreen from "./Container/MainScreen"

const { store, persistor } = rootStore

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MainScreen />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)
