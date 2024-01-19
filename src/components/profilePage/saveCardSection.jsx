import { useContext } from "react";
import NavbarForProfile from "./navBarForProfile";
import { UserContext } from "../../context/userContext";






export default function SaveCardSection() {
    const {isMobile}= useContext(UserContext);

    return (
        <>
            {
                isMobile && <NavbarForProfile />
            }
            <div className="w-full p-[1rem] text-[15px] text-[#a7a9ac]">
                <p>SAVED CARDS</p>

                <div className="flex flex-col items-center mt-[2rem]">
                <div className="w-[160px] h-[130px]">
                    <img src="https://prod-img.thesouledstore.com/public/theSoul/images/no-cards.png?format=webp&w=900&dpr=1.3" alt="save-cards" />
                </div>

                <p className="font-bold text-black mt-[1rem]">SAVE YOUR CREDIT/ DEBIT CARDS</p>

                <div className="flex flex-col items-center text-[14px] my-[1.5rem]">
                    <p>It's convenient to pay with saved cards.</p>
                    <p>Your card information will be secure, we use 128-bit encryption</p>
                </div>

                <div className="bg-[#117a7a] border border-[#117a7a] rounded-[4px] text-white
                        cursor-not-allowed px-[4rem] py-[8px]
                        hover:bg-white hover:text-[#117a7a]">
                        ADD CARD 
                </div>
                </div>
            </div>
        </>
    )
}