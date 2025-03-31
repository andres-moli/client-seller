import { OperationVariables } from "@apollo/client";
import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import Cookies from 'js-cookie'
import axios from "axios";

// axios config -----------------------------------
export const axiosRest = axios.create({
    baseURL: import.meta.env.VITE_APP_GRAPH,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*'
    }
})

// axios functions

export async function privateFetcherPost<T>(route: string, options?: any) {
    let userCookie = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    const response: T = await axiosRest.post(route, options, { headers: { "Authorization": `Bearer ${userCookie}` } }).then((res) => res.data)
    return response
}

export async function privateFetcher<T>(route: string, options?: any) {
    let userCookie = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    const response: T = await axiosRest.get(route, { headers: { "Authorization": `Bearer ${userCookie}` } }).then((res) => res.data)
    return response
}


// graphQl config

export const publicGraph = new GraphQLClient(import.meta.env.VITE_APP_GRAPH + "graphql", {
    headers: { "Content-Type": "application/json", }
})

export async function publicGraphqlFetcher<T>(query: DocumentNode, variables?: OperationVariables, needJwt?: boolean) {
    if (needJwt) {
        // let user = sessionStorage.getItem(import.meta.env.VITE_APP_KEY_STORAGE)
        let userCookie = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
        publicGraph.setHeader("Authorization", "Bearer " + userCookie!)
        const response: T = await publicGraph.request<T>(query, variables)
        return response
    }

    const response: T = await publicGraph.request<T>(query, variables)
    return response
}