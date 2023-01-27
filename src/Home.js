import { useState } from 'react';
import UserList from './UserList';

const  Home = () => {

    const [name, setName] = useState('mario')
    const [users, setUsers] = useState([
        { name: 'Dan', energyConsump: 10, energyProduct: 20, id: 1},
        { name: 'Sarah', energyConsump: 5, energyProduct: 10, id: 2}
    ])

    const handleClick = (name) => {
        console.log('hello ' + name)
        setName('luigi')
    }

    return ( 
        <div className="Home">
            <h1>Home</h1>
            <p> {name} </p>
            <button onClick={() => handleClick('grace')}>Click me</button>
            <UserList users = {users} title='List of Sellers'/>
        </div>
     );
}
 
export default Home; 