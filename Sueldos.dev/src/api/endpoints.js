import { getEndpointFetch } from '../utils/getEndpointFetch.js'

export const CountryData = async country => await getEndpointFetch(`https://sueldos.dev/api/get-country-data?country=${country}`)

export const FilteredSalary = async country => await getEndpointFetch(`https://sueldos.dev/api/filtered-salary?country=${country}`)

// console.log({ countryData, filteredSalary })
