import { useForm } from "react-hook-form";
import { municipalities } from "../../components/municipalities";
import { utilityProviders } from "../../components/utilityProviders";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Filter = ({ setListings }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // Extracts energy listings of given municipality and utility provider from array
  const filterListings = (listings, municipality, utilityProvider) => {
    if (municipality && utilityProvider) {
      return listings.filter(listing => listing.municipality === municipality &&
                             listing.utilityProvider === utilityProvider);
    } else if (municipality) {
      return listings.filter(listing => listing.municipality === municipality);
    } else if (utilityProvider) {
      return listings.filter(listing => listing.utilityProvider === utilityProvider);
    } else {
      return listings
    }
  }

  // Called when filter form gets submitted -> updates displayed listing
  const onFilter = async (data, event) => {
    // Prevent submit button from refreshing the page
    event.preventDefault();

    try {
      const response = await axios.get(`/energy-listings/`);
      setListings(filterListings(response.data, data.municipality, data.utilityProvider));
    } catch (error) {
      console.log('Error fetching energy listings: ', error);
      navigate('/error');
    }
  }

  return ( 
    <form onSubmit={ handleSubmit(onFilter) }>
      <div className="flex flex-col space-y-4 rounded-lg p-4 border shadow-lg">

        {/* Municipality */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="municipality"
                className="text-xl tracking-wide pl-2">
            Municipality: 
          </label> 
          <select id="municipality" name="municipality" 
                  className="appearance-none border border-gray-400 hover:border-gray-500 rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none"
                  {...register('municipality')}>
            { municipalities.map((municipality) => {
              return (
                <option value={ municipality.value }
                        key={ municipality.value }>
                  { municipality.label }
                </option>
              )
            }) }
          </select>
        </div>

        {/* Utility Provider */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="utility-provider"
                className="text-xl tracking-wide pl-2">
            Utility Provider: 
          </label>
          <select id="utility-provider" name="utilityProvider" 
                  className="appearance-none border border-gray-400 hover:border-gray-500 rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none"
                  {...register('utilityProvider')}>
            { utilityProviders.map((utilityProvider) => {
              return (
                <option value={ utilityProvider.value } 
                        key={ utilityProvider.value }>
                  { utilityProvider.label }
                </option>
              )
            }) }
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit"
                className="bg-rose-light hover:bg-rose-dark text-white py-3 px-4 rounded-lg">
          Filter Results
        </button>
      </div>
    </form>
  );
}
 
export default Filter;