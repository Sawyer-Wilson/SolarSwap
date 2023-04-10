
import React, { useState } from 'react'
import axios from 'axios';


const Filter = ({ listings, setFilteredEntries }) => {
    const[loadZoneID, setLoadZoneID] = React.useState('before');
    const[utilityCompany, setUtilityCompany] = React.useState('before');


    const handleSearchChange = (e) => {
        e.preventDefault()
        console.log('hi')
        // console.log(e.utilityCompany)
        console.log(loadZoneID)
        console.log(utilityCompany)
        console.log('after e.target.value')
        
        // if (!e.target.value) return setFilteredEntries(listings)


        const resultsArray = listings
        .filter(x => x.loadZoneID == (loadZoneID == '' ? x.loadZoneID : loadZoneID))
        .filter(y => y.utilityCompany == (utilityCompany == '' ? y.utilityCompany : utilityCompany));
        setFilteredEntries(resultsArray);
    }

    return (
        <div className = "filter">
            <div className="search-header" class = "max-w-sm bg-white rounded overflow-hidden shadow-lg w-[404px] h-[277px] pl-5 pr-5">
                <div className="search-text" class = "text-xl pb-2 pt-4 pl-5">01. MUNICIPALITY:</div>
                <input id="search-box" class = "inputBox mb-5" placeholder="Abington" onChange={(e) => {setLoadZoneID(e.target.value)}}/>

                <div className="search-text" class = "text-xl pb-2 pl-5">02. UTILITY PROVIDER:</div>
                <input id="search-box" class = "inputBox" placeholder="Eversource" onChange={(e) => {setUtilityCompany(e.target.value)}}/>

                <button onClick={handleSearchChange} class = "button3 mt-5" >View Offers</button>
            </div>
        </div>
                

    )


}


export default Filter;

// const Filter = () => {
//     const[unfilteredList, setList] = useState(null);
//     const[filteredList, setFilteredList] = useState(unfilteredList);
//     const[municipality, setMunicipality] = React.useState('');
//     const[provider, setProvider] = React.useState('');

//     // const[selected, setSelected] = useState(null)

//     //     const toggle = (i) => {
//     //     if(selected === i) {
//     //         return setSelected(null)
//     //     }

//     //     setSelected(i)
//     // }


//     const fetchData = (event) => {
//         // Prevent submit button from refreshing the page
//         event.preventDefault();
    
//         // Call auth login endpoint to log user in
//         try {
//           const response = axios.get('/energy-listings');
    
//           if (response.status === 200) {
//             setList(response.data)
//             console.log(unfilteredList)
//           }
//         } catch (error) {
//           if (error.response.status === 401) {
//             console.log('Error retrieving from db', error)
//         }
//         // Clear data from form input fields
//         // reset();
//       }

//     }

    


//     // const handleLogin = async (data, event) => {
//     //     // Prevent submit button from refreshing the page
//     //     event.preventDefault();
    
//     //     // Call auth login endpoint to log user in
//     //     try {
//     //       const response = await axios.post('/auth/login', data);
    
//     //       if (response.status === 200) {
//     //         setAuthID(response.data);
//     //         navigate('/dashboard');
//     //       }
//     //     } catch (error) {
//     //       if (error.response.status === 401) {
//     //         // Display login error message
//     //         setInvalidCreds(true);
//     //       } else {
//     //         console.log('Login error: ', error)
//     //         navigate('/error');
//     //       }
//     //     }
    
//     //     // Clear data from form input fields
//     //     reset();
//     //   }



//     const filterBySearch = (event) => {
//         // Access input value
//         const query = event.target.value;
//         // Create copy of item list
//         var updatedList = [...unfilteredList];
//         // Include all elements which includes the search query
//         updatedList = updatedList
//         .filter(x => x.municipality == (municipality == '' ? x.municipality : municipality))
//         .filter(y => y.provider == (provider == '' ? y.provider : provider));
//         // Trigger render with updated values
//         setFilteredList(fetchData(updatedList));
//     };

//     return (
//         <div>
        // <div className = "filter">
        //     <div className="search-header" class = "max-w-sm bg-white rounded overflow-hidden shadow-lg w-[404px] h-[277px] pl-5 pr-5">
        //         <div className="search-text" class = "text-xl pb-2 pt-4 pl-5">01. MUNICIPALITY:</div>
        //         <input id="search-box" class = "inputBox mb-5" placeholder="Abington" onChange={(e) => setMunicipality(e.target.value)}/>

        //         <div className="search-text" class = "text-xl pb-2 pl-5">02. UTILITY PROVIDER:</div>
        //         <input id="search-box" class = "inputBox" placeholder="Eversource" onChange={(e) => setProvider(e.target.value)}/>

        //         <button onClick={filterBySearch} class = "button3 mt-5" >View Offers</button>
        //     </div>
                
           
//         </div>

//          {/* <div id="item-list">
//                 {filteredList.map((item, index) => (
//                     <li key={index}>{item.municipality}: {item.provider}</li>
//             ))}
//         </div> */}

//         {/* </div> */}






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

// export default Filter;






{/* <div className = "wrapper">
            <div className = "accordian">

                {filteredList.map((item,i) => (
                    
                    <div className = "item">
                        <div className = "title" onClick={() => toggle(i)}>
                            <div class = "grid grid-cols-2 gap-2">
                                
                                <div>
                                    <h2 class = "text-xl pb-2">{item.sellerID}</h2>
                                    <p class = "text-[#717171] text-xs">{item.sellerID}</p>
                                </div>

                                <div>
                                    <span class = "text-base">monthly utility credit: </span>
                                    <span class = "inline line-through text-xl">${item.avgMonthlyOverage * item.pctOverageToSell}</span><br></br>
                                    <span class = "text-base ml-16">asking price: </span>
                                    <span class = "inline text-xl">{item.askingRate * (item.avgMonthlyOverage * item.pctOverageToSell)}</span>
                                </div>
                            </div>
                            
                            <span>{selected === i ? 'v' : '>'}</span>
                        </div> 
                        <br></br>
                        <div className = {selected === i ? 'content show' : 'content'}>
                            <div class = "grid grid-cols-2 gap-16 pt-3">
                                <span>Utility Provider:</span>
                                <span>{item.utilityCompany}</span>
                            </div>

                            <div class = "grid grid-cols-2 gap-16 pt-3">
                                <span class = "underline">Monthly Utility Credit:  </span>
                                <span>${item.avgMonthlyOverage * item.pctOverageToSell}</span>
                            </div>

                            <div class = "grid grid-cols-2 gap-16 pt-3">
                                <span class = "underline">Proposed Discount:</span>
                                <span class = "text-[#4BB038]">-${100 - item.askingRate}</span>
                            </div>

                            <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                            <div class = "grid grid-cols-2 gap-16">
                                <span class = "underline italic">Total Price</span>
                                <span>${(item.avgMonthlyOverage * item.pctOverageToSell) * item.askingRate}</span>
                            </div>
                            
                            <br></br>
                            
                            <form>
                                <label for="email">Email: </label>
                                <input type = "text" id = "email" class = "inputBox" placeholder = "MyEmail@gmail.com"></input>
                                <br></br>
                                <label for="msg">Message to the Seller: </label>
                                <br></br>
                                <input type = "text" id = "msg" class = "inputBox" placeholder = "Hello!"></input><br></br>
                                
                                <div class = "pb-8">
                                    <input type = "submit" value = "Send Offer" class="button3"></input>
                                </div>
                            </form>

                        </div> 
                    </div>   
                ))}
            </div> */}