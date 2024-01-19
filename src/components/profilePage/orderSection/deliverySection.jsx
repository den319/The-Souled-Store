import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/userContext";






export default function DeliverySection({date, list, totalDays}) {
    const {isMobile}= useContext(UserContext);
    const [totalCost, setTotalCost]= useState(0);
    
    

    useEffect(() => {
       const sum= Object.entries(list).reduce((acc, [idx, order]) => {
            return acc+ order.totalPrice;
        }, 0)
        setTotalCost(sum);
    }, [list])

    return (
        <div className="mt-[1rem] border text-[12px] md:text-[15px]">
            {/* heading */}
            <div className="font-bold p-[1rem] text-[16px] font-grey bg-[#eee]">
                Delivery Details
            </div>

            {/* order detaile section */}
            <div className="p-[10px] font-grey sm:p-[1.5rem]">
                {/* tracking section */}
                <div>
                    <div>
                        <div className="flex">
                            <p className="font-bold">Order Date:</p>
                            <p className="ml-[5px]">{date}</p>
                        </div>

                        <div className="w-full flex mt-[10px] text-[13px] md:text-[16px]">
                            <p className="font-bold">Total Price:</p>
                            <div className="flex flex-wrap items-center">
                                <p className="w-max ml-[5px] font-bold">₹ {totalCost}</p>
                                <p className="w-max ml-[5px] font-bold">+ ₹ {(parseInt(totalCost * 0.1))} (GST) = </p>
                                <p className="w-max ml-[5px] font-bold"> ₹ {totalCost + (parseInt(totalCost * 0.1))}</p>
                            </div>
                        </div>

                        <div className="flex mt-[10px]">
                            <p className="font-bold">Order Status:</p>
                            <p className="ml-[5px] font-semibold text-[#000000]">{totalDays < 5 ? "Order is in Queue" : 
                                totalDays >= 5 && totalDays <= 7 ? "Order is shipping" : "Order has been delevered"}</p>
                        </div>
                    </div>

                    <div className="mt-[5px] h-[10px] w-full flex">
                        <div className={`${totalDays < 5 ? "bg-[#e11b23] border-[#e11b23]" : 
                            totalDays >= 5 && totalDays <= 7 ? "bg-[#fa8202] border-[#fa8202]" :
                            "bg-[#117a7a] border-[#117a7a]"} w-1/3 h-full border-y-[1px] border-l-[1px] `}></div>
                        
                        <div className={`${totalDays < 5 ? "bg-white" : 
                            totalDays >= 5 && totalDays <= 7 ? "bg-[#fa8202] border-[#fa8202]" :
                            "bg-[#117a7a] border-[#117a7a]"} w-1/3 h-full border-y-[1px]`}></div>

                        <div className={`${totalDays < 8 ? "bg-white" : 
                            "bg-[#117a7a] border-[#117a7a]"} w-1/3 h-full border-y-[1px] border-r-[1px]`}></div>
                    </div>
                </div>

                {/* product list section */}
                
                <div className="mt-[3rem]">
                    {
                        Object.entries(list).map(([idx, order], index) => {
                            const {orderData, product, shipmentDetails, totalPrice}= order;
                            const {displayImage, name, price, ratings, _id}= product;

                            return (
                                <div key={idx} className="border my-[1rem] sm:my-[2rem]">
                                    <div className="flex py-[1rem] mx-[1rem]">
                                        {/* image */}

                                        <div className="min-w-[6rem] h-[8rem] cursor-pointer
                                            md:min-w-[10rem] md:min-h-[13rem] ">
                                            <Link to={`/product/${_id}`}>
                                                <img src={displayImage} alt="No Image" className="w-full h-full" />
                                            </Link>
                                        </div>

                                        {/* product details */}
                                        <div className="pl-[1rem] flex flex-col justify-start items-start w-full">
                                            <Link to={`/product/${_id}`}>
                                                <p className="font-bold text-[13px] sm:text-[17px] cursor-pointer hover:text-[#e11b23]">
                                                    {isMobile ? name.slice(0, 15) + "..." : name }
                                                </p>
                                            </Link>
                                            
                                            <p className="font-bold text-[12px] mt-[5px] sm:text-[16px]">₹ {price}</p>
                                            <div className="flex items-center font-semibold mt-[5px]">
                                                <p className={` ${ratings >= 3.5 ? 
                                                    "font-green" : ratings > 2 ? "text-[#fc8a08]" : "font-red"}`}>
                                                    {ratings?.toFixed(1)}
                                                </p>

                                                <p>/5.0</p> 
                                            </div> 
                                            <div className="flex items-center text-[12px] mt-[5px] sm:text-[15px]">
                                                <p className="font-bold">Quantity:</p>
                                                <p className="font-semibold ml-[5px]">{totalPrice / price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* address */}

                                    <div className="flex items-start py-[10px] border-t pl-[1rem]">
                                            <p className="font-bold text-[13px] mt-[-2px] sm:mt-0 sm:text-[16px]">Address:</p>
                                            <div className="ml-[5px] font-semibold flex flex-wrap items-start">
                                                <p>{list[0].shipmentDetails.street},</p>
                                                <p className="ml-[5px]">{list[0].shipmentDetails.city},</p>
                                                <p className="ml-[5px]">{list[0].shipmentDetails.state},</p>
                                                <p className="ml-[5px]">{list[0].shipmentDetails.country} -</p>
                                                <p className="ml-[5px]">{list[0].shipmentDetails.zipCode}</p>      
                                            </div>
                                        </div>
                                    
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}