import { useContext } from "react";
import { FiltersContext } from "../context/filters";

export function useFilters() {
    const { filters, setFilters } = useContext(FiltersContext)

    const filterCities = (cities) => {
        return cities.filter(city => {
            return (filters.currency === 'all' || city.currency === filters.currency)
        })
    }

    return {
        filters, setFilters, filterCities
    }
}