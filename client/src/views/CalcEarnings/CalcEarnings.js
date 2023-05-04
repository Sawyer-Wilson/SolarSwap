import ListingForm from "../../components/ListingForm";
import ImpactBoxes from "../../components/ImpactBoxes";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const CalcEarnings = ({ authID }) => {
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

    // If user IS logged in -> save their listing info to DB
    if (authID) {
      // Get seller's first name 
      let firstName;
      try {
        const res = await axios.get(`/sellers/${ authID }`);
        firstName = res.data.firstName;
      } catch (error) {
        console.log('Error Retrieving User Info: ', error)
        navigate('/error');
      }

      try {
        // Save energy listing to DB
        const res = await axios.post('/energy-listings/', 
                                     { sellerID: authID, 
                                       sellerFirstName: firstName, 
                                       ...data });

        // Set Energy Listing ID of Seller Document
        await axios.put(`/sellers/${ authID }`, { listingID: res.data._id });

        // Redirect to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.log('Error Saving Energy Listing: ', error)
        navigate('/error');
      }
    }
    // If user is NOT logged in -> redirect to register page
    else {
      navigate('/register', { state: { listing: listing }})
    }
  }

  return ( 
    <div className="flex lg:flex-row lg:justify-center lg:items-start flex-col items-center">
      <div className="m-8 w-3/4 lg:w-2/5">
        <ListingForm onSubmit={ handleSaveInfo } isEditing={ true } 
                     listing={ listing } setListing={ setListing } />
      </div>
      <div className="m-8 w-3/4 lg:w-1/4">
        <ImpactBoxes listing={ listing } />
      </div>
    </div>
  );
}
 
export default CalcEarnings;