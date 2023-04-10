
import { useState } from "react";

const EnergyListings = ({ filteredEntries }) => {
    const[selected, setSelected] = useState(null)
    const toggle = (i) => {
        if(selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }
    return (
        <div className = "wrapper">
            <div className = "accordian">
            {filteredEntries.map((item, i) => (
                <div className = "item">
                                <div className = "title" onClick={() => toggle(i)}>
                                    <div class = "grid grid-cols-2 gap-2">
                                        
                                        <div>
                                            <h2 class = "text-xl pb-2">Grace</h2>
                                            <p class = "text-[#717171] text-xs">{item.sellerID}</p>
                                        </div>

                                        <div>
                                            <span class = "text-base">monthly utility credit: </span>
                                            <span class = "inline line-through text-xl">${(item.pctOverageToSell/100) * item.avgMonthlyOverage}</span><br></br>
                                            <span class = "text-base ml-16">asking price: </span>
                                            <span class = "inline text-xl">${(item.pctOverageToSell/100) * item.avgMonthlyOverage * (item.askingRate/100)}</span>
                                        </div>
                                    </div>
                                    
                                    <span>{selected === i ? 'v' : '>'}</span>
                                </div> 
                                <br></br>
                                <div className = {selected === i ? 'content show' : 'content'}>
                                    <div class = "grid grid-cols-2 gap-16 pt-3">
                                        <span>Utility Provider:</span>
                                        <span>{item.utilityCompany}</span>
                                    </div>

                                    <div class = "grid grid-cols-2 gap-16 pt-3">
                                        <span class = "underline">Monthly Utility Credit:  </span>
                                        <span>${(item.pctOverageToSell/100) * item.avgMonthlyOverage}</span>
                                    </div>

                                    <div class = "grid grid-cols-2 gap-16 pt-3">
                                        <span class = "underline">Proposed Discount:</span>
                                        <span class = "text-[#4BB038]">-${(100 - item.askingRate)/100 * (item.avgMonthlyOverage * (item.pctOverageToSell/100))}</span>
                                    </div>

                                    <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                                    <div class = "grid grid-cols-2 gap-16">
                                        <span class = "underline italic">Total Price</span>
                                        <span>${ (item.pctOverageToSell/100) * item.avgMonthlyOverage -(100 - item.askingRate)/100 * (item.avgMonthlyOverage * (item.pctOverageToSell/100))}</span>
                                    </div>
                                    
                                    <br></br>
                                    
                                    <form>
                                        <label for="email">Email: </label>
                                        <input type = "text" id = "email" class = "inputBox" placeholder = "MyEmail@gmail.com"></input>
                                        <br></br>
                                        <label for="msg">Message to the Seller: </label>
                                        <br></br>
                                        <input type = "text" id = "msg" class = "inputBox" placeholder = "Hello!"></input><br></br>
                                        
                                        <div class = "pb-8">
                                            <input type = "submit" value = "Send Offer" class="button3"></input>
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



// // {/* <div className = "wrapper">
//             <div className = "accordian">

//                 {filteredList.map((item,i) => ( */}
                    
                    // <div className = "item">
        //             //     <div className = "title" onClick={() => toggle(i)}>
        //             //         <div class = "grid grid-cols-2 gap-2">
                                
        //             //             <div>
        //             //                 <h2 class = "text-xl pb-2">{item.name}</h2>
        //             //                 <p class = "text-[#717171] text-xs">{item.date}</p>
        //             //             </div>

        //             //             <div>
        //             //                 <span class = "text-base">monthly utility credit: </span>
        //             //                 <span class = "inline line-through text-xl">${item.utilityCredit}</span><br></br>
        //             //                 <span class = "text-base ml-16">asking price: </span>
        //             //                 <span class = "inline text-xl">{item.askingPrice}</span>
        //             //             </div>
        //             //         </div>
                            
        //             //         <span>{selected === i ? 'v' : '>'}</span>
        //             //     </div> 
        //             //     <br></br>
        //             //     <div className = {selected === i ? 'content show' : 'content'}>
        //             //         <div class = "grid grid-cols-2 gap-16 pt-3">
        //             //             <span>Utility Provider:</span>
        //             //             <span>{item.provider}</span>
        //             //         </div>

        //             //         <div class = "grid grid-cols-2 gap-16 pt-3">
        //             //             <span class = "underline">Monthly Utility Credit:  </span>
        //             //             <span>${item.utilityCredit}</span>
        //             //         </div>

        //             //         <div class = "grid grid-cols-2 gap-16 pt-3">
        //             //             <span class = "underline">Proposed Discount:</span>
        //             //             <span class = "text-[#4BB038]">-${item.discount}</span>
        //             //         </div>

        //             //         <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        //             //         <div class = "grid grid-cols-2 gap-16">
        //             //             <span class = "underline italic">Total Price</span>
        //             //             <span>${item.utilityCredit - item.discount}</span>
        //             //         </div>
                            
        //             //         <br></br>
                            
        //             //         <form>
        //             //             <label for="email">Email: </label>
        //             //             <input type = "text" id = "email" class = "inputBox" placeholder = "MyEmail@gmail.com"></input>
        //             //             <br></br>
        //             //             <label for="msg">Message to the Seller: </label>
        //             //             <br></br>
        //             //             <input type = "text" id = "msg" class = "inputBox" placeholder = "Hello!"></input><br></br>
                                
        //             //             <div class = "pb-8">
        //             //                 <input type = "submit" value = "Send Offer" class="button3"></input>
        //             //             </div>
        //             //         </form>

        //             //     </div> 
        //             // </div>   
        //         ))}
        //     </div>
        // </div>