import { combineReducers } from "redux"
import { configureStore } from "./CreateStore"

//Reducers
import { reducer as setellitesReducer } from "./Reducer"

//Types
import { Reducer } from "redux"
import { TRootState } from "../Types/RootStateType"

export const rootReducer: Reducer<TRootState> = combineReducers<TRootState>({
    setellites: setellitesReducer,
})

export const createStore = () => {
    return configureStore(rootReducer)
}

export const rootStore = createStore()
