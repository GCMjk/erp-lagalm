import gql from "graphql-tag"
import { supplierFragment, detailsFragment } from "@gql/graphql/fragments"

export const productFragment = gql`
    ${supplierFragment}
    ${detailsFragment}
    fragment ProductFragment on PurchaseProduct {
        id
        name
        description
        type {
            type
            description
        }
        brand
        audited
        supplierId {
            id
            name
        }
        details {
            ...DetailsFragment
        }
    }
`