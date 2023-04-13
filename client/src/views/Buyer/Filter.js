
import React, { useState } from 'react'
import axios from 'axios';
import Dropdown from '../../components/layouts/Dropdown';

const municipalities = require('../../components/layouts/dropdown-options').municipalities;
const utilityProviders = require('../../components/layouts/dropdown-options').utilityProviders;

const Filter = ({ listings, setFilteredEntries }) => {
    const[municipality, setMunicipality] = React.useState('');
    const[utilityProvider, setUtilityProvider] = React.useState('');


    const handleSearchChange = (e) => {
        e.preventDefault()
        
        // if (!e.target.value) return setFilteredEntries(listings)

        const resultsArray = listings
        .filter(x => x.municipality == (municipality == '' ? x.municipality : municipality))
        .filter(y => y.utilityProvider == (utilityProvider == '' ? y.utilityProvider : utilityProvider));
        setFilteredEntries(resultsArray);
    }

    return (
        <div className = "filter">
            <div className="search-header" class = "max-w-sm bg-white rounded overflow-hidden shadow-lg w-[404px] h-[277px] pl-5 pr-5">
                <div className="search-text" class = "text-xl pb-2 pt-4 pl-5">01. MUNICIPALITY:</div>
                <Dropdown isSearchable placeHolder="Select..." options={municipalities} onChange={(value) => {setMunicipality(value.value)}}></Dropdown>
                <div className="search-text" class = "text-xl pb-2 pt-2 pl-5">02. UTILITY PROVIDER:</div>
                <Dropdown isSearchable placeHolder="Select..." options={utilityProviders} onChange={(value) => {setUtilityProvider(value.value)}}></Dropdown>
                <button onClick={handleSearchChange} class = "button3 mt-5" >View Offers</button>
            </div>
        </div>
                

    )


}


export default Filter;
