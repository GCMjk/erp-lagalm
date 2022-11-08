import gql from "graphql-tag"
import { imageFragment, contactFragment, detailsFragment } from "@gql/graphql/fragments"

export const customerFragment = gql`
    ${imageFragment}
    ${contactFragment}
    ${detailsFragment}
    fragment CustomerFragment on SalesCustomer {
        id
        name
        logo {
            ...ImageFragment
        }
        infoContact {
            ...ContactFragment
        }
        details {
            ...DetailsFragment
        }
    }
`