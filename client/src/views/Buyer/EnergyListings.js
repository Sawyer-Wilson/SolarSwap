
import { useState } from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';

const EnergyListings = ({ filteredEntries }) => {
    const[selected, setSelected] = useState(null)
    // const[sentOffer, setSentOffer] = useState((false, null))
    // const[msg, setMsg] = useState('')
    // const[email, setEmail] = useState('')

    const { register, handleSubmit, reset, formState: {errors} } = useForm({
        mode: "onSubmit"
      });

    const validation = {
        email: { required: "Email address is required"}, 
        msg: { required: "Message is required"}
      }

    const toggle = (i) => {
        if(selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }



    const sendOffer = async (data, event) => {
        event.preventDefault();
        const sellerID = data.sellerID

        try {
            const response = await axios.post('/sellers/${sellerID}/offers', data)
            // setSentOffer((true, selected))
        }
        catch(error){
            console.log('Error submitting offer ', error)
        }

        
        // reset();

    }


// TODO
// - Fix the error entry stuff
// - Reorganize the components so they are next to each other

    return (
        <div className = "wrapper">
            <div className = "accordian">
            {filteredEntries.map((item, i) => (
                <div className = "item">
                                <div className = "title" onClick={() => toggle(i)}>
                                    <div class = "grid grid-cols-2 gap-2">
                                        
                                        <div>
                                            <h2 class = "text-xl pb-2">{(item.sellerFirstName)}</h2>
                                            <p class = "text-[#717171] text-xs">{formatDate(item.updatedAt)}</p>
                                        </div>

                                        <div>
                                            <span class = "text-base">monthly utility credit: </span>
                                            <span class = "inline line-through text-xl">${Math.ceil((item.pctOverageToSell/100) * item.avgMonthlyOverage)}</span><br></br>
                                            <span class = "text-base ml-16">asking price: </span>
                                            <span class = "inline text-xl">${Math.ceil((item.pctOverageToSell/100) * item.avgMonthlyOverage * (item.askingRate/100))}</span>
                                        </div>
                                    </div>
                                    
                                    <span>{selected === i ? 'v' : '>'}</span>
                                </div> 
                                <br></br>
                                <div className = {selected === i ? 'content show' : 'content'}>
                                    <div class = "grid grid-cols-2 gap-16 pt-3">
                                        <span>Utility Provider:</span>
                                        <span>{item.utilityProvider}</span>
                                    </div>

                                    <div class = "grid grid-cols-2 gap-16 pt-3">
                                        <span class = "underline">Monthly Utility Credit:  </span>
                                        <span>${Math.ceil((item.pctOverageToSell/100) * item.avgMonthlyOverage)}</span>
                                    </div>

                                    <div class = "grid grid-cols-2 gap-16 pt-3">
                                        <span class = "underline">Proposed Discount:</span>
                                        <span class = "text-[#4BB038]">-${Math.ceil((100 - item.askingRate)/100 * (item.avgMonthlyOverage * (item.pctOverageToSell/100)))}</span>
                                    </div>

                                    <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                                    <div class = "grid grid-cols-2 gap-16">
                                        <span class = "underline italic">Total Price</span>
                                        <span>${ Math.ceil((item.pctOverageToSell/100) * item.avgMonthlyOverage -(100 - item.askingRate)/100 * (item.avgMonthlyOverage * (item.pctOverageToSell/100)))}</span>
                                    </div>
                                    
                                    <br></br>
                                    
                                    <form onSubmit={handleSubmit((data, e) => {
                                        data.sellerID = item.sellerID
                                        sendOffer(data, e)
                                    })}>
                                        <label for="email">Email: </label>
                                        <input type = "text" id = "email" className ={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" + (errors?.email ? " border-red-500" : "")}  placeholder = "MyEmail@gmail.com" {...register('email', validation.email)}></input>
                                        <small className="text-red-500">
                                            {errors?.email && errors.email.message}
                                        </small>
                                        <br></br>
                                        <label for="msg">Message to the Seller: </label>
                                        <br></br>
                                        <input type = "text" id = "msg" className ={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" + (errors?.msg ? " border-red-500" : "")}  placeholder = "Hello!" {...register('msg', validation.msg)}></input>
                                        <small className="text-red-500">
                                            {errors?.msg && errors.msg.message}
                                        </small>
                                        <br></br>
                                        {/* <input type="text" id = "sellerID">{item.sellerID}</input> */}
                                        <div class = "pb-8">
                                            <button type="submit" className = "button3" >Send Offer</button>
                                            {/* <input type = "submit" value = "Send Offer" class="button3"></input> */}
                                        </div>
                                        {/* <input type="text" value={item.sellerID}></input> */}
                                    </form>

                                </div> 
                            </div>   
            ))}
            </div>
        </div>
    )
    //     {/* const content = results?.length ? results : <article><p>No Matching Posts</p></article>

    // return (
    //     <main>{content}</main>
    // ) */}
}
export default EnergyListings

