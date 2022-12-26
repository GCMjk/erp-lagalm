import gql from "graphql-tag"
import { contactFragment, addressFragment, detailsFragment } from "@graphql/fragments"

export const supplierFragment = gql`
    ${contactFragment}
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
            ...ContactFragment
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
        }
        details {
            ...DetailsFragment
        }
    }
`