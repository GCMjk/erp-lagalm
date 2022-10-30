import gql from "graphql-tag"
import { customerFragment } from "@gql/graphql/fragments"

const getCustomers = gql`
    ${customerFragment}
    query GetCustomers {
        customers {
            status
            message
            customers {
                ...CustomerFragment
            }
        }
    }
`