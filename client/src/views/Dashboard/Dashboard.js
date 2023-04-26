import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import Offers from "./Offers";
import EnergyListing from "./EnergyListing";
import PublishListing from "./PublishListing";
import NoListingBlurb from "./NoListingBlurb";
import ImpactBoxes from '../../components/ImpactBoxes';

const Dashboard = ({ authID, listing, setListing, listingStatus, setListingStatus }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [offers, setOffers] = useState(false);

  // Fetch user's information and their energy listing
  useEffect(() => {
    async function fetchInfo() {
      try {
        // Get seller info
        const resUser = await axios.get(`/sellers/${ authID }`);
        setUser(resUser.data);

        // Get seller's energy listing if they have one
        if (resUser.data.hasOwnProperty('listingID')) {
          const resListing = (await axios.get(`/energy-listings/${ resUser.data.listingID }`));
          setListing(resListing.data);
          resListing.data.isActive ? setListingStatus("ACTIVE") : setListingStatus("INACTIVE");
        } else {
          setListingStatus("NONE");
        }

        // Get seller's offers
        const resOffers = await axios.get(`/sellers/${ authID }/offers/`);
        setOffers(resOffers.data)

      } catch (error) {
        console.log('Error fetching user information: ', error);
        navigate('/error');
      }
    }
    fetchInfo();
  }, [authID, navigate, setListing, setListingStatus])

  // Wait for user data to be fetched before rendering page
  if (!user || !listingStatus || !offers) {
    return <></>
  }
  
  return ( 
    <div className="flex lg:flex-row lg:justify-center lg:items-start lg:space-x-16 flex-col items-center space-y-16">
      <div className="my-16 w-3/4 lg:w-2/5 flex flex-col space-y-8">
        { (listingStatus === "INACTIVE") && <PublishListing /> }
        <Offers offers={ offers } setOffers={ setOffers } authID={ authID } />
        { (listingStatus === "ACTIVE") && <EnergyListing /> }
      </div>
      <div className="my-16 w-3/4 lg:w-1/4">
        { (listingStatus === "NONE") && <NoListingBlurb /> }
        { (listingStatus !== "NONE") && <ImpactBoxes listing={ listing } /> }
      </div>
      
    </div>
   );
}
 
export default Dashboard;
