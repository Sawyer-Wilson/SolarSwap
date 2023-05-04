import Listing from "./Listing";
import Alert from "@components/Alert";
import { useState } from "react";

const Listings = ({ listings }) => {
  const [showAlert, setShowAlert] = useState(false);

  return ( 
    <div className='flex flex-col space-y-2'>
      {/* No available listings message */}
      { (listings.length === 0) && <div className="text-2xl text-gray-700">
        No Available Listings
      </div> }

      {/* Offer sent alert */}
      { showAlert && <Alert message="Offer Sent!" showAlert={ showAlert }
                            setShowAlert={ setShowAlert } /> }

      {/* Display listings */}
      { listings.map((listing) => {
        return (
          <div key={ listing._id }>
            <Listing listing={ listing } setShowAlert={ setShowAlert } />
          </div>
        )
      }) }
    </div>
  );
}
 
export default Listings;