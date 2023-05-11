import Filter from "./Filter";
import Listings from "./Listings";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IWantSolar = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  // Fetch all energy listings
  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await axios.get(`/energy-listings/`);
        setListings(response.data);
      } catch (error) {
        console.log('Error fetching energy listings: ', error);
        navigate('/error');
      }
    }
    fetchListings();
  }, [navigate, setListings])

  return ( 
    <div className="flex flex-col space-y-4">
      {/* Title */}
      <p className="text-6xl font-bold text-gray-800 py-12 text-center">
        Find Clean Utility Credit at Discounted Rates
      </p>
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-x-4 lg:space-y-0 items-center lg:items-start lg:justify-center">

        {/* Search Filter */}
        <div className="w-2/3 lg:w-4/12">
          <Filter setListings={ setListings } />
        </div>

        {/* Energy Listings Display */}
        <div className="w-2/3 lg:w-5/12 pb-16">
          <Listings listings={ listings } />
        </div>
      </div>
    </div>
   );
}
 
export default IWantSolar;
