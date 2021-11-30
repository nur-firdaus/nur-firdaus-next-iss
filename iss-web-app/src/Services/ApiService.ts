import axios from "axios"

//Types
import { TResult } from "../Types/ApiServiceType"

const url = process.env.REACT_APP_API_URL

//Not test yet
const getApi = (api: string, token: string | null, getData = {}, contentType = "application/json"): any => {
    let urlParams = ""

    let newGetData = { ...getData }

    Object.entries(newGetData).forEach((entry) => {
        const key = entry[0]
        const value = entry[1]
        if (Array.isArray(value)) {
            value.forEach((a) => {
                if (urlParams.length === 0) {
                    urlParams = "?"
                } else {
                    urlParams += "&"
                }
                urlParams = `${urlParams + key}[]=${a}`
            })
        } else {
            if (urlParams.length === 0) {
                urlParams = "?"
            } else {
                urlParams += "&"
            }
            urlParams = `${urlParams + key}=${value}`
        }
    })

    let status: number = 0
    let newToken: string | null = null
    let isSuccess: boolean = false
    let isTokenExpired: boolean = false
    let isPasswordExpired: boolean = false
    let respData: string | null = null

    return axios({
        method: "get",
        url: `${url}/${api}${urlParams}`,
        headers: {
            Accept: "application/json",
            "Content-Type": contentType,
            "Access-Control-Allow-Origin": "*",
        },
        validateStatus: () => {
            return true
        },
    })
        .then((response) => {
            status = response.status

            // parsing the luuwu api response
            // read the new generated token from header
            if (typeof response.headers.authorization !== "undefined") {
                newToken = response.headers.authorization
            }

            if (response.data.success === true) {
                isSuccess = true
            }
            const { message } = response.data

            // if token already expired
            if (typeof response.data.data !== "undefined") {
                if (response.data.data.token === false) {
                    isTokenExpired = true
                } else if (response.data.data.token === -35) {
                    isPasswordExpired = true
                }
                respData = response.data.data
            }

            return {
                status,
                newToken,
                isSuccess,
                isTokenExpired,
                isPasswordExpired,
                data: respData,
                message,
            }
        })
        .catch(function catchError(error) {
            let message = ""
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                respData = error.response.data
                // console.log(error.response.status);
                status = error.response.status
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
            }
            message = error.message
            return {
                status,
                newToken: null,
                isSuccess: false,
                isTokenExpired: false,
                isPasswordExpired: false,
                data: respData,
                message,
            }
        })
}

export const ApiService = {
    getApi,
}

export default ApiService
