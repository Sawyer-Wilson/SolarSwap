import { Link } from "react-router-dom";

const NoListingBlurb = () => {
  return ( 
    <div className="flex flex-col space-y-8">
      <p className="font-bold text-4xl tracking-wider	leading-normal text-gray-800">
        Don't Get Stuck With Utility Credit. Convert To Cash.
      </p>
      <Link 
        to='/calc-earnings/'
        className='text-center p-4 bg-rose-light text-white hover:bg-rose-dark hover:text-grey-300 rounded-lg text-md font-medium'>
        Create Listing
      </Link>
    </div>
  );
}
 
export default NoListingBlurb;