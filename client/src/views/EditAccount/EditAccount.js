import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountForm from '@components/AccountForm';

const EditAccount = ({ authID }) => {
  const navigate = useNavigate();

  // Called when edit account info form gets submitted
  const handleUpdate = async (data, event) => {
    // Prevent submit button from refreshing the page
    event.preventDefault();

    try {
      await axios.put(`/sellers/${ authID }`, data);
    } catch (error) {
      console.log('Error Updating Account Info: ', error)
      navigate('/error');
    }

    // Redirect user back to their dashboard
    navigate('/dashboard');
  }

  // Get user into to initially display in form
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      const user = (await axios.get(`/sellers/${ authID }`)).data;
      setUser(user);
    }
    fetchUser();
  }, [authID])

  // Wait for user information to be fetched before rendering page
  if (user === null) {
    return <></>
  }

  return (
    <AccountForm onSubmit={ handleUpdate } submitText={ "Update Account" }
                 isEdit={ true } defaultValues={ user }/>
  )
}

export default EditAccount