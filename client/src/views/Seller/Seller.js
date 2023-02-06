// import SellerListings from '../../components/layouts/SellerListings'
import Signup from '../../components/layouts/Signup';
import { useState, useEffect } from "react";
import axios from 'axios';

const Seller = () => {

  const [sellers, setSellers] = useState([])

  useEffect(() => {
    const fetchSellers = async () => {
      const result = await axios.get('/sellers/');
      setSellers(result.data);
    }
    fetchSellers();
  }, []);

  return ( 
    <div className="seller">
      <h1>Seller Page</h1>
        <Signup></Signup>
        {/* <SellerListings></SellerListings> */}
      <h2>List of Current Sellers:</h2>
      <ul>
        { sellers.map((seller, idx) => {
          return (
            <div key={idx}>
              <li>First Name: { seller.firstName }</li>
              <li>Last Name: { seller.lastName }</li>
              <li>Email: { seller.email }</li>
            </div>
          )
        }) }
      </ul>
    </div>
   );
}
 
export default Seller;
