import { Action } from "redux"

//Types
import { Storage } from "redux-persist/es/types"
import { RouteComponentProps } from "react-router-dom"
import { IntlShape } from "react-intl"

export type TPersistConfig = {
    key: string
    storage: Storage
    whitelist?: string[]
    blacklist?: string[]
}

export type TSystemMessage = {
    [key: string]: (response: string, duration?: number) => void
}
