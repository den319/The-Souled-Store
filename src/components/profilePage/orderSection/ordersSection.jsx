import { useContext, useEffect, useState } from "react";
import NavbarForProfile from "../navBarForProfile";
import { UserContext } from "../../../context/userContext";
import DeliverySection from "./deliverySection";
import { fetchOrderList } from "../../../utils/utilities";
import { orderListUrl } from "../../../utils/apiUrl";






export default function OrderSection() {
    const {orderList, setOrderList, token, user, projectId, itemsInCart, isMobile}= useContext(UserContext);

    const [modifiedOrderList, setModifiedOrderList]= useState({});


    // to get order list
    useEffect(() => {
        try {
            fetchOrderList(orderListUrl.getList, token, projectId, setOrderList);
        } catch(error) {
            console.log("error while fetching order list: ", error);
        }
    }, [itemsInCart]);


    useEffect(() => {
        setModifiedOrderList(() => Object.groupBy(orderList, ({orderDate}) => orderDate));
    }, [orderList.length])

    const [currDate, setCurrDate]= useState(new Date().getDate());
    const [currMonth, setCurrMonth]= useState(new Date().getMonth() + 1);



    return (
        <>
            {
                isMobile && <NavbarForProfile />
            }

            {
                orderList.length === 0 ?
                <div className="w-full p-[1rem] text-[15px] text-[#a7a9ac]">
                    <p>MY ORDERS</p>

                    <div className="flex w-full border py-[0.5rem] items-center justify-center 
                        mt-[2rem] text-[22px] text-black">
                        No Orders found
                    </div>
                </div>
                :
                <div className="w-full p-[1rem] text-[15px] text-[#a7a9ac]">
                    <p>MY ORDERS</p>

                    <div className="p-[1rem] mt-[1rem] border">
                        <div className="flex items-center">
                            <p>Name</p>
                            <p className="bg-[#eceeef] border border-[#ccc] rounded-[10px] px-[1rem] mt-[5px] 
                                py-[5px] pointer-events-none font-grey ml-[10px] w-max">
                                {user?.name}
                            </p>
                        </div>

                        <div className="flex items-center mt-[10px]">
                            <p>Email Id</p>
                            <p className="bg-[#eceeef] border border-[#ccc] rounded-[10px] px-[1rem] mt-[5px] 
                                py-[5px] pointer-events-none font-grey ml-[10px]">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {
                        Object.entries(modifiedOrderList).map(([day, items], index) => {

                            const date= day.slice(8, 10);
                            const month= day.slice(5, 7);
                            let totalDays= 0;

                            if(month != currMonth) {
                                if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || 
                                    month == 10 || month == 12) {
                                        totalDays= 31 - parseInt(date) + parseInt(currDate);
                                } else {
                                    totalDays= 30 - parseInt(date) + parseInt(currDate);
                                }
                            } else {
                                totalDays= parseInt(currDate) - date;
                            }

                            if(totalDays < 11) {
                                return (
                                    <DeliverySection key={index} date= {day} list= {items} totalDays= {totalDays} />
                                )
                            }
                        })
                    }
                </div>
            }
            
        </>
    )
}