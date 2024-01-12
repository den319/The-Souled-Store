import { Link, useParams } from "react-router-dom";
import Address from "../common/address";
import OrederBill from "./orderSectionForCart/OrderBill";
import { useContext, useState } from "react";
import AddAddressModal from "../modals/addAddressModal";
import { UserContext } from "../../context/userContext";





export default function DeliveryAddress() {

    const {user}= useContext(UserContext);

    const isChecked= useParams();
    const [isModalOpen, setIsModalOpen]= useState(false);

    // console.log(user)
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex justify-center w-full font-bold text-[10px] 
                border-b border-[#eee] px-[5px] py-[1rem] 
                md:text-[14px] lg:px-[1rem]">
                <div className="font-green pointer-events-none">
                    <p className="px-[5px]">MY BAG</p>
                </div>

                <div className="flex items-center font-green">
                    <p className="px-[5px]">- - - - - - - - - -</p>
                    <div className="pointer-events-none">
                        <p className="px-[5px]">ADDRESS</p>
                    </div>
                </div>
                
                <div className="flex items-center">
                    <p className="px-[5px]">- - - - - - - - - -</p>
                    <div className="pointer-events-none">
                        <p className="px-[5px]">PAYMENT</p>
                    </div>
                </div>
            </div>

            <div className="w-full xl:max-w-[1500px] flex flex-col justify-center items-center py-[1rem] px-[1rem]">
            
                <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-start">
                    <div className="w-full md:w-[auto]">
                        <p className="font-bold font-grey pb-[1rem]">Deliver To</p>
                        <Address />
                    </div>

                    {
                        isModalOpen &&
                        
                        <AddAddressModal isOpen={isModalOpen} 
                            onClose={() => setIsModalOpen(false)}
                            heading={"Add New Address"} />
                    }

                    <div className="w-full mt-[1rem] md:w-[23rem] md:ml-[2rem] md:mt-[1px]">
                        <OrederBill isChecked= {isChecked.true === "true"} />

                        {
                            user?.address.length !== 0 ? 
                            <Link to={"/checkout/" + `${isChecked.true === "true"}`}>
                                <button className="w-full mt-[1rem] py-[8px] font-green text-[13px] font-bold border border-[#117a7a] 
                                    duration-500
                                    hover:bg-[#117a7a] hover:text-white md:border md:rounded-[5px]">
                                    CONTINUE TO PAYMENT
                                </button>
                            </Link>
                            :
                            <button onClick={() => setIsModalOpen(true)} 
                                className="w-full mt-[1rem] py-[8px] font-green text-[13px] font-bold border border-[#117a7a] 
                                duration-500
                                hover:bg-[#117a7a] hover:text-white md:border md:rounded-[5px]">
                                CONTINUE TO PAYMENT
                            </button>
                        }

                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}