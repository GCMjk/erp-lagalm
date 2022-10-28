import gql from 'graphql-tag';
import { userFragment } from '@gql/graphql/fragments';

const getUsers = gql`
    query GetUsers {
        users {
            status
            message
            users {
                ...UserFragment
            }
        }
    }
    ${userFragment}
`