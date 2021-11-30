import { call, select } from "typed-redux-saga"
import { put } from "redux-saga/effects"
//Actions
import Actions from "../Redux/Actions"

//Constants
import { SystemMessage } from "../Constants/SystemMessage"
import { TFetchSatellites } from "../Types/Setellites"
import { TResult } from "../Types/ApiServiceType"
import ApiService from "../Services/ApiService"

//Types
import { TRootState } from "../Types/RootStateType"
import axios from "axios"

export function* fetchSatellites({}: TFetchSatellites) {
    try {
        yield put(Actions.fetchSatellitesLoading(true))
        let answer: any = []
        const result = axios
            .get("https://api.wheretheiss.at/v1/satellites", {
                params: {},
            })
            .then(function (response) {
                console.log(response.data)
                answer = response.data
            })
            .catch(function (error) {
                console.log(error)
            })
            .then(function () {
                // always executed
            })
        console.log(answer)
    } catch (error: any) {
        SystemMessage.operationError((error.message as TResult).message)
    } finally {
        yield put(Actions.fetchSatellitesLoading(false))
    }
}
