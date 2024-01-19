import { useContext } from "react";
import NavbarForProfile from "./navBarForProfile";
import { UserContext } from "../../context/userContext";





export default function MoneySection() {
    const {isMobile}= useContext(UserContext);

    return (
        <>
            {
                isMobile && <NavbarForProfile />
            }
            <div className="w-full p-[1rem] text-[15px] text-[#a7a9ac]">
                <p>MY TSS MONEY</p>

                <div className="mt-[2rem]">
                    <div className="text-[12px]">
                        <div className="flex flex-col items-center justify-center py-[2rem] border">
                            <div className="w-[75px] h-[75px]">
                                <img src="https://tss-static-images.gumlet.io/icons/tss-money.png" alt="image" />
                            </div>
                            <p className="text-[10px]">A quick and convenient way to pay and refund</p>
                        </div>

                        <div className="flex items-center justify-around py-[2rem] border">
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-[40px] h-[40px]">
                                    <img src="https://constant.myntassets.com/mymyntra/assets/img/instant-cashback.svg" alt="image" />
                                </div>
                                <div className="flex flex-col items-center justify-center mt-[1rem]">
                                    <p className="font-bold font-grey">INSTANT CHECKOUT</p>
                                    <p>One-click easy and fast checkout</p>
                                </div>

                            </div>

                            <div className="flex flex-col items-center justify-center pl-[2rem] mt-[7px]">
                                <div className="w-[45px] h-[45px]">
                                    <img src="https://constant.myntassets.com/mymyntra/assets/img/faster-refunds.svg" alt="image" />
                                </div>
                                <div className="flex flex-col items-center justify-center mt-[5px]">
                                    <p className="font-bold font-grey">FASTER REFUNDS</p>
                                    <p>Get instant prizes as TSS points</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-around py-[2rem] border">
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-[40px] h-[40px]">
                                    <img src="https://constant.myntassets.com/mymyntra/assets/img/consolidated-money.svg" alt="image" />
                                </div>
                                <div className="flex flex-col items-center justify-center mt-[1rem]">
                                    <p className="font-bold font-grey">CONSOLIDATED MONEY</p>
                                    <p>Refunds and cashbacks in one place</p>
                                </div>

                            </div>

                            <div className="flex flex-col items-center justify-center pl-[2rem] mt-[7px]">
                                <div className="w-[45px] h-[45px]">
                                    <img src="https://constant.myntassets.com/mymyntra/assets/img/mode-benifits.svg" alt="image" />
                                </div>
                                <div className="flex flex-col items-center justify-center mt-[5px]">
                                    <p className="font-bold font-grey">MANY MORE BENEFITS</p>
                                    <p>Benefits and offers on using TSS Money</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-[2rem] border font-bold text-black">
                        <p className="text-[15px]">TOTAL TSS POINTS</p>
                        <p className="text-[30px] mt-[1.5rem]">0.00</p>
                    </div>

                    <div className="p-[2rem] border">
                        <p className="font-bold text-black">PLEASE NOTE</p>
                        <li className="mt-[10px] font-grey">You can use 20% of your total points for every order.</li>
                        <li className="mt-[10px] font-grey">Can be clubbed with gift vouchers and discount codes.</li>
                        <li className="mt-[10px] font-grey">Applicable on products on offer/sale.</li>
                    </div>
                </div>
            </div>
        </>
    )
}