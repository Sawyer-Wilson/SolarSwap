import axios from 'axios';
import {useState, useEffect} from 'react';

const Dashboard = ({ authID }) => {
  const [user, setUser] = useState(false);

  // Fetch user's information
  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/sellers/${ authID }`);
      if (response.status === 200) {
        setUser(response.data);
      } else {
        // TODO: redirect to error page
        console.log(response)
      }
    }
    fetchUser();
  }, [authID])

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
