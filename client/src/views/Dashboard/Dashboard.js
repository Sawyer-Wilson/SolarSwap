import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";

const Dashboard = ({ authID }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [listing, setListing] = useState(false);
  const [hasListing, setHasListing] = useState(false);

  // Fetch user's information and their energy listing
  useEffect(() => {
    async function fetchInfo() {
      try {
        // Get seller info
        const resUser = (await axios.get(`/sellers/${ authID }`));
        setUser(resUser.data);

        // Get seller's energy listing if they have one
        if (resUser.data.hasOwnProperty('listingID')) {
          const resListing = (await axios.get(`/energy-listings/${ resUser.data.listingID }`));
          setListing(resListing.data);
          setHasListing(true);
        }
      } catch (error) {
        console.log('Error fetching user information: ', error);
        navigate('/error');
      }
    }
    fetchInfo();
  }, [authID, navigate])

  // Wait for user data to be fetched before rendering page
  if (!user || (hasListing && !listing)) {
    return <></>
  }
  
  return ( 
    <>
      <h1>Seller Dashboard</h1>
    </>
   );
}
 
export default Dashboard;
