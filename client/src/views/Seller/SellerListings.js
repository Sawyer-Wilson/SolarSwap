import React, {useEffect, useState} from 'react';

function SellerListings(){
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/listings/list_sellers');
        const items = await data.json();
        setItems(items);
    };

    return(
        <section>
        {
            items.map((item, idx) => (
                <div key={idx}>
                    <p>{item.name}</p>
                    <p>{item.energy}</p>
                </div>
            ))
        }
        </section>
    );
}

export default SellerListings