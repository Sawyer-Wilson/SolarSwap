const UserList= ({users, title}) => {
    // const users = props.users
    // const title = props.title
    
    return ( 
        <div className="user-list">
            <h2> {title} </h2>
            {users.map((user) => (
                <div className="user-preview" key={user.id}>
                    <h2> {user.name}</h2>
                    <p> Energy Consumption {user.energyConsump}</p>
                </div>
            ))}
        </div>
     );
}
 
export default UserList;