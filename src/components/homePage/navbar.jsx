
import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../../context/userContext";




export default function Navbar() {

    const {setActiveTab}= useContext(UserContext);

    const navLinks= [
        {link: "WOMEN", route: "women"},
        {link: "MEN", route: "men"},
        // {link: "KIDS", route: "/kids"}
    ];

    return (
        <div className="text-[20px] bc-red w-full text-white">
            <div className="flex flex-col items-center justify-center w-full lg:w-[930px] xl:w-[1130px] 2xl:w-full">
                <div className="flex items-center justify-between w-full p-[1rem] text-[14px] 
                    bg-[#e6e7e8] font-grey lg:hidden">
                    <p>
                        Download Our App & Get 10% Additional Cashback On All Orders
                    </p>

                    <div className="flex flex-nowrap ml-[1rem]">
                        <button className="border-2 border-black rounded-[10px] px-[1rem] py-[5px]">
                            OPEN APP
                        </button>
                    </div>
                </div>

                <div className="flex justify-center w-full lg:justify-between 2xl:justify-around">
                    <div className="flex flex-1 w-full text-[14px] font-bold lg:ml-[8rem] xl:ml-[15rem]">
                        {
                            navLinks.map(item => {
                                const {link, route}= item;

                                return (
                                    <NavLink key={link} to={`/${route}`} 
                                        onClick={() => setActiveTab(route)}
                                        className={({ isActive }) =>
                                        isActive ? "bg-white font-grey w-1/2 lg:w-min"
                                         : 
                                        "w-1/2 bc-red text-white border-x-[0.5px] border-black hover:bg-[#df7c7c] lg:w-min"}>
                                            <div className="cursor-pointer flex items-center justify-center w-full px-[25px] py-[12px]">
                                                {link}
                                            </div>
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                    
                    <Outlet />

                    <div className="text-[13px] items-center hidden lg:flex xl:pr-[3.5rem]">
                        <div className="m-[10px]">
                            <Link to= {"/profile/orders"}>TRACK ORDER</Link>
                        </div>
                        <div className="m-[10px]">
                            <Link to= {"/"}>CONTACT US</Link>
                        </div>
                        <div className="m-[10px]">
                            <a href="https://play.google.com/store/apps/details?id=com.thesouledstore">DOWNLOAD APP</a>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}