import { Address } from "@gql";

export const formatAddress = (address: Address) => {
    const { street, number, colony, municipality, state, zipCode, country, streets } = address
    return `${street} ${number?.exterior}${number?.interior}, ${colony} ${municipality} ${state}, ${zipCode} ${country}. (Entre ${streets?.a} y ${streets?.b})`
}