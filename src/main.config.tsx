import { QueryClient } from 'react-query';
import Cookies from 'js-cookie';
import { ApolloClient, HttpLink, from } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';

// apollo client ----------------------------------------------
export const httpLink = new HttpLink({
    uri: import.meta.env.VITE_APP_GRAPH + "graphql",
    credentials: 'same-origin',
    headers: { "x_api_key_cs3": import.meta.env.VITE_APP_PUBLIC_HEADER, }
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const cookie = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    // let captCookie = Cookies.get(import.meta.env.VITE_APP_JWT_COOKIE_CAPTCHA) ?? ""

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: cookie ? `Bearer ${cookie}` : "",
            // "recaptcha": captCookie
        }
    }

    return {
      headers
    }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        (graphQLErrors as any[]).forEach(({ message, locations, path, original_message }) => {
            if (original_message?.includes("(Api Key not valid)")) {
                // Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
                // fireToastyAlert("error", "Credenciales caducadas o incorrectas")
                document.location.href = "/";
            }
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        }
        );
    if (networkError) {
        // ToastyAlert.fire("Oops, hubo un error en la consulta, ¡inténtelo más tarde por favor!", undefined, "error")
        console.log(`[Network error]: ${networkError}`)
    };
});

export const apolloClient = new ApolloClient({
    name: "template",
    version: "0.0.0",
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(
        // {
        //     dataIdFromObject(responseObject,) { // add an id to the query cache on apollo client
        //         switch (responseObject.__typename) {
        //             case "Estado": return `Estado:${responseObject.contribuyente_id}`
        //             case "Liquidacion": return `Liquidacion:${responseObject.codigo_liquidacion}`
        //             default: return defaultDataIdFromObject(responseObject)
        //         }
        //     }
        // }
    )
})

// react query ----------------------------------------------
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false
        },
    },
})