import gql from 'graphql-tag'

import { userFragment, detailsFragment } from '@gql/graphql/fragments';

export const permissionFragment = gql`
    ${userFragment}
    ${detailsFragment}
    fragment PermissionFragment on RrhhPermission {
        id
        type
        reason
        userId {
            name
            lastname
            email
        }
        from
        to
        authorization
        details {
            ...DetailsFragment
        }
    }
`;