import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import AddAddressModal from "../modals/addAddressModal";





export default function Address() {

    const {user, isMobile}= useContext(UserContext);

    const [isModalOpen, setIsModalOpen]= useState(false);
    const [address, setAddress]= useState(user?.address?.[0]);

    useEffect(() => {
        setAddress(user?.address?.[0]);
    }, [user?.address?.[0]])

    return (
        <>
            {
                user?.address?.length === 0 ?
                <div className={`${isMobile ? "w-full" : "w-[20rem] h-[20rem]"} border flex flex-col items-center justify-center py-[1rem]`}>
                    <p className="bg-[#ccc] text-white text-[2rem] rounded-full px-[1rem] mb-[10px] cursor-pointer
                        md:text-[3rem] md:px-[25px] md:mb-[1.5rem]"
                        onClick={() => setIsModalOpen(true)}>+</p>
                    <div className="font-bold font-green border border-[#117a7a] rounded-[5px] px-[1rem] py-[5px]
                        hover:bg-[#117a7a] hover:text-white md:px-[2rem] md:py-[10px] cursor-pointer"
                        onClick={() => setIsModalOpen(true)}>
                        ADD ADDRESS
                    </div>

                    {
                        isModalOpen &&
                        
                        <AddAddressModal isOpen={isModalOpen} 
                            onClose={() => setIsModalOpen(false)}
                            heading={"Add New Address"} />
                    }
                </div>
                :
                <div className="bg-[#f2f2f2] text-[15px] text-black w-full md:w-[25rem]">
                    <div className="p-[1rem] sm:p-[2rem]">
                        <p className="font-bold text-[16px]">{user?.name}</p>
                        <p className="font-semibold">{user?.email}</p>

                        <div className="text-[13px] sm:text-[16px]">
                            <div className="flex items-center mt-[5px]">
                                <p>Street name: </p>
                                <p className="font-bold font-grey ml-[5px]">{address ? address?.street : "-"}</p>
                            </div>
                            <div className="flex items-center mt-[5px]">
                                <p>City: </p>
                                <p className="font-bold font-grey ml-[5px]">{address ? address?.city : "-"}</p>
                            </div>
                            <div className="flex items-center mt-[5px]">
                                <p>State: </p>
                                <p className="font-bold font-grey ml-[5px]">{address ? address?.state : "-"}</p>
                            </div>
                            <div className="flex items-center mt-[5px]">
                                <p>Country: </p>
                                <p className="font-bold font-grey ml-[5px]">{address ? address?.country : "-"}</p>
                            </div>

                            <div className="flex items-center mt-[5px]">
                                <p>Zip code: </p>
                                <p className="font-bold font-grey ml-[5px]">{address ? address?.zipCode : "-"}</p>
                            </div>

                            <button className="bg-white rounded-[5px] px-[10px] py-[4px] mt-[10px]
                                font-bold hover:bg-[#117a7a] hover:text-white" 
                                onClick={() => setIsModalOpen(true)}>
                                EDIT
                            </button>
                        </div>
                    </div>

                    {
                        isModalOpen &&
                        
                        <AddAddressModal isOpen={isModalOpen} 
                            onClose={() => setIsModalOpen(false)}
                            heading={"Edit Address"} />
                    }
                </div>
            }
        </>
    )
}