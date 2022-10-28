import gql from 'graphql-tag'

export const addressFragment = gql`
    fragment AddressFragment on Address {
        street
        number {
            interior
            exterior
        }
        colony
        municipality
        state
        country
        zipCode
        streets {
            a
            b
        }
    }
`