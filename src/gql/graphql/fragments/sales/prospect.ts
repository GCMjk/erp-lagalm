import gql from "graphql-tag"
import { imageFragment, contactFragment, addressFragment, detailsFragment } from "@gql/graphql/fragments"

// Fragment prospect
export const prospectFragment = gql`
    ${imageFragment}
    ${contactFragment}
    ${addressFragment}
    ${detailsFragment}
    fragment ProspectFragment on SalesProspect {
        id
        company
        businessActivity
        logo {
            ...ImageFragment
        }
        contact {
            ...ContactFragment
        }
        address {
            ...AddressFragment
        }
        message
        attended
        matches
        details {
            ...DetailsFragment
        }
    }
`