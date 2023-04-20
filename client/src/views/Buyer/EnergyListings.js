
import { useState } from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import {omit} from 'lodash'

const EnergyListings = ({ filteredEntries }) => {
    const[selected, setSelected] = useState(null);
    const[errors, setErrors] = useState({});
    const[values, setValues] = useState({});
    // const[sentOffer, setSentOffer] = useState((false, null))
    // const[msg, setMsg] = useState('')
    // const[email, setEmail] = useState('')
    const [sentOffer, setSentOffer] = useState(false)

    //old working thing
    // const { register, handleSubmit, reset, formState: {errors} } = useForm({
    //     mode: "onChange"
    //   });
    const { handleSubmit, reset } = useForm();
    //new 

    const validation = {
        email: { required: "Email address is required"}, 
        msg: { required: "Message is required"}
      }

    const toggle = (i) => {
        console.log('in toggle outside')
        // closing the offer by re-clicking the opened one
        if(selected === i) {
            //new
            // console.log('in toggle')
            // setSentOffer(false)
            // reset({email: '', msg: ''});
            reset(values)
            return setSelected(null)
            
        }

        setSelected(i)

        //new
        reset(values)
        // setSentOffer(false)
        // reset({email: '', msg: ''});
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const onErrors = (errors) => {
        console.log('made it to onErrors')
        console.error(errors);
    }

    //new
    const handleChange = (event) => {
        event.persist()

        let name = event.target.name;
        let value = event.target.value;

        validate(event, name, value);

        // add set values
        console.log(errors)
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
        console.log('made it inside sendOffer')

        try {
            const response = await axios.post('/sellers/${sellerID}/offers', data)
            // setSentOffer((true, selected))
            if (response.status === 200) {
                setSentOffer(true)
                // reset({email:'', msg:''})
                reset();
              }
        }
        catch(error){
            console.log('Error submitting offer ', error)
        }

        //new
        // setSentOffer(true)
        // reset({email: '', msg: ''});

    }

    // {...register('email', validation.email)}
    // + (errors?.email ? " border-red-500" : "")

    // {...register('msg', validation.msg)}
    // + (errors?.msg ? " border-red-500" : "")
// TODO
// - Fix the error entry stuff
// - Reorganize the components so they are next to each other

    return (
        <div className = "wrapper">
            <div className = "accordian">
            {filteredEntries.map((item, i) => (
                <div className = "item">
                                <div className = "title" onClick={() => toggle(i)}>
                                    <div class = "grid grid-cols-2 gap-2 pb-2">
                                        
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
                                    
                                    <span class="pl-2">{selected === i ? 'v' : '>'}</span>
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
                                                {/* {console.log(errors?.email)}
                                                {errors?.email && errors.email.message} */}
                                            </small>
                                        </div>
                                       
                                        {/* <br></br> */}
                                        <div>
                                            <label htmlFor="msg">Message to the Seller: </label>
                                            {/* <br></br> */}
                                            <input type = "text" id = "msg" name = "msg" 
                                                   placeholder = "Hello!" 
                                                   onChange={handleChange}
                                                   className ={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" + (errors?.msg ? " border-red-500" : "")}/>
                                            <small className="text-red-500">
                                                {errors.msg && <p>{errors.msg}</p>}
                                                {/* {console.log(errors)} */}
                                                {/* {errors?.msg && errors.msg.message} */}
                                            </small>

                                        </div>
                                      
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

