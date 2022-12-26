import gql from "graphql-tag"
import { supplierFragment } from "@graphql/fragments"

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