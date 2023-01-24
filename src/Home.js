const  Home = () => {

    const handleClick = (name) => {
        console.log('hello ' + name)
    }

    return ( 
        <div className="Home">
            <h1>Home</h1>
            <button onClick={() => handleClick('grace')}>Click me</button>
        </div>
     );
}
 
export default Home;