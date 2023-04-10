import Listing from "../../components/Listing";
import Impact from "../../components/Impact";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const GetStarted = ({ authID }) => {
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    municipality: "",
    utilityProvider: "",
    avgMonthlyOverage: 0,
    pctOverageToSell: 0,
    askingRate: 0
  });

  // Called when form gets submitted
  const handleSaveInfo = async (data, event) => {
    // Prevent submit button from refreshing the page
    event.preventDefault();

    // Is user IS logged in -> save listing info and redirect to dashboard
    if (authID) {
      // TODO: Add listing to database
      navigate('/dashboard');
    } 
    // If user is NOT logged in -> redirect to register page with listing info
    else {
      navigate('/register', { state: {listing: listing}})
    }
  }

  return ( 
    <div className="flex lg:flex-row lg:justify-center lg:items-start flex-col items-center">
      <div className="m-8 w-3/4 lg:w-2/5">
        <Listing listing={ listing } setListing={ setListing } handleSaveInfo={ handleSaveInfo }/>
      </div>
      <div className="m-8 w-3/4 lg:w-1/4">
        <div className="flex lg:flex-col lg:space-y-8 lg:space-x-0 flex-row space-x-8">
          <Impact listing={ listing } />
        </div>
      </div>
    </div>
  );
}
 
export default GetStarted;