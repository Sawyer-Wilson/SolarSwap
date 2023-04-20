import { useState } from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import {omit} from 'lodash'

const EnergyListings = ({ filteredEntries }) => {
    const[selected, setSelected] = useState(null);
    const[errors, setErrors] = useState({});
    const[values, setValues] = useState({});
    const [sentOffer, setSentOffer] = useState(false)

    const { handleSubmit, reset } = useForm();

    const toggle = (i) => {
        // closing the offer by re-clicking the opened one
        if(selected === i) {
            setSentOffer(false)
            return setSelected(null)
        }

        setSentOffer(false)
        setSelected(i)
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const onErrors = (errors) => {
        console.log('made it to onErrors')
        console.error(errors);
    }

    const handleChange = (event) => {
        event.persist()

        let name = event.target.name;
        let value = event.target.value;

        validate(event, name, value);

        setValues({
            ...values, 
            [name]: value,
        })
    }

    const validate = (event, name, value) => {
        switch (name) {
            case 'email':
                // If input isn't an email
                if (!new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)) {
                    setErrors({
                        ...errors,
                        email: 'Email must be a valid email address'
                    })
                }
                else {
                    // remove error 
                    let newObj = omit (errors, "email");
                    setErrors(newObj)
                }
                break;
            
            case 'msg':
                if (value.length < 1){
                    setErrors({
                        ...errors,
                        msg: 'Message is required'
                    })
                }
                else {
                    let newObj = omit (errors, "msg");
                    setErrors(newObj)
                }
            break;

            default:
                break;
        }
    }

    const sendOffer = async (data, event) => {
        event.preventDefault();
        const sellerID = data.sellerID

        try {
            const response = await axios.post('/sellers/${sellerID}/offers', data)
            if (response.status === 200) {
                setSentOffer(true)
              }
        }
        catch(error){
            console.log('Error submitting offer ', error)
        }

    }


    return (
        <div className = "wrapper">
            <div className = "accordian">
            {filteredEntries.map((item, i) => (
                <div className = "item" key={i}>
                                <div className = "title" onClick={() => toggle(i)}>
                                    <div className = "grid grid-cols-2 gap-2 pb-2">
                                        
                                        <div>
                                            <h2 className = "text-xl pb-2">{(item.sellerFirstName)}</h2>
                                            <p className = "text-[#717171] text-xs">{formatDate(item.updatedAt)}</p>
                                        </div>

                                        <div>
                                            <span className = "text-base">monthly utility credit: </span>
                                            <span className = "inline line-through text-xl">${Math.ceil((item.pctOverageToSell/100) * item.avgMonthlyOverage)}</span><br></br>
                                            <span className = "text-base ml-16">asking price: </span>
                                            <span className = "inline text-xl">${Math.ceil((item.pctOverageToSell/100) * item.avgMonthlyOverage * (item.askingRate/100))}</span>
                                        </div>
                                    </div>
                                    
                                    <span className="pl-2">{selected === i ? 'v' : '>'}</span>
                                </div> 
                                <br></br>
                                <div className = {selected === i ? 'content show' : 'content'}>
                                    <div className = "grid grid-cols-2 gap-16 pt-3">
                                        <span>Utility Provider:</span>
                                        <span>{item.utilityProvider}</span>
                                    </div>

                                    <div className = "grid grid-cols-2 gap-16 pt-3">
                                        <span className = "underline">Monthly Utility Credit:  </span>
                                        <span>${Math.ceil((item.pctOverageToSell/100) * item.avgMonthlyOverage)}</span>
                                    </div>

                                    <div className = "grid grid-cols-2 gap-16 pt-3">
                                        <span className = "underline">Proposed Discount:</span>
                                        <span className = "text-[#4BB038]">-${Math.ceil((100 - item.askingRate)/100 * (item.avgMonthlyOverage * (item.pctOverageToSell/100)))}</span>
                                    </div>

                                    <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                                    <div className = "grid grid-cols-2 gap-16">
                                        <span className = "underline italic">Total Price</span>
                                        <span>${ Math.ceil((item.pctOverageToSell/100) * item.avgMonthlyOverage -(100 - item.askingRate)/100 * (item.avgMonthlyOverage * (item.pctOverageToSell/100)))}</span>
                                    </div>
                                    
                                    <br></br>
                                    
                                    <form onSubmit={handleSubmit((data, e) => {
                                        e.preventDefault()
                                        console.log('made it to onSubmit')
                                        data.email = values.email
                                        data.msg = values.msg
                                        data.sellerID = item.sellerID

                                        if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
                                            console.log(data)
                                            sendOffer(data, e)
                                            
                                        }
                                        else {
                                            alert("There is an error")
                                        }
                                       
                                    }, onErrors)}>
                                        <div>
                                            <label htmlFor="email">Email: </label>
                                            <input type = "text" id = "email" name = "email"
                                                   placeholder = "MyEmail@gmail.com"
                                                   onChange={handleChange}
                                                   className ={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}/>
                                            <small className="text-red-500">
                                                {errors.email && <p>{errors.email}</p>}
                                            </small>
                                        </div>
                                    
                                        <div>
                                            <label htmlFor="msg">Message to the Seller: </label>
                                            <input type = "text" id = "msg" name = "msg" 
                                                   placeholder = "Hello!" 
                                                   onChange={handleChange}
                                                   className ={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" + (errors?.msg ? " border-red-500" : "")}/>
                                            <small className="text-red-500">
                                                {errors.msg && <p>{errors.msg}</p>}
                                            </small>

                                        </div>
                                      
                                        <br></br>
                                        <div className = "pb-2">
                                            <button type="submit" className = "button3" >Send Offer</button>
                                        </div>
                                        <div class="Message">
                                            <div className="text-green-700 text-center font-semibold">
                                                {sentOffer && <p>Sent Message!</p>}
                                            </div>

                                        </div>
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

