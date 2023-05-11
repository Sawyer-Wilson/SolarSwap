import { Link } from "react-router-dom";
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { CursorArrowRaysIcon } from '@heroicons/react/24/solid';
import { FaceSmileIcon } from '@heroicons/react/24/solid';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import moneyBag from './money-bag.png';
import electricityBill from './electricity-bill.png';

const IHaveSolar = () => {
  return ( 
    <>
      {/* FIRST BAND */}
      <div className="flex flex-col space-y-16 py-12 items-center bg-gray-300 bg-[url('./views/IHaveSolar/solar-panels.jpg')] bg-cover">
        {/* Page Title and Sub Tex */}
        <p className="text-6xl font-bold text-gray-800">
          Don't Get Stuck with Utility Credit.
        </p>

        {/* Get Started Link */}
        <Link to="/calc-earnings"
              className="w-1/4 bg-blue-light hover:bg-blue-dark text-white text-2xl font-bold p-4 rounded-lg text-center">
          Get Started
        </Link>
      </div>

      {/* SECOND BAND */}
      <div className="flex justify-evenly py-12 bg-gray-100">
        <div className="w-1/3 p-8 rounded-lg bg-gray-300 flex flex-col items-center space-y-6">
          <p className="text-3xl font-semibold text-gray-700">
            1. Generate Electricity
          </p>
          <img className="w-24" 
               src={ electricityBill } 
               alt="Electricity Bill"/>
          <p className="text-lg text-gray-700 text-justify">
            When you generate more electricity than you consume, you receive a 
            credit on your utility bill
          </p>
        </div>
        <ArrowLongRightIcon className="w-32" />
        <div className="w-1/3 p-8 rounded-lg bg-gray-300 flex flex-col items-center space-y-6">
          <p className="text-3xl font-semibold text-gray-700">
            2. Convert to Cash
          </p>
          <img className="w-24" 
               src={ moneyBag } 
               alt="Money Bag"/>
          <p className="text-lg text-gray-700 text-justify">
            SolarSwap provides you with the exclusive opportunity to convert 
            utility credits to cash by selling your energy to people who don't 
            have access to solar
          </p>
        </div>
      </div>

      {/* THIRD BAND */}
      <div className="flex flex-col space-y-16 py-12 bg-gray-200 pb-32">
        <p className="text-gray-800 text-5xl text-center">
          Getting Paid is Pretty Simple
        </p>
        <div className="flex justify-evenly">
          <div className="w-1/4 p-8 rounded-lg bg-gray-300 flex flex-col items-center space-y-6">
            <CursorArrowRaysIcon fill="hsl(0, 0%, 20%)" className="w-24" />
            <p className="text-4xl font-semibold text-gray-700">
              EASY
            </p>
            <p className="text-lg text-gray-700 text-justify">
              With just a few clicks, list your energy on the Solar Swap website
            </p>
          </div>
          <div className="w-1/4 p-8 rounded-lg bg-gray-300 flex flex-col items-center space-y-6">
            <FaceSmileIcon fill="hsl(0, 0%, 20%)" className="w-24" />
            <p className="text-4xl font-semibold text-gray-700">
              FLEXIBLE
            </p>
            <p className="text-lg text-gray-700 text-justify">
              Be in control for every step and cancel at any time
            </p>
          </div>
          <div className="w-1/4 p-8 rounded-lg bg-gray-300 flex flex-col items-center space-y-6">
            <ShieldCheckIcon fill="hsl(0, 0%, 20%)" className="w-24" />
            <p className="text-4xl font-semibold text-gray-700">
              SAFE
            </p>
            <p className="text-lg text-gray-700 text-justify">
              Remain anonymous and protect personal information
            </p>
          </div>
        </div>
      </div>
    </>
   );
}

export default IHaveSolar;
