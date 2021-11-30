import { createActions } from "reduxsauce"
import { ETypesName, TFetchSatellites, TFetchSatellitesSuccess, TSatellite } from "../Types/Setellites"

const { Types, Creators } = createActions<
    {
        [ETypesName.FETCH_SATELLITES]: string
        [ETypesName.FETCH_SATELLITES_SUCCESS]: string
    },
    {
        fetchSatellites: () => TFetchSatellites
        fetchSatellitesSuccess: (listOfsatellites: TSatellite[]) => TFetchSatellitesSuccess
    }
>({
    fetchSatellites: [],
    fetchSatellitesSuccess: ["listOfsatellites"],
})

export const setellitesTypes = Types
export default Creators
