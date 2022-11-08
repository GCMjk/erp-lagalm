import gql from "graphql-tag"

export const contactFragment = gql`
    fragment ContactFragment on Contact {
        email
        phone
        web
        personalizedContact {
          title
          name
          workPosition
          email
          phone
        }
    }
`