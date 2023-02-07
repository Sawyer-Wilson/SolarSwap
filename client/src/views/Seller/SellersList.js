import { useState, useEffect } from "react";
import axios from 'axios';

const SellersList = () => {

  const [sellers, setSellers] = useState([])

  useEffect(() => {
    const fetchSellers = async () => {
      const result = await axios.get('/sellers/');
      setSellers(result.data);
    }
    fetchSellers();
  }, []);

  return (
    <div className="sellersList">
      <h2>List of Current Sellers:</h2>
      <section>
        { sellers.map((seller, idx) => (
            <div key={idx}>
              <p>First Name: { seller.firstName }</p>
              <p>Last Name: { seller.lastName }</p>
              <p>Email: { seller.email }</p>
            </div>
        )) }
      </section>
    </div>
  );
}
 
export default SellersList;