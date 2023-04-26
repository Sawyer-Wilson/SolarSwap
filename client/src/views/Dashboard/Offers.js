import { formatDate } from "@utils/utils";
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import axios from "axios";
import { useNavigate} from "react-router-dom";

const Offers = ({ offers, setOffers, authID }) => {
  const navigate = useNavigate();

  const onDeleteOffer = async (offer) => {
    try {
      await axios.delete(`/sellers/${ authID }/offers/${ offer._id }`);
      setOffers(offers.filter((currOffer) => { 
        return currOffer._id !== offer._id; 
      }))
    } catch (error) {
      navigate('/error');
      console.log('Error deleting offer: ', error);
    }
  }

  const onEmail = (email) => {
    window.open(`mailto:${ email }`);
  }

  return ( 
    <div className="flex flex-col space-y-5">
      {/* Title */}
      <p className="text-3xl text-gray-800">LATEST OFFERS</p>
      <span className="h-0.5 w-full bg-gray-600"></span>

      {/* User has no offers */}
      { (offers.length === 0) && <div className="text-2xl text-gray-700">
        No Current Offers
      </div> }

      {/* User has offers */}
      { (offers.length > 0) && offers.map((offer) => {
        return (
          <div key={ offer._id } className="flex flex-col space-y-5">
            <Disclosure>
              {({ open }) => (
                <>
                  {/* Offer Preview */}
                  <Disclosure.Button>
                    <div className="mx-4 flex justify-between">
                      <div className="flex flex-col items-left space-y-0.5">
                        <p className="text-3xl text-gray-700">
                          { offer.email }
                        </p>
                        <p className="text-left text-xs text-gray-600">
                          { formatDate(offer.createdAt) }
                        </p>
                      </div>
                      <div className="flex space-x-12">
                        <div className="flex items-center">
                          <p className="text-3xl text-gray-700">
                            { "$" + offer.amount }
                          </p>
                        </div>
                        <div className="flex items-center">
                          <ChevronRightIcon fill="hsl(0, 0%, 25%)" 
                                            className={ `${ open ? 'rotate-90 transform' : '' } h-6` }/>
                        </div>
                      </div>
                    </div>
                  </Disclosure.Button>

                  {/* Offer Dropdown */}
                  <Disclosure.Panel>
                    <div className="mx-4 p-4 bg-gray-200 rounded-lg flex flex-col space-y-4">
                      <p className="text-md text-gray-800">
                        { offer.message }
                      </p>
                      <div className="flex space-x-2">
                        <button onClick={ () => onEmail(offer.email) }
                                className="w-1/2 bg-blue-light hover:bg-blue-dark text-white text-md p-3 rounded-lg">
                          Respond by Email
                        </button>
                        <button onClick={ () => onDeleteOffer(offer) }
                                className="w-1/2 bg-rose-light hover:bg-rose-dark text-white text-md p-3 rounded-lg">
                          Delete Offer
                        </button>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <span className="h-0.5 w-full bg-gray-300"></span>
          </div>
        )
      }) }
    </div>
  );
}
 
export default Offers;