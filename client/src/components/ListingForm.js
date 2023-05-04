import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { municipalities } from "./municipalities";
import { utilityProviders } from "./utilityProviders";

const ListingForm = ({ onSubmit, isEditing, setIsEditing, defaultValues, listing, setListing }) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm({
    mode: "onChange",
    defaultValues: defaultValues
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
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className="flex flex-col space-y-8">

        {/* System Info */}
        <div className="rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-light">
            <p className="text-gray-100 font-bold text-2xl p-3 px-8">SYSTEM INFO</p>
          </div>
          {/* Body */}
          <div className="flex flex-col space-y-4 p-5 px-8">
            {/* MUNICIPALITY */}
            <div className="flex space-x-3 items-center">
              <label htmlFor="municipality"
                     className={`tracking-wide text-lg whitespace-nowrap ${ !isEditing && 'text-gray-600' }`}>
                Municipality: 
              </label>
              { isEditing ?
                <select id="municipality" name="municipality" 
                        className={`appearance-none w-3/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none ${ errors?.municipality ? 'border-red-500' : 'border-gray-400' }`}
                        {...register('municipality', validation.municipality)}>
                  { municipalities.map((municipality) => {
                    return (
                      <option value={ municipality.value }
                              key={ municipality.value }>
                        { municipality.label }
                      </option>
                    )
                  }) }
                </select>
                :
                <p className="tracking-wide text-xl">{ listing.municipality }</p>
              }
              <small className="text-red-500">
                {errors?.municipality && errors.municipality.message}
              </small>
            </div>

            {/* UTILITY PROVIDER */}
            <div className="flex space-x-3 items-center">
              <label htmlFor="utilityProvider"
                     className={`tracking-wide text-lg whitespace-nowrap ${ !isEditing && 'text-gray-600' }`}>
                Utility Provider: 
              </label>
              { isEditing ?
                <select id="utility-provider" name="utilityProvider" 
                        className={`appearance-none w-3/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none ${ errors?.utilityProvider ? 'border-red-500' : 'border-gray-400' }`}
                        {...register('utilityProvider', validation.utilityProvider)}>
                  { utilityProviders.map((utilityProvider) => {
                    return (
                      <option value={ utilityProvider.value }
                              key={ utilityProvider.value }>
                        { utilityProvider.label }
                      </option>
                    )
                  }) }
                </select>
                :
                <p className="tracking-wide text-xl">{ listing.utilityProvider }</p>
              }
              <small className="text-red-500">
                {errors?.utilityProvider && errors.utilityProvider.message}
              </small>
            </div>

            <div className="flex justify-between">
              {/* AVERAGE MONTHLY OVERAGE */}
              <div className="flex space-x-3 items-center">
                <label htmlFor="avgMonthlyOverage"
                      className={`tracking-wide text-lg whitespace-nowrap ${ !isEditing && 'text-gray-600' }`}>
                  Average Monthly Overage:
                </label>
                { isEditing ?
                  <>
                    <p className="tracking-wide text-lg">$</p>
                    <input type="text" id="avgMonthlyOverage" name="avgMonthlyOverage" 
                          disabled={ !isEditing }
                          placeholder="200"
                          {...register('avgMonthlyOverage', validation.avgMonthlyOverage)}
                          className={`w-1/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none ${ errors?.avgMonthlyOverage ? "border-red-500" : "border-gray-400" }`}/>
                  </>
                  :
                  <p className="tracking-wide text-xl">{ `$${listing.avgMonthlyOverage}` }</p>
                }
                <small className="text-red-500">
                  {errors?.avgMonthlyOverage && errors.avgMonthlyOverage.message}
                </small>
              </div>
              { !isEditing && 
                <button onClick={ () => setIsEditing(true) }
                        className="bg-rose-light hover:bg-rose-dark text-white text-md px-4 py-2 rounded-lg">
                  Edit Info
                </button> 
              }
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
            {/* PERCENT OVERAGE TO SELL */}
            <div className="flex space-x-3 items-center">
              <label htmlFor="pctOverageToSell"
                     className={`tracking-wide text-lg whitespace-nowrap ${ !isEditing && 'text-gray-600' }`}>
                % Overage to Sell: 
              </label>
              { isEditing ?
                <>
                  <input type="text" id="pctOverageToSell" name="pctOverageToSell" 
                        disabled={ !isEditing }
                        placeholder="40"
                        {...register('pctOverageToSell', validation.pctOverageToSell)}
                        className={`w-1/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none ${ errors?.pctOverageToSell ? "border-red-500" : "border-gray-400" }`}/>
                  <p className="tracking-wide text-lg">%</p>
                </>
                :
                <p className="tracking-wide text-xl">{ `${listing.pctOverageToSell}%` }</p>
              }
              <small className="text-red-500">
                {errors?.pctOverageToSell && errors.pctOverageToSell.message}
              </small>
            </div>

            <div className="flex justify-between">
              {/* ASKING RATE */}
              <div className="flex space-x-3 items-center">
                <label htmlFor="askingRate"
                      className={`tracking-wide text-lg whitespace-nowrap ${ !isEditing && 'text-gray-600' }`}>
                  Asking Rate: 
                </label>
                { isEditing ?
                  <>
                    <input type="text" id="askingRate" name="askingRate" 
                          disabled={ !isEditing }
                          placeholder="80"
                          {...register('askingRate', validation.askingRate)}
                          className={`w-1/5 border rounded-lg py-2 px-3 leading-tight tracking-wide focus:outline-none ${ errors?.askingRate ? "border-red-500" : "border-gray-400" }`}/>
                    <p className="tracking-wide text-lg">%</p>
                  </>
                  :
                  <p className="tracking-wide text-xl">{ `${listing.askingRate}%` }</p>
                }
                <small className="text-red-500">
                  {errors?.askingRate && errors.askingRate.message}
                </small>
              </div>
              { !isEditing && 
                <button onClick={ () => setIsEditing(true) }
                        className="bg-rose-light hover:bg-rose-dark text-white text-md px-4 py-2 rounded-lg">
                  Edit Info
                </button> 
              }
            </div>
          </div>
        </div>


        {/* Submit/Save Button */}
        { isEditing && 
          <div>
            <button type="submit"
                    className="bg-rose-light hover:bg-rose-dark text-white w-full p-4 rounded-lg">
              Save Info
            </button>
          </div>
        }
      </div>
    </form>
  );
}
 
export default ListingForm;