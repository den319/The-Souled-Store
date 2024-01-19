import { useContext } from "react";
import NavbarForProfile from "./navBarForProfile";
import Address from "../common/address";
import { UserContext } from "../../context/userContext";







export default function AddressSection() {
    const {isMobile}= useContext(UserContext);
    

    return (
        <>
            {
                isMobile && <NavbarForProfile />
            }
            <div className="w-full px-[1rem] text-[15px] text-[#a7a9ac]">
                <div className="flex w-full items-center justify-start px-[2rem] text-[15px] text-[#999]">
                    <Address />
                </div>
            </div>
        </>
    )
}