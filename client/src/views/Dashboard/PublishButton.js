import axios from "axios";
import { useNavigate} from "react-router-dom";

const PublishButton = ({ listing, setListingStatus }) => {
  const navigate = useNavigate();

  const onPublish = async () => {
    try {
      await axios.put(`/energy-listings/${ listing._id }`, { isActive: true });
      setListingStatus('ACTIVE');
    } catch (error) {
      navigate('/error');
      console.log('Error publishing offer: ', error);
    }
  }

  return ( 
    <button onClick={ onPublish }
            className="w-full bg-rose-light hover:bg-rose-dark text-white text-md p-4 rounded-lg">
      Publish Listing
    </button>
  );
}
 
export default PublishButton;