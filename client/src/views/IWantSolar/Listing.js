import { useForm } from "react-hook-form";
import { formatDate } from "@utils/utils";
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Listing = ({ listing, setShowAlert }) => {
  const navigate = useNavigate();

  // Calculate monthly utility credit and asking price
  const credit = listing.avgMonthlyOverage * ( listing.pctOverageToSell / 100 );
  const askingPrice = credit * ( listing.askingRate / 100 );
  const calcDiscount = (price) => {
    if (price) {
      return credit - price;
    } else {
      return credit - askingPrice;
    }
  }

  // Setup form
  const { register, handleSubmit, watch, reset, formState: {errors} } = useForm({
    mode: "onChange",
    defaultValues: { offerPrice: askingPrice }
  });
  const watchOfferPrice = watch("offerPrice");

  // Validation config for input fields
  const validation = {
    offerPrice: { 
      required: "Required Field",
      min: {
        value: 1,
        message: "Invalid Offer"
      },
      max: {
        value: askingPrice,
        message: "Cannot offer more than the asking price"
      },
      pattern: {
        value: /^[0-9]*$/,
        message: "Invalid number"
      }
    },
    email: { required: "Email address is required" },
    message: { required: "Message is required" }
  }

  // Called when user submits an offer
  const onSendOffer = (data, event) => {
    // Prevent submit button from refreshing the page
    event.preventDefault();
    
    // Clear form
    reset();

    // Save offer in database
    try {
      axios.post(`/sellers/${ listing.sellerID }/offers/`, { ...data, amount: data.offerPrice });
      setShowAlert(true);
    } catch (error) {
      navigate('/error');
      console.log('Error deleting offer: ', error);
    }
  }

  return (
    <Disclosure>{ ({ open }) => (
      <div className='flex flex-col space-y-4 border rounded-lg shadow-lg p-4'>

        {/* Listing Preview */}
        <Disclosure.Button>
          <div className='flex justify-between'>

            {/* Name and date */}
            <div className='flex flex-col space-y-2 items-start'>
              <p className="text-2xl text-gray-800">
                { listing.sellerFirstName }
              </p>
              <p className="text-xs text-gray-600">
                { formatDate(listing.createdAt) }
              </p>
            </div>

            <div className="flex space-x-6">
              {/* Prices */}
              <div className="flex space-x-2">
                <div className="flex flex-col justify-around items-end text-gray-800">
                  <p>monthly utility credit: </p>
                  <p>asking price: </p>
                </div>
                <div className="flex flex-col justify-around items-start text-xl">
                  <p className="line-through decoration-1">
                    { `$${ credit }` }
                  </p>
                  <p>
                    { `$${ askingPrice }` }
                  </p>
                </div>
              </div>

              {/* Dropdown Icon */}
              <div className="flex items-center">
                <ChevronRightIcon fill="hsl(0, 0%, 25%)" 
                                  className={ `${ open ? 'rotate-90 transform' : '' } h-6` }/>
              </div>
            </div>
          </div>
        </Disclosure.Button>

        {/* Listing Dropdown */}
        <Disclosure.Panel>
          <form onSubmit={ handleSubmit(onSendOffer) }>
            <div className="flex flex-col items-center space-y-4">
              <span className="h-0.5 w-full bg-gray-300"></span>
              <div className="flex flex-col space-y-2 items-center w-full pb-2">

                {/* Price Calculation */}
                <div className="flex w-full justify-between px-12">
                  <div className="flex flex-col justify-around text-gray-800">
                    <p>Monthly Utility Credit:</p>
                    <p>Proposed Discount:</p>
                  </div>
                  <div className="flex flex-col justify-around items-end text-xl">
                    <p>
                      { `$${ credit }` }
                    </p>
                    <p className="text-green-600">
                      { `-$${ calcDiscount(errors?.offerPrice ? false : watchOfferPrice) }` }
                    </p>
                  </div>
                </div>
                <div className="h-px w-full px-12">
                  <div className="h-px w-full bg-gray-300"></div>
                </div>
                <div className="flex justify-between w-full pl-12 pr-11">
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-800">
                      Offer Price:
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    { errors?.offerPrice &&
                      <div className="flex flex-col justify-center px-2">
                        <p className="text-red-500 text-sm">
                          { errors.offerPrice.message }
                        </p>
                      </div>
                    }
                    <div className="flex flex-col justify-center">
                      <p className="text-lg">$</p>
                    </div>
                    <input className={`text-md w-[58px] border rounded-lg bg-gray-200 appearance-none py-1 px-3 focus:outline-none focus:bg-white focus:border-gray-500 ${ errors?.offerPrice ? "border-red-500" : "border-gray-200" }`}
                          {...register('offerPrice', validation.offerPrice)}
                          placeholder="0.00"
                          type="text" id="offerPrice" name="offerPrice"/>
                  </div>
                </div>

                {/* Send an offer form */}
                <div className="flex w-full px-12 pt-2 space-x-2">
                  <div className="flex flex-col justify-center">
                    <label htmlFor="email"
                           className="tracking-wide text-gray-700 text-md font-bold">
                      Email: 
                    </label>
                  </div>
                  <div className="flex flex-col justify-center w-full">
                    <input type="email" id="email" name="email" 
                          placeholder="jane@gmail.com"
                          {...register('email', validation.email)}
                          className={`text-md appearance-none w-full bg-gray-200 text-gray-700 border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors?.email ? " border-red-500" : "border-gray-200"}`}/>
                  </div>
                  { errors?.email && 
                    <small className="text-red-500">
                      { errors.email.message }
                    </small>
                  }
                </div>
                <div className="flex flex-col w-full px-12 pt-2 space-y-2">
                  <div className="flex flex-col justify-center">
                    <label htmlFor="message"
                           className="tracking-wide text-gray-700 text-md font-bold">
                      Message the Seller: 
                    </label>
                  </div>
                  <div className="flex flex-col justify-center w-full">
                    <textarea type="message" id="message" name="message" 
                          placeholder="Hello!"
                          {...register('message', validation.message)}
                          className={`text-md appearance-none w-full bg-gray-200 text-gray-700 border rounded-lg py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors?.message ? " border-red-500" : "border-gray-200"}`}/>
                  </div>
                  { errors?.message && 
                    <small className="text-red-500">
                      { errors.message.message }
                    </small>
                  }
                </div>
                <div className="w-full px-12">
                  <button type="submit"
                          className="bg-rose-light hover:bg-rose-dark text-white py-3 px-4 rounded-lg w-full">
                    Send Offer
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Disclosure.Panel>
      </div>
    ) }</Disclosure>
  )
}
 
export default Listing;