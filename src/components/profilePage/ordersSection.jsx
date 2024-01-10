import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import NavbarForProfile from "./navBarForProfile";
import { UserContext } from "../../context/userContext";






export default function OrderSection() {
    const {isMobile}= useContext(ModalContext);
    const {orderList}= useContext(UserContext);

    // console.log("order list: ", orderList);

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

                    <div className="flex w-full border py-[0.5rem] items-center justify-center 
                        mt-[2rem] text-[22px] text-black">
                        list is available
                    </div>
                </div>
            }
            
        </>
    )
}