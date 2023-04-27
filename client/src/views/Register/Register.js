import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountForm from '@components/AccountForm';

const Register = ({ setAuthID }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Called when registration form gets submitted
  const handleRegistration = async (data, event) => {
    // Prevent submit button from refreshing the page
    event.preventDefault();

    let userID;
    try {
      // Register user
      userID = (await axios.post('/auth/register', data)).data;

      // If user came from Calc Earnings page...
      if (location.state && location.state.listing) {
        try {
          // Save energy listing to DB
          const res = await axios.post('/energy-listings/', 
                                       { sellerID: userID, 
                                         sellerFirstName: data.firstName,
                                         ...location.state.listing });

          // Set Energy Listing ID of Seller Document
          await axios.put(`/sellers/${ userID }`, { listingID: res.data._id });
        } catch (error) {
          console.log('Error Saving Energy Listing: ', error)
          navigate('/error');
        }
      }
    } catch (error) {
      console.log('Login error: ', error)
      navigate('/error');
    }

    // Log user in and redirect them to their dashboard
    setAuthID(userID);
    navigate('/dashboard');
  }

  return (
    <AccountForm onSubmit={ handleRegistration } submitText={ "Register" }
                 isEdit={ false }/>
  )
}

export default Register