import { createActions } from "reduxsauce"
import { ETypesName, TFetchSatellites, TFetchSatellitesLoading, TFetchSatellitesSuccess, TSatellite } from "../Types/Setellites"

const { Types, Creators } = createActions<
    {
        [ETypesName.FETCH_SATELLITES]: string
        [ETypesName.FETCH_SATELLITES_SUCCESS]: string
        [ETypesName.FETCH_SATELLITES_LOADING]: string
    },
    {
        fetchSatellites: () => TFetchSatellites
        fetchSatellitesSuccess: (listOfsatellites: TSatellite[]) => TFetchSatellitesSuccess
        fetchSatellitesLoading: (isLoading: boolean) => TFetchSatellitesLoading
    }
>({
    fetchSatellites: [],
    fetchSatellitesSuccess: ["listOfsatellites"],
    fetchSatellitesLoading: ["isLoading"],
})

export const setellitesTypes = Types
export default Creators
