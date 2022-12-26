import gql from 'graphql-tag'
import { workAreaFragment } from '@graphql/fragments'

const getWorkArea = gql`
    query GetWorkAreas {
        workAreas {
            status
            message
            workAreas {
            ...WorkAreaFragment
            }
        }
    }
    ${workAreaFragment}
`