import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ListingForm = ({ handleSaveInfo, listing, setListing }) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm({
    mode: "onChange"
  });

  // Validation config for input fields
  const validation = {
    municipality: { required: "Required Field" },
    utilityProvider: { required: "Required Field" },
    avgMonthlyOverage: { 
      required: "Required Field",
      pattern: {
        value: /^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-2][0-9][0-9][0-9]|3000)$/,
        message: "Invalid number"
      }
    },
    pctOverageToSell: { 
      required: "Required Field",
      pattern: {
        value: /^([1-9]|[1-9][0-9]|100)$/,
        message: "Invalid number"
      }
    },
    askingRate: { 
      required: "Required Field",
      pattern: {
        value: /^([1-9]|[1-9][0-9]|100)$/,
        message: "Invalid number"
      } 
    }
  }

  // Called every time there is a change on the form
  useEffect(() => {
    const subscription = watch((data) => {
      setListing({ ...listing, ...data });
    });
    return () => subscription.unsubscribe();
  }, [watch, listing, setListing])

  return ( 
    <form onSubmit={ handleSubmit(handleSaveInfo) }>
      <div className="flex flex-col space-y-8">

        {/* System Info */}
        <div className="rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-light">
            <p className="text-gray-100 font-bold text-2xl p-3 px-8">SYSTEM INFO</p>
          </div>
          {/* Body */}
          <div className="flex flex-col space-y-4 p-5 px-8">
            <div className="flex space-x-3 items-center">
              <label htmlFor="municipality"
                     className="tracking-wide text-lg whitespace-nowrap">
                Municipality: 
              </label>
              <input type="text" id="municipality" name="municipality" 
                     placeholder="Somerville"
                     {...register('municipality', validation.municipality)}
                     className={"w-3/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none " + (errors?.municipality ? "border-red-500" : "border-gray-400")}/>
              <small className="text-red-500">
                {errors?.municipality && errors.municipality.message}
              </small>
            </div>
            <div className="flex space-x-3 items-center">
              <label htmlFor="utilityProvider"
                     className="tracking-wide text-lg whitespace-nowrap">
                Utility Provider: 
              </label>
              <input type="text" id="utilityProvider" name="utilityProvider" 
                     placeholder="Eversource"
                     {...register('utilityProvider', validation.utilityProvider)}
                     className={"w-3/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none " + (errors?.utilityProvider ? "border-red-500" : "border-gray-400")}/>
              <small className="text-red-500">
                {errors?.utilityProvider && errors.utilityProvider.message}
              </small>
            </div>
            <div className="flex space-x-3 items-center">
              <label htmlFor="avgMonthlyOverage"
                     className="tracking-wide text-lg whitespace-nowrap">
                Average Monthly Overage:
              </label>
              <p className="tracking-wide text-lg">$</p>
              <input type="text" id="avgMonthlyOverage" name="avgMonthlyOverage" 
                     placeholder="200"
                     {...register('avgMonthlyOverage', validation.avgMonthlyOverage)}
                     className={"w-1/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none " + (errors?.avgMonthlyOverage ? "border-red-500" : "border-gray-400")}/>
              <small className="text-red-500">
                {errors?.avgMonthlyOverage && errors.avgMonthlyOverage.message}
              </small>
            </div>
          </div>
        </div>

        {/* Listing Info */}
        <div className="rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-light">
            <p className="text-gray-100 font-bold text-2xl p-3 px-8">LISTING INFO</p>
          </div>
          {/* Body */}
          <div className="flex flex-col space-y-4 p-5 px-8">
            <div className="flex space-x-3 items-center">
              <label htmlFor="pctOverageToSell"
                     className="tracking-wide text-lg whitespace-nowrap">
                % Overage to Sell: 
              </label>
              <input type="text" id="pctOverageToSell" name="pctOverageToSell" 
                     placeholder="40"
                     {...register('pctOverageToSell', validation.pctOverageToSell)}
                     className={"w-1/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none " + (errors?.pctOverageToSell ? "border-red-500" : "border-gray-400")}/>
              <p className="tracking-wide text-lg">%</p>
              <small className="text-red-500">
                {errors?.pctOverageToSell && errors.pctOverageToSell.message}
              </small>
            </div>
            <div className="flex space-x-3 items-center">
              <label htmlFor="askingRate"
                     className="tracking-wide text-lg whitespace-nowrap">
                Asking Rate: 
              </label>
              <input type="text" id="askingRate" name="askingRate" 
                     placeholder="80"
                     {...register('askingRate', validation.askingRate)}
                     className={"w-1/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none " + (errors?.askingRate ? "border-red-500" : "border-gray-400")}/>
              <p className="tracking-wide text-lg">%</p>
              <small className="text-red-500">
                {errors?.askingRate && errors.askingRate.message}
              </small>
            </div>
          </div>
        </div>


        {/* Submit/Save Button */}
        <div>
          <button type="submit"
                  className="bg-rose-light hover:bg-rose-dark text-white font-bold w-full py-4 rounded-lg focus:outline-none focus:shadow-outline">
            Save Info
          </button>
        </div>
      </div>
    </form>
  );
}
 
export default ListingForm;