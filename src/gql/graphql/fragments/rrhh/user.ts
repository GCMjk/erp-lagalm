import gql from 'graphql-tag'
import { addressFragment, workAreaFragment, detailsFragment } from '@gql/graphql/fragments'

export const userFragment = gql`
    ${addressFragment}
    ${workAreaFragment}
    ${detailsFragment}
    fragment UserFragment on User {
        id
        name
        lastname
        birthday
        gender
        maritalStatus
        curp
        address {
            ...AddressFragment
        }
        email
        password
        phone
        role
        lastSession
        rfc
        schooling
        nss
        infonavitCredit
        job {
            workAreaId {
                id
                title
                description
            }
            description
            schedule {
                from
                to
            }
            salary
            accountNumber
        }
        details {
            ...DetailsFragment
        }
    }
`;