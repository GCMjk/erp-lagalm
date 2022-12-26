import gql from 'graphql-tag';
import { userFragment } from '@graphql/fragments';

const getUsers = gql`
    ${userFragment}
    query GetUsers {
        users {
            status
            message
            users {
                ...UserFragment
            }
        }
    }
`

const Me = gql`
    query Me {
        me {
            status
            message
            user {
                id
                name
            }
        }
    }
`


const Login = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            status
            message
            token
        }
    }
`

const Register = gql`
    ${userFragment}
    mutation Register($user: UserInput!) {
        register(user: $user) {
            status
            message
            user {
                ...UserFragment
            }
        }
    }
`