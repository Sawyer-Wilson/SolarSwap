import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import Filter from './Filter';
import EnergyListings from './EnergyListings';


// const Buyer = () => {
//   return ( 
//     <div>
//       <h1>Buyer Page</h1>
//       <Filter></Filter>
//     </div>
//    );
// }
 
// export default Buyer;

const Buyer = () => {
  const [listings, setListings] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = () => {
    axios.get('./energy-listings')
    .then((response) => {
      // let updatedList = response.data.map((listing) => listing.sellerName = getBuyerName(listing.sellerID))
      // console.log(updatedList)
      // setListings(updatedList);
      // setFilteredEntries(updatedList);
      setListings(response.data);
      setFilteredEntries(response.data);
    })
    .catch(error => console.error('Error: ${error}'));
  }

  // const getBuyerName = (sellerID) => {
  //   return 'name'
  //   // console.log(sellerID)
  //   // axios.get('./sellers/${sellerID}/name')
  //   // .then((response) => {
  //   //   console.log(response.data)
  //   //   return(response.data)
  //   // })
  //   // .catch(error => console.error('Error: ${error}'));
  // }


  console.log(listings)
  console.log(typeof(listings))
  // let response = []
  // useEffect( async () => {
  //   response = await axios.get('/energy-listings')
  //   setListings(response.data)
  //     // .then(setListings(response.data))
  //     // .then(setFilteredEntries(response.data))
  // }, [])


  return (
    <div className= "pt-32 w-3/4">
      <h1 className="text-5xl py-9">Find Clean Utility Credit at Discounted Rates</h1>
    
    <div className="grid grid-cols-2">
      <Filter listings={listings} setFilteredEntries={setFilteredEntries}></Filter>
      <EnergyListings filteredEntries={filteredEntries}></EnergyListings>
    </div>
    </div>
  )


}

export default Buyer;
