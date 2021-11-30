import { createReducer } from "reduxsauce"
import { setellitesTypes } from "./Actions"
import { INITIAL_STATE } from "./InitialState"
import { TFetchSatellitesSuccess, TSetellites } from "../Types/Setellites"

export const fetchSatellitesSuccess = (state: TSetellites, { listOfsatellites }: TFetchSatellitesSuccess) => ({
    ...state,
    listOfsatellites,
})

export const reducer = createReducer<TSetellites, TFetchSatellitesSuccess>(INITIAL_STATE, {
    [setellitesTypes.FETCH_SATELLITES_SUCCESS]: fetchSatellitesSuccess,
})
