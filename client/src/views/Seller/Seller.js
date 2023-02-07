import SellerListings from './SellerListings'
import Signup from './Signup';
import SellersList from './SellersList';

const Seller = () => {
  return ( 
    <div className="seller">
      <h1>Seller Page</h1>
        <Signup></Signup>
        <SellerListings></SellerListings>
        <SellersList></SellersList>
    </div>
   );
}

export default Seller;
