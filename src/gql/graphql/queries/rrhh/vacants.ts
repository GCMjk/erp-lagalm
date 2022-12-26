import gql from 'graphql-tag'
import { vacantFragment } from '@graphql/fragments'

const getVacants = gql`
    ${vacantFragment}
    query GetVacants {
        vacants {
            status
            message
            vacants {
                ...VacantFragment
            }
        }
    }           
`