import gql from 'graphql-tag'
import { detailsFragment } from '@gql/graphql/fragments'

export const vacantFragment = gql`
    ${detailsFragment}
    fragment VacantFragment on RrhhVacant {
        id
        workAreaId {
            title
            description
        }
        title
        description {
            description
            benefits
            time
            salary
        }
        available {
            date
            candidates
            available
        }
        details {
            ...DetailsFragment
        }
    }
`