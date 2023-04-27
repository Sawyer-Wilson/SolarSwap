const ImpactBoxes = ({ listing }) => {
  const { avgMonthlyOverage, pctOverageToSell, askingRate } = listing;
  let monthlyProfit = 0, lifeTimeProfit = 0, CO2Emissions = 0, roadTrips = 0;

  // Calculate impact 
  if (!(isNaN(avgMonthlyOverage) || isNaN(pctOverageToSell) || isNaN(askingRate)) && 
       avgMonthlyOverage <= 3000 && pctOverageToSell <= 100 && askingRate <= 100) {
    monthlyProfit = Math.round(avgMonthlyOverage * (pctOverageToSell / 100) * (askingRate / 100));
    lifeTimeProfit = Math.round(monthlyProfit * 12 * 25);
    CO2Emissions = Math.round(lifeTimeProfit * (1 / 0.31) * 2.26 * (1 / 2000));
    roadTrips = Math.round(CO2Emissions * (1 / 1.26));
  } 

  return ( 
    <div className="flex lg:flex-col lg:space-y-8 lg:space-x-0 flex-row space-x-8">
      {/* FINANCIAL IMPACT */}
      <div className="rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-light">
          <p className="text-gray-100 font-bold text-2xl p-3 px-8">FINANCIAL IMPACT</p>
        </div>
        {/* Body */}
        <div className="flex flex-col space-y-2 p-3 px-8">
          <div className="flex flex-row space-x-2">
            <div className="text-[2.3rem]">{ `$${monthlyProfit}` }</div>
            <div className="flex items-center">profit per month</div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="text-[2.3rem]">{ `$${lifeTimeProfit.toLocaleString()}` }</div>
            <div className="flex items-center">life time profit of solar system</div>
           </div>
        </div>
      </div>

      {/* ENVIRONMENTAL IMPACT */}
      <div className="rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-light">
          <p className="text-gray-100 font-bold text-2xl p-3 px-8">ENVIRONMENTAL IMPACT</p>
        </div>
        {/* Body */}
        <div className="flex flex-col space-y-2 p-3 px-8">
          <div className="flex flex-row space-x-2">
            <span className="text-[2.3rem]">{ CO2Emissions }</span>
            <span className="flex items-center">tons of CO2</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span className="text-[2.3rem]">{ roadTrips }</span>
            <span className="flex items-center">cross country road trip emissions equivalent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default ImpactBoxes;