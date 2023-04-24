import { Link } from "react-router-dom";

const Home = () => {
  return ( 
    <div
    className="bg-auto bg-left min-h-screen"
    style={{backgroundImage: `url("https://www.eagleview.com/wp-content/uploads/2022/01/solar-roof.jpg")`}}
    >

      <div>
        <div className="flex flex-row lg:flex-row">
          <div className="mb-5 p-12 basis-1/1 lg:basis-3/4 lg-items-start">
            <p className="text-6xl text-black font-bold text-gray-800">We make it easy for people who own solar systems to  sell their excess credits  to those who don't</p>
          </div>
        </div> 
      </div>

      <div className="flex lg:flex-row lg:justify-around lg:items-start flex-col items-center">

        <div className="m-12 w-3/4 lg:w-1/8 p-4 border-3 border-rose-600 shadow-2xl rounded-xl backdrop-blur-xl backdrop-contrast-150 bg-white/30">

          <div className="my-3 px-4">
            <Link to='/i-want-solar' 
              className="flex justify-center bg-red-light hover:bg-red-dark text-white font-bold p-4 rounded-lg focus:outline-none focus:shadow-outline text-2xl">
              I don't have a Solar System
            </Link>
          </div>

          <div className="p-4 pl-9">
            <ul className="list-disc">
              <li className="text-justify text-xl text-gray-600 font-semibold">
              Buy solar credits at a discounted rate and save money on your utility bill!
              </li>
            </ul>
          </div>

        </div>


        <div className="m-12 w-3/4 lg:w-1/8 p-4 border-3 border-rose-600 shadow-2xl rounded-xl backdrop-blur-2xl backdrop-contrast-150 bg-white/30">

          <div className="my-3 px-4">
            <Link to='/i-have-solar' 
              className="flex justify-center bg-red-light hover:bg-red-dark text-white font-bold w-full p-4 rounded-lg focus:outline-none focus:shadow-outline text-2xl">
              I have a Solar System
            </Link>
          </div>

          <div className="p-4 pl-9">
            <ul className="list-disc">
              <li className="text-justify text-xl text-gray-600 font-semibold">
                Sell your excess solar electricity and convert your utility bill to cash!
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
   );
}
 
export default Home;
