import gql from "graphql-tag"
import { detailsFragment } from "../details"

export const customerFragment = gql`
    ${detailsFragment}
    fragment CustomerFragment on SaleCustomer {
        id
        name
        logo
        infoContact {
            email
            phone
            web
            personalizedContact {
                title
                name
                position
                email
                phone
            }
        }
        details {
            ...DetailsFragment
        }
    }
`