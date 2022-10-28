import gql from 'graphql-tag'
import { detailsFragment, imageFragment } from '@gql/graphql/fragments'

export const workAreaFragment = gql`
    ${detailsFragment}
    ${imageFragment}
    fragment WorkAreaFragment on RrhhWorkArea {
        id
        title
        description
        image {
            ...ImageFragment
        }
        details {
            ...DetailsFragment
        }
    }
`