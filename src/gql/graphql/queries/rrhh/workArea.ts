import gql from 'graphql-tag'
import { workAreaFragment } from '@gql/graphql/fragments'

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