import gql from "graphql-tag"
import { supplierFragment } from "@gql/graphql/fragments"

const getSuppliers = gql`
    ${supplierFragment}
    query GetSuppliers {
        suppliers {
            status
            message
            suppliers {
                ...SupplierFragment
            }
        }
    }
`