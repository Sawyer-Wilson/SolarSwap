import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import Filter from './Filter';
import EnergyListings from './EnergyListings';
import Dropdown from '../../components/layouts/Dropdown'



const Buyer = () => {
  const [listings, setListings] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = () => {
    axios.get('./energy-listings')
    .then((response) => {
      setListings(response.data);
      setFilteredEntries(response.data);
    })
    .catch(error => console.error('Error: ${error}'));
  }

  const municipalities = [
    {value: "", label: "Select..."},
    {value: "somerville", label: "Somerville"},
    {value: "medford", label: "Medford"},
    {value: "abington", label: "Abington"}
  ]

  return (
    <div className= "pt-32 w-3/4">
      <h1 className="text-5xl py-9">Find Clean Utility Credit at Discounted Rates</h1>
    
    <div className="grid grid-cols-2">
      <Filter listings={listings} setFilteredEntries={setFilteredEntries}></Filter>
      <EnergyListings filteredEntries={filteredEntries}></EnergyListings>
      <Dropdown placeHolder="Select..." options={municipalities}></Dropdown>
    </div>
    </div>
  )


}

export default Buyer;
