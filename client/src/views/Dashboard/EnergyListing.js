import ListingForm from "@components/ListingForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EnergyListing = ({ listing, setListing, isEditing, setIsEditing }) => {
  const navigate = useNavigate();

  const onSave = async () => {
    try {
      await axios.put(`/energy-listings/${ listing._id }`, listing);
      setIsEditing(false);
    } catch (error) {
      navigate('/error');
      console.log('Error updating offer: ', error);
    }
  }

  return ( 
    <ListingForm defaultValues={ listing } onSubmit={ onSave }
                 listing={ listing } setListing={ setListing } 
                  isEditing={ isEditing } setIsEditing={ setIsEditing }/>
  );
}
 
export default EnergyListing;