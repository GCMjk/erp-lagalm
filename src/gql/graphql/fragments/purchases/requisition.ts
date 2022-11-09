import gql from "graphql-tag"
import { detailsFragment } from "@gql/graphql/fragments"

export const requisitionFragment = gql`
    fragment RequisitionFragment on PurchaseRequisition {
        id
        product {
            productId {
                id
                name
            }
            type
            number
        }
        userId {
            id
            name
        }
        autorization
        details {
            ...DetailsFragment
        }
    }
`