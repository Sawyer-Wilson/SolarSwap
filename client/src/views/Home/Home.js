import { Link } from "react-router-dom";

const Home = () => {
  return ( 
    <div className="bg-auto bg-left min-h-screen bg-[url('./views/Home/background-image.png')]">

      {/* Page Title */}
      <div className="mb-5 p-12 lg:w-3/4">
        <p className="text-6xl font-bold text-gray-800">
          We make it easy for people who own solar systems to  sell their excess credits  to those who don't
        </p>
      </div>

      <div className="flex lg:flex-row lg:justify-around lg:items-start flex-col items-center">

        {/* I don't have solar box */}
        <div className="m-12 w-3/4 lg:w-1/8 p-4 rounded-xl backdrop-blur-xl backdrop-contrast-150 bg-white/30">
          <div className="my-3 px-4">
            <Link to='/i-want-solar' 
                  className="flex justify-center bg-red-light hover:bg-red-dark text-white font-bold p-4 rounded-lg text-2xl">
              I don't have a Solar System
            </Link>
          </div>

          <div className="p-4">
            <p className="text-justify text-xl text-gray-600 font-semibold">
              Buy solar credits at a discounted rate and save money on your utility bill!
            </p>
          </div>
        </div>

        {/* I have solar box */}
        <div className="m-12 w-3/4 lg:w-1/8 p-4 rounded-xl backdrop-blur-2xl backdrop-contrast-150 bg-white/30">
          <div className="my-3 px-4">
            <Link to='/i-have-solar' 
              className="flex justify-center bg-red-light hover:bg-red-dark text-white font-bold w-full p-4 rounded-lg text-2xl">
              I have a Solar System
            </Link>
          </div>

          <div className="p-4">
            <p className="text-justify text-xl text-gray-600 font-semibold">
              Sell your excess solar electricity and convert your utility bill to cash!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Home;
