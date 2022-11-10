import gql from "graphql-tag"
import { prospectFragment } from "@gql/graphql/fragments"

const getProspects = gql`
    ${prospectFragment}
    query GetProspects {
        prospects {
            status
            message
            prospects {
                ...ProspectFragment
            }
        }
    }
`

const getProspect = gql`
    ${prospectFragment}
    query getProspect($prospectId: ID!) {
        prospect(id: $prospectId) {
            status
            message
            prospect {
                ...ProspectFragment
            }
        }
    }
`