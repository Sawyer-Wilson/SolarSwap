import SellerListings from '../../components/layouts/SellerListings'
import Signup from '../../components/layouts/Signup';

const Seller = () => {
  
  return ( 
    <div className="seller">
      <h1>Seller Page</h1>
        <Signup></Signup>
        <SellerListings></SellerListings>
    </div>
   );
}
 
export default Seller;
