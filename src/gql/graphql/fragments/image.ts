import gql from "graphql-tag"

export const imageFragment = gql`
    fragment ImageFragment on Image {
        height
        width
        url
    }
`