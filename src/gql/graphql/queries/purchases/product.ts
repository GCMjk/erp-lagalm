import gql from "graphql-tag"
import { productFragment } from "@gql/graphql/fragments"

const getProducts = gql`
    ${productFragment}
    query getProducts {
        products {
            status
            message
            products {
                ...ProductFragment
            }       
        }
    }
`