import { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { optionsInAccountSection } from "../../utils/tags";






export default function ProfilePageForDeskTop() {

    const {setIsAuthenticated, save_user_and_token, user, token}= useContext(UserContext);

    const navigate= useNavigate();

    function signOut() {
        localStorage.removeItem("authToken");

        localStorage.removeItem("userInfo");
        save_user_and_token(null, null);
        setIsAuthenticated(false);
        navigate("/men");
    }

    return (
        <div className="w-full py-[2rem] px-[5rem] xl:px-[10rem] 2xl:px-[15rem]">
            <div className="w-full flex justify-center mr-[3rem]">
                <div className="min-w-[260px] font-grey text-[15px] 2xl:min-w-[290px]">
                    <div className="bg-[#f1f1f1]">
                        <div className="p-[1rem]">
                            <p className="text-[15px] font-bold">{user?.name}</p>
                            <p className="text-[12px] pt-[2px]">{user?.email}</p>
                            <NavLink to={"/membership"}>
                                <p className="text-[10px] underline underline-[#e76a51] underline-offset-3 font-red
                                cursor-pointer pt-[5px]
                                hover:underline-[#000000] hover:text-black">Get Membership Now</p>
                            </NavLink>
                        </div>
                    </div>

                    <nav className="border-[2px] border-[#eee] rounded-[10px] mt-[2rem]">
                        {
                            optionsInAccountSection.map((item, index) => {
                                const {title, route}= item;

                                return (
                                    <NavLink to={route} key={title}
                                        className={({isActive}) => isActive ? "font-red" : ""}>
                                        <div className={`p-[1rem] hover:text-[#e11b23] border-b-[2px] border-[#eee]"`}>
                                            <p>{title}</p>
                                        </div>
                                    </NavLink>    
                                )
                            })
                        }

                        <NavLink to={`${user?.name}`}
                            className={({isActive}) => isActive ? "font-red" : ""}>
                            <div className={`p-[1rem] hover:text-[#e11b23]`}>
                                <p>Profile</p>
                            </div>
                        </NavLink> 
                    </nav>

                    <div className="mt-[1.5rem]">
                        <NavLink to={"/submit-art-work"}
                            className={({isActive}) => isActive ? "font-red" : ""}>
                            <div className={`p-[1rem] hover:text-[#e11b23] border-[2px] border-[#eee] rounded-[10px]`}>
                                <p>Submit Design</p>
                            </div>
                        </NavLink> 
                    </div>
                    
                    
                    <div className="cursor-pointer font-semibold rounded-[6px]
                        py-[8px] border border-[#e11b23] mt-[2rem]
                         font-red flex justify-center hover:text-white hover:bg-[#e11b23]" 
                        onClick={() => signOut()}>
                        LOGOUT
                    </div>
                </div>

                <Outlet />
            </div>
        </div>
    )
}