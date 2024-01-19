import { useContext } from "react";
import NavbarForProfile from "./navBarForProfile";
import { UserContext } from "../../context/userContext";





export default function VoucherSection() {
    const {isMobile}= useContext(UserContext);

    return (
        <>
            {
                isMobile && <NavbarForProfile />
            }
            <div className="w-full p-[1rem] text-[15px] text-[#a7a9ac]">
                <p>MY GIFT VOUCHER</p>

                <div className="flex w-full border py-[0.5rem] items-center justify-center 
                    mt-[2rem] text-[22px] text-black">
                    My Voucher list is empty
                </div>
            </div>
        </>
    )
}