import gql from 'graphql-tag'

export const detailsFragment: any = gql`
    fragment DetailsFragment on Details {
        status
        creatorUser {
            name
            email
        }
        creationDate
        modifierUserId {
            name
            email
        }
        lastModification
    }
`