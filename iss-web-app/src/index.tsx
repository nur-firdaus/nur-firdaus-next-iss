import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import "./index.css"

import MainScreen from "./Container/MainScreen"

ReactDOM.render(
    <React.StrictMode>
        <MainScreen />
    </React.StrictMode>,
    document.getElementById("root")
)
