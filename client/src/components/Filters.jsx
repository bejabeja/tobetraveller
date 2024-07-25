import React, { useId } from "react";
import { useFilters } from "../hooks/useFilters";

const Filters = () => {

    const { filters, setFilters } = useFilters()

    const currencyFilterId = useId()

    const handleChangeCurrency = (event) => {
        setFilters(prevState => ({
            ...prevState,
            currency: event.target.value
        }))
    }

    return <section className='cities--filters'>
        <div>
            <label htmlFor={currencyFilterId}>Currency</label>
            <div className='custom-select'>
                <select id={currencyFilterId} onChange={handleChangeCurrency}>
                    <option value='all'>All</option>
                    <option value='EUR'>EUR</option>
                    <option value='AUD'>AUD</option>
                    <option value='USD'>USD</option>
                </select>
            </div>
        </div>
    </section>;
};

export default Filters;
