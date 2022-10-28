import gql from 'graphql-tag'
import { permissionFragment } from '@gql/graphql/fragments'

const getPermission = gql`
    query GetPermissions {
        permissions {
            status
            message
            permissions {
                ...PermissionFragment
            }
        }
    }
    ${permissionFragment}
`