import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import Offers from "./Offers";
import EnergyListing from "./EnergyListing";
import PublishListing from "./PublishListing";
import NoListingBlurb from "./NoListingBlurb";
import ImpactBoxes from '../../components/ImpactBoxes';

const Dashboard = ({ authID }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  // eslint-disable-next-line
  const [listing, setListing] = useState(false);
  const [offers, setOffers] = useState(false);

  // Listing Status defines the current state of a users energy listing
  const ACTIVE = 1, INACTIVE = 2, NONE = 3;
  const [listingStatus, setListingStatus] = useState(false);

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
          resListing.data.isActive ? setListingStatus(ACTIVE) : setListingStatus(INACTIVE);
        } else {
          setListingStatus(NONE);
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
  }, [authID, navigate])

  // Wait for user data to be fetched before rendering page
  if (!user || !listingStatus || !offers) {
    return <></>
  }
  
  return ( 
    <div className="flex lg:flex-row lg:justify-center lg:items-start flex-col items-center">
      <div className="m-8 w-3/4 lg:w-2/5 flex flex-col space-y-8">
        { (listingStatus === INACTIVE) && <PublishListing /> }
        <Offers />
        { (listingStatus === ACTIVE) && <EnergyListing /> }
      </div>
      <div className="m-8 w-3/4 lg:w-1/4">
        { (listingStatus === NONE) && <NoListingBlurb /> }
        { (listingStatus !== NONE) && <ImpactBoxes listing={ listing } /> }
      </div>
      
    </div>
   );
}
 
export default Dashboard;
