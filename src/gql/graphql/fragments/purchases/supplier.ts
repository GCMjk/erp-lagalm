import gql from "graphql-tag"
import { addressFragment, detailsFragment } from "@gql/graphql/fragments"

export const supplierFragment = gql`
    ${addressFragment}
    ${detailsFragment}
    fragment SupplierFragment on PurchaseSupplier {
        id
        name
        logo {
            height
            width
            url
        }
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
        address {
            ...AddressFragment
        }
        taxes {
            type
            rfc
        }
        deliveryTime
        passed
        classification
        productId {
            id
            name
            description
            type {
                type
                description
            }
            brand
            audited
        }
        details {
            ...DetailsFragment
        }
    }
`