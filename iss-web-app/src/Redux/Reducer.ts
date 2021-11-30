import { createReducer } from "reduxsauce"
import { setellitesTypes } from "./Actions"
import { INITIAL_STATE } from "./InitialState"
import { TFetchSatellitesLoading, TFetchSatellitesSuccess, TSetellites } from "../Types/Setellites"

export const fetchSatellitesSuccess = (state: TSetellites, { listOfsatellites }: TFetchSatellitesSuccess) => ({
    ...state,
    listOfsatellites,
})

export const fetchSatellitesLoading = (state: TSetellites, { isLoading }: TFetchSatellitesLoading) => ({
    ...state,
    isLoading,
})

export const reducer = createReducer<TSetellites, TFetchSatellitesSuccess | TFetchSatellitesLoading>(INITIAL_STATE, {
    [setellitesTypes.FETCH_SATELLITES_SUCCESS]: fetchSatellitesSuccess,
    [setellitesTypes.FETCH_SATELLITES_LOADING]: fetchSatellitesLoading,
})
