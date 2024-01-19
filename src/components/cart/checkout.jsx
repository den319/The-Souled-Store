import { useContext, useState } from "react"
import { UserContext } from "../../context/userContext"
import OrederBill from "./orderSectionForCart/OrderBill";
import { useNavigate, useParams } from "react-router-dom";
import AddAddressModal from "../modals/addAddressModal";
import DropDown from "./dropDown";
import CreditCard from "./orderSectionForCart/creditCard";
import NetBanking from "./orderSectionForCart/netbanking";
import { placeOrder, removeAllFromCart } from "../../utils/utilities";
import { cartUrl, orderListUrl } from "../../utils/apiUrl";






export default function Checkout() {

    const isChecked= useParams();
    const {user, itemsInCart, token, setItemsInCart, setTotalPrice, projectId, isMobile}= useContext(UserContext);

    const navigate= useNavigate();

    const [isDropdownOpened, setIsDropdownOpened]= useState(false);

    const [paymentMethod, setPaymentMethod]= useState({
        wallet: false,
        card: false,
        netBanking: false,
    });

    const [isModalOpen, setIsModalOpen]= useState(false);

    const [upiWallet, setUpiWallet]= useState({
        paytm: false,
        phonepe: false,
        freecharge:false,
    })

    function handleWallet(event) {
        const id= event.currentTarget.id;

        setUpiWallet((old) => {

            return {...Object.fromEntries(Object.keys(old).map(key => { 
                return [key, (key === id)]
            }))
        }
        })
    }

    function handleOrder() {
        try {
            itemsInCart.forEach(item => {
                placeOrder(orderListUrl.addOrder, item, user, token, projectId);
            })

            removeAllFromCart(cartUrl.deleteAll, setItemsInCart, setTotalPrice, token, projectId);

            navigate(isMobile ? "/orders" : "/profile/orders");
        } catch(error) {
            throw new Error("Error while placing order: ", error) 
        }
        
    }

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
                
                <div className="flex items-center font-green">
                    <p className="px-[5px]">- - - - - - - - - -</p>
                    <div className="pointer-events-none">
                        <p className="px-[5px]">PAYMENT</p>
                    </div>
                </div>
            </div>

            <div className="w-full xl:max-w-[1500px] flex flex-col justify-center items-center py-[10px] px-[1rem]">
            
                <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-start">

                    {/* address and payment section */}
                    <div className=" w-full lg:w-[500px] xl:w-[700px]">
                        
                        {/* address section */}
                        <div className="flex items-center text-[12px] justify-between border p-[10px] rounded-[3px]
                                sm:text-[15px] sm:p-[1rem]">
                            <div>
                                <p className="font-green font-bold">Deliver To: {user?.name.toUpperCase()}, {user?.address[0]?.zipCode}</p>

                                <div className="text-[12px] font-[#999] sm:text-[13px]">
                                    <div className="flex items-center gap-[3px]">
                                        <p>{user?.address[0]?.street ? user?.address[0]?.street : "-"},</p>
                                        <p>{user?.address[0]?.city ? user?.address[0]?.city : "-"}, </p>
                                        <p>{user?.address[0]?.state ? user?.address[0]?.state : "-"},</p> 
                                        <p>{user?.address[0]?.country ? user?.address[0]?.country : "-"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="font-bold border border-[#117a7a] rounded-[5px] 
                                bc-green text-white px-[1rem] py-[5px] ml-[10px] cursor-pointer
                                hover:bg-white hover:text-[#117a7a]" 
                                onClick={() => setIsModalOpen(true)}>
                                CHANGE
                            </div>
                        </div>

                        {/* payment option section */}

                        <div className="w-full mt-[1rem]">
                            <p>Payment Options</p>

                            <div className="w-full flex items-center justify-between mt-[1rem] bg-[#f2f2f2] p-[10px] sm:p-[1rem]">
                                <div className="flex items-center">
                                    <div className="w-[1.5rem] h-[1.5rem]">
                                        <img src="https://tss-static-images.gumlet.io/icons/tss-money.png" alt="ICON" />
                                    </div>

                                    <p className="ml-[10px] text-[14px]">TSS Money</p>
                                </div>

                                <div className="flex items-center text-[12px] pointer-events-none">
                                    <p>(Balance: ₹ 0.00)</p>
                                    <p className="h-[13px] px-[6px] ml-[8px] border border-[#999] rounded-full"></p>
                                </div>
                            </div>

                            <div className="my-[1rem]">

                                {/* wallet drop-down */}

                                <div>
                                    <DropDown name={"Pay with UPI" }
                                        isDropdownOpened={isDropdownOpened}
                                        setIsDropdownOpened={setIsDropdownOpened}
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}
                                        target="wallet">

                                        {
                                            (isDropdownOpened && paymentMethod["wallet"]) &&
                                                <div className="py-[1rem] px-[2rem]">
                                                    <div className="w-full text-[15px]">
                                                        {/* paytm */}
                                                        <div className="w-full flex items-center justify-between py-[10px] px-[1rem] rounded-[4px] cursor-pointer
                                                            hover:bg-[#f2f2f2]"
                                                            id="paytm"
                                                            onClick={(e) => handleWallet(e)}>
                                                            <div className="flex items-center">
                                                                <div className="w-[2.5rem] h-[2.5rem] rounded-full">
                                                                    <img src="https://cdn.icon-icons.com/icons2/730/PNG/512/paytm_icon-icons.com_62778.png" 
                                                                        alt="paytm" className={`w-full h-full rounded-full 
                                                                            ${upiWallet["paytm"] ? "border-[3px] border-[#37bdae]" : "" }`} />
                                                                </div>

                                                                <p className="ml-[1rem]">Paytm</p>
                                                            </div>
                                                            
                                                            <div className="flex items-center ">
                                                                <input type="radio" name="upi" value="paytm"
                                                                    className="w-[1rem] h-[1rem] cursor-pointer" 
                                                                    onClick={(e) => handleWallet(e)}
                                                                    defaultChecked={upiWallet["paytm"]} />
                                                            </div>
                                                        </div>

                                                        {/* phonePe */}

                                                        <div className="w-full flex items-center justify-between py-[10px] px-[1rem] rounded-[4px] cursor-pointer
                                                            hover:bg-[#f2f2f2]"
                                                            id="phonepe"
                                                            onClick={(e) => handleWallet(e)}>
                                                            <div className="flex items-center">
                                                                <div className="w-[2.5rem] h-[2.5rem] rounded-full">
                                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEVfJZ////9ZF5ycg8D39PpfH6BcIJ5XEZu1n9F2SKxVDJpkK6Lx7PfCsdlRAJhbHJ2GYrXOv+Hr5fP9+/5jLqGBWbLSxeNoM6RtOqdzQ6v08Picf8J8Ua9uPKiNarnFtNrl3e6njsjaz+eVdr7XzOa4pNOvmM3f1uumjcjm3u+/q9fDstlxRKjIudyXeb/FCSTHAAAEc0lEQVR4nO3d63LaOhSGYVlxJSJAAgzlZMIpDYVs9v1f3jbZmaTFWspM4mJp9Xv/dSad8TMhliULWwiEEEIIIYQQQgghhBBCCCHEI1XV9jH8uZS04r4sZ8a4tg/lT6SMnW93i6Io8t75wTIzKmlMeRpl740Gtu2Dai6l7Ww/zLOr+myIpnw6FNe8S9+ZEO2jT/fSmgVRbklglnU4EM1zQJgtTdvH9/XcPiTMJrLtA/x65kdIWMwZjIv2KUTsTRlcw4WJG82BeBcishgWw0QWFzfmIUTcMhgzPiA+6LaPr4HMwHtt+to9g2FR6DJAzGcMhkUhy9oE6r2RYDBmCLkKEHccTqjCzRc0kcdUyokRTWQxlRKqGyBymEpVRHGgiQMOY4ZQjiYWKw5jRkX8ThIXLMYMoSxN3DgeRD0kiUMWJ9RqNtUniSf+xJ9ciB2SuOcwlRIhYlGyGBZDKxv5jMUJNUQcSSZEs6SIj0zONoHFGx5TKREi8phKVekJtXjDYypVJSfUb5HDXamX5IxYvCnuWUylRGDxhsVdqZfknFjZ2HA52wg3Jogs7kq95NTRT4xuKiXtt88lNbF4s9VXP2hbvZ9q9r380/mF2fWPHX+M2xsoHTm0NVt7dxvN+TbCbN3WFNnS60sN97Ml4u2EGX/hXTvXrDcUDts52dxQ2NL13A2FI/bCYztCw16o6WVsJkI15S4UgfuCTIRqGtgvw0IoXBnYL9NkLY34F+K3c2h/XlPlLa5RKbtadt7yf2gPTx2qk180/P2nttNW1xmV1K8Z1/Meb99qIrPyC5e//4947kx1CSH5R6Tu/cKWphIfB2EtCKMLwloQRheEtSCMLghrQRhdENaCMLogrAVhdEFYC8LogrAWhNEFYS0IowvCWhBGFyGk96cnJ3T+LfgHPkLt34F/JI83OaH1b8DPx9Rd6uSE1Ea3ko2Q2ujWoTYxJyeUxLdgyR1NyQnJL2CUxH6Y5IRCEPvcqGdCpSe01AOF7vyXNekJDbGLKysGXmJ6Qkd+Vbt48HxQlZmlJhSWEmbZs7a/PG1HKWnstOO/kI1aGNo1fJ5MtTVGG2N195/9M/0UsIiFMvjEyyzf7Nb9zvp82IR33kYsFKqRTcMxC00j31CIWahWTeyKjlkYeiAUE6ESDfwSoxYKHXwMNAchNdNnJFTzL39OIxcKGX47AgOhsFvuwg9eHcBB+FViAkJh/+UuFHpOPIKGjVA42fn0qJGGsJpnrD778JNUhELZ8Sk0X1ycBokLL2tNen/2Lsbkm87E2nnyQnF5lpQsl/3dcfH6V5n3Nrv13WBqtUtwNZHo8qpAqcT4Urc6BVX/+n/ZjY3wNaWuX9jJTVgPwvSDMP0gTD8I0w/C9IMw/SBMPwjTj3pqHx+hIJ6dxUhI7CpmJHT+BVNGQmKbGCeh6voWxTkJhfO9smQSzUP2mshNH6+BPF6k+56yk2Hx6404Nq+3es9ZMx+8NeMHvKTcW6z+BhFCCCGEEEIIIYQQQgghhBBCCCH01/UfYcNS0Fh2weUAAAAASUVORK5CYII=" 
                                                                        alt="phonepe" className={`w-full h-full rounded-full 
                                                                            ${upiWallet["phonepe"] ? "border-[3px] border-[#37bdae]" : "" }`} />
                                                                </div>

                                                                <p className="ml-[1rem]">PhonePe</p>
                                                            </div>
                                                            
                                                            <div className="flex items-center ">
                                                                <input type="radio" name="upi" value="phonepe"
                                                                    className="w-[1rem] h-[1rem] cursor-pointer" 
                                                                    onClick={(e) => handleWallet(e)}
                                                                    defaultChecked={upiWallet["phonepe"]} />
                                                            </div>
                                                        </div>

                                                        {/* freecharge */}

                                                        <div className="w-full flex items-center justify-between py-[10px] px-[1rem] rounded-[4px] cursor-pointer
                                                            hover:bg-[#f2f2f2]"
                                                            id="freecharge"
                                                            onClick={(e) => handleWallet(e)}>
                                                            <div className="flex items-center">
                                                                <div className="w-[2.5rem] h-[2.5rem] rounded-full">
                                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xFVvPRzTh4k1egOU2pJbiedczBZm-JQ7_w&usqp=CAU" 
                                                                        alt="freecharge" className={`w-full h-full rounded-full 
                                                                            ${upiWallet["freecharge"] ? "border-[3px] border-[#37bdae]" : "" }`} />
                                                                </div>

                                                                <p className="ml-[1rem]">FreeCharge</p>
                                                            </div>
                                                            
                                                            <div className="flex items-center ">
                                                                <input type="radio" name="upi" value="freecharge"
                                                                    className="w-[1rem] h-[1rem] cursor-pointer" 
                                                                    onClick={(e) => handleWallet(e)}
                                                                    defaultChecked={upiWallet["freecharge"]} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        } 
                                        
                                    </DropDown>
                                </div>

                                {/* credit-card */}
                            
                                <div>                                    
                                    <DropDown name={"Credit & Debit Cards" }
                                        isDropdownOpened={isDropdownOpened}
                                        setIsDropdownOpened={setIsDropdownOpened}
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}
                                        target="card">
                                            
                                            {
                                                (isDropdownOpened && paymentMethod["card"]) &&
                                                <CreditCard />
                                            }

                                    </DropDown>
                                </div>
                                
                            

                                {/* net-banking */}

                                <div>
                                    <DropDown name={"Netbanking" }
                                        isDropdownOpened={isDropdownOpened}
                                        setIsDropdownOpened={setIsDropdownOpened}
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}
                                        target="netBanking">

                                            {
                                                (isDropdownOpened && paymentMethod["netBanking"]) &&
                                                <NetBanking />
                                            }

                                    </DropDown>
                                </div>
                            </div>
                        </div>
                        {
                            isModalOpen && <AddAddressModal isOpen={isModalOpen} 
                                onClose={() => setIsModalOpen(false)}
                                heading={"Edit Address"} />
                        }
                    </div>

                    {/* order section */}
                    <div className="w-full mt-[1rem] md:w-[23rem] md:ml-[2rem] md:mt-[1px]">
                        <OrederBill isChecked= {isChecked.true === "true"} />

                        
                        <button className="w-full mt-[1rem] py-[8px] font-green text-[13px] font-bold border border-[#117a7a] 
                            duration-500
                            hover:bg-[#117a7a] hover:text-white md:border md:rounded-[5px]"
                            onClick={() => handleOrder()}>
                            CONFIRM ORDER
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}  