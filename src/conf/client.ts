import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
    uri:
        `${process.env.NEXT_PUBLIC_URL_API}/graphql` ||
        'http://localhost:2002/graphql',
    fetch,
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = ApolloLink.from([errorLink, httpLink]);

export const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link,
});