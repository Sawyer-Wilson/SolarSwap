import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";

const Dashboard = ({ authID }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  // Fetch user's information
  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/sellers/${ authID }`);
      if (response.status === 200) {
        setUser(response.data);
      } else {
        navigate('/error');
        console.log('Error fetching user information: ', response);
      }
    }
    fetchUser();
  }, [authID, navigate])

    // Wait for user data to be fetched before rendering page
  if (!user) {
    return <></>
  }
  
  return ( 
    <>
      <h1>Seller Dashboard</h1>

      {/* Display user information - TODO: delete this and add real components */}
      <p>{ user._id }</p>
      <p>{ user.firstName }</p>
      <p>{ user.lastName }</p>
      <p>{ user.email }</p>
    </>
   );
}
 
export default Dashboard;
