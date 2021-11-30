import { takeLatest, all, takeEvery } from "redux-saga/effects"

import { ETypesName as setellitesTypes } from "../Types/Setellites"

//Sagas
import { fetchSatellites } from "./SetellitesSaga"

export default function* root() {
    yield all([takeLatest(setellitesTypes.FETCH_SATELLITES, fetchSatellites)])
}
