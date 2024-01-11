import { useEffect, useState } from "react";






export default function DeliverySection({date, list, totalDays}) {
    // totalDays= 9

    // console.log(list);
    const [totalCost, setTotalCost]= useState(0);
    
    

    useEffect(() => {
       const sum= Object.entries(list).reduce((acc, [idx, order]) => {
            return acc+ order.totalPrice;
        }, 0)
        setTotalCost(sum);
    }, [list])

    return (
        <div className="mt-[1rem] border">
            {/* heading */}
            <div className="font-bold p-[1rem] text-[16px] font-grey bg-[#eee]">
                Delivery Details
            </div>

            {/* order detaile section */}
            <div className="p-[1.5rem] font-grey">
                {/* tracking section */}
                <div>
                    <div>
                        <div className="flex">
                            <p className="font-bold">Order Date:</p>
                            <p className="ml-[5px]">{date}</p>
                        </div>

                        <div className="flex mt-[10px]">
                            <p className="font-bold">Order Status:</p>
                            <p className="ml-[5px]">{totalDays < 5 ? "Order is in Queue" : 
                                totalDays >= 5 && totalDays <= 7 ? "Order is shipping" : "Order has been delevered"}</p>
                        </div>

                        <div className="flex mt-[10px]">
                            <p className="font-bold">Total Price:</p>
                            <p className="ml-[5px] font-bold">₹ {totalCost}</p>
                            <p className="ml-[5px] font-bold">+ ₹ {(parseInt(totalCost * 0.1))} (GST)  =  ₹ {totalCost + (parseInt(totalCost * 0.1))}</p>
                        </div>
                    </div>

                    <div className="mt-[1rem] h-[10px] w-full flex">
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

                            // console.log(price)

                            return (
                                <div className="border my-[2rem]">
                                    <div className="flex py-[1rem] mx-[1rem]">
                                        {/* image */}

                                        <div className="min-w-[10rem] h-[13rem]">
                                            <img src={displayImage} alt="No Image" className="w-full h-full" />
                                        </div>

                                        {/* product details */}
                                        <div className="pl-[1rem] flex flex-col justify-start items-start w-full">
                                            <p className="font-bold text-[17px]">{name}</p>
                                            <p className="font-bold text-[16px] mt-[5px]">₹ {price}</p>
                                            <div className="flex items-center font-semibold mt-[5px]">
                                                <p className={` ${ratings >= 3.5 ? 
                                                    "font-green" : ratings > 2 ? "text-[#fc8a08]" : "font-red"}`}>
                                                    {ratings?.toFixed(1)}
                                                </p>

                                                <p>/5.0</p> 
                                            </div> 
                                            <div className="flex items-center text-[15px] mt-[5px]">
                                                <p className="font-bold">Quantity:</p>
                                                <p className="font-semibold ml-[5px]">{totalPrice / price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* address */}

                                    <div className="flex items-center py-[10px] border-t pl-[1rem]">
                                            <p className="font-bold text-[16px]">Address:</p>
                                            <div className="ml-[5px] font-semibold flex items-center">
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