import { Action } from "redux"

//for type declaration will start with T infront of the variable name

export type TSetellites = {
    isLoading: boolean
    listOfsatellites: TSatellite[]
    satelliteDetails: TSatelliteDetails
    satellitesDetails: TSatelliteDetails[]
    coordinates: TCoordinates
}

export type TSatellite = {
    id: number
    name: string
}

export type TSatelliteDetails = {
    id: number
    name: string
    latitude: number
    longitude: number
    altitude: number
    velocity: number
    visibility: string
    footprint: number
    timestamp: number
    daynum: number
    solar_lat: number
    solar_lon: number
    units: string
}

export type TCoordinates = {
    latitude: number
    longitude: number
    timezone_id: string
    offset: number
    country_code: string
    map_url: string
}

export enum ETypesName {
    FETCH_SATELLITES = "FETCH_SATELLITES",
    FETCH_SATELLITES_SUCCESS = "FETCH_SATELLITES_SUCCESS",
    FETCH_SATELLITES_LOADING = "FETCH_SATELLITES_LOADING",
}

export type TFetchSatellites = Action<ETypesName.FETCH_SATELLITES> & {}

export type TFetchSatellitesSuccess = Action<ETypesName.FETCH_SATELLITES_SUCCESS> & { listOfsatellites: TSatellite[] }

export type TFetchSatellitesLoading = Action<ETypesName.FETCH_SATELLITES_LOADING> & { isLoading: boolean }
