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
      setListings(response.data);
      setFilteredEntries(response.data);
    })
    .catch(error => console.error('Error: ${error}'));
  }

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
    <div>
      <p>{listings.map(listing => <div>{listing.utilityCompany}</div>)}</p>
      <Filter listings={listings} setFilteredEntries={setFilteredEntries}></Filter>
      <EnergyListings filteredEntries={filteredEntries}></EnergyListings>
    </div>
    // <>
    // <Filter listings={listings} setFilteredEntries={setFilteredEntries}></Filter>
    // <EnergyListings filteredEntries={filteredEntries}></EnergyListings>
    // </>
  )


}

export default Buyer;


// import React, { useState } from 'react'

// const SellerListing = () => {
//     const[selected, setSelected] = useState(null)

//     const[filteredList, setFilteredList] = new useState(data);
//     const[municipality, setMunicipality] = React.useState('');
//     const[provider, setProvider] = React.useState('');

//     const toggle = (i) => {
//         if(selected === i) {
//             return setSelected(null)
//         }

//         setSelected(i)
//     }

//     const filterBySearch = (event) => {
//         // Access input value
//         const query = event.target.value;
//         // Create copy of item list
//         var updatedList = [...data];
//         // Include all elements which includes the search query
//         updatedList = updatedList
//         .filter(x => x.municipality == (municipality == '' ? x.municipality : municipality))
//         .filter(y => y.provider == (provider == '' ? y.provider : provider));
//         // Trigger render with updated values
//         setFilteredList(updatedList);
//     };

//     return (
//         <div>
//         <div className = "filter">
//             <div className="search-header" class = "max-w-sm bg-white rounded overflow-hidden shadow-lg w-[404px] h-[277px] pl-5 pr-5">
//                 <div className="search-text" class = "text-xl pb-2 pt-4 pl-5">01. MUNICIPALITY:</div>
//                 <input id="search-box" class = "inputBox mb-5" placeholder="Abington" onChange={(e) => setMunicipality(e.target.value)}/>

//                 <div className="search-text" class = "text-xl pb-2 pl-5">02. UTILITY PROVIDER:</div>
//                 <input id="search-box" class = "inputBox" placeholder="Eversource" onChange={(e) => setProvider(e.target.value)}/>

//                 <button onClick={filterBySearch} class = "button3 mt-5" >View Offers</button>
//             </div>
                
//             {/*<div id="item-list">
//                 {filteredList.map((item, index) => (
//                     <li key={index}>{item.municipality}: {item.provider}</li>
//             ))}
//             </div>*/}
//         </div>

        // <div className = "wrapper">
        //     <div className = "accordian">

        //         {filteredList.map((item,i) => (
                    
        //             <div className = "item">
        //                 <div className = "title" onClick={() => toggle(i)}>
        //                     <div class = "grid grid-cols-2 gap-2">
                                
        //                         <div>
        //                             <h2 class = "text-xl pb-2">{item.name}</h2>
        //                             <p class = "text-[#717171] text-xs">{item.date}</p>
        //                         </div>

        //                         <div>
        //                             <span class = "text-base">monthly utility credit: </span>
        //                             <span class = "inline line-through text-xl">${item.utilityCredit}</span><br></br>
        //                             <span class = "text-base ml-16">asking price: </span>
        //                             <span class = "inline text-xl">{item.askingPrice}</span>
        //                         </div>
        //                     </div>
                            
        //                     <span>{selected === i ? 'v' : '>'}</span>
        //                 </div> 
        //                 <br></br>
        //                 <div className = {selected === i ? 'content show' : 'content'}>
        //                     <div class = "grid grid-cols-2 gap-16 pt-3">
        //                         <span>Utility Provider:</span>
        //                         <span>{item.provider}</span>
        //                     </div>

        //                     <div class = "grid grid-cols-2 gap-16 pt-3">
        //                         <span class = "underline">Monthly Utility Credit:  </span>
        //                         <span>${item.utilityCredit}</span>
        //                     </div>

        //                     <div class = "grid grid-cols-2 gap-16 pt-3">
        //                         <span class = "underline">Proposed Discount:</span>
        //                         <span class = "text-[#4BB038]">-${item.discount}</span>
        //                     </div>

        //                     <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        //                     <div class = "grid grid-cols-2 gap-16">
        //                         <span class = "underline italic">Total Price</span>
        //                         <span>${item.utilityCredit - item.discount}</span>
        //                     </div>
                            
        //                     <br></br>
                            
        //                     <form>
        //                         <label for="email">Email: </label>
        //                         <input type = "text" id = "email" class = "inputBox" placeholder = "MyEmail@gmail.com"></input>
        //                         <br></br>
        //                         <label for="msg">Message to the Seller: </label>
        //                         <br></br>
        //                         <input type = "text" id = "msg" class = "inputBox" placeholder = "Hello!"></input><br></br>
                                
        //                         <div class = "pb-8">
        //                             <input type = "submit" value = "Send Offer" class="button3"></input>
        //                         </div>
        //                     </form>

        //                 </div> 
        //             </div>   
        //         ))}
        //     </div>
        // </div>

//         </div>
        
//      );
// }
 
// const data = [
//     {
//         name: "Alessandra",
//         municipality: "Cambridge",
//         date: "Feb 9, 2023 at 10:30pm",
//         utilityCredit: "200",
//         askingPrice: "$90",
//         provider: "Eversource",

//         discount: "120",
//     },

//     {
//         name: "Michael",
//         municipality: "Andover",
//         date: "Feb 9, 2023 at 10:30pm",
//         utilityCredit: "200",
//         askingPrice: "$90",
//         provider: "National Grid",
//         discount: "120",
//     },

//     {
//         name: "Geneva",
//         municipality: "Easton",
//         date: "Feb 9, 2023 at 10:30pm",
//         utilityCredit: "200",
//         askingPrice: "$90",
//         provider: "Eversource",
//         discount: "120",
//     }
// ]

// export default SellerListing;