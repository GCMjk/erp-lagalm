import gql from "graphql-tag"
import { requisitionFragment } from "@gql/graphql/fragments"

const getRequisitions = gql`
    ${requisitionFragment}
    query getRequisitions {
        requisitions {
            status
            message
            requisitions {
                ...RequisitionFragment
            }
        }
    }
`