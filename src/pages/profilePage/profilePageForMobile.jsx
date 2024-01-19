import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/svg/logo";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { optionsInAccountSection } from "../../utils/tags";




export default function ProfilePageForMobile() {
    const {user, save_user_and_token, setIsAuthenticated}= useContext(UserContext);

    const navigate= useNavigate();

    function signOut() {
        localStorage.removeItem("authToken");

        localStorage.removeItem("userInfo");
        save_user_and_token(null, null);
        setIsAuthenticated(false);
        navigate("/");
    }

    return (
        <div className="bg-white w-full h-full z-20">
            <div className="flex items-center py-[15px] border-b-[2px] border-[#117a7a]">
                <Link to={"/men"}>
                    <Logo width={"16px"} height={"16px"} color={"#f65757"} />
                </Link>
            
                <div className="ml-[1.5rem]">
                    <p className="text-[19px] font-green font-bold">{user?.name}</p>
                    
                    <div className="text-[12px]">
                        <p className="font-bold">(Member/Non Member)</p>
                        <p className="font-red underline underline-offset-1 decoration-[#e11b23]
                            hover:text-[#117a7a] hover:decoration-[#117a7a]">
                            <Link to={"/membership"}>
                                Get Exclusive Membership Now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <nav className="font-bold">
                <NavLink to={`/myprofile/${user?.name}`} 
                    className={({isActive}) => isActive ? "font-red" : ""}>
                    <div className={`p-[1rem] border-b-[2px] border-[#eee] hover:text-[#e11b23] cursor-pointer`}>
                        <p>Profile</p>
                    </div>
                </NavLink> 
                {
                    optionsInAccountSection.map((item, index) => {
                        const {title, route}= item;
                        return (
                            <NavLink to={`/${route}`}  key={title}
                                className={({isActive}) => isActive ? "font-red" : ""}>
                                <div className={`p-[1rem] cursor-pointer hover:text-[#e11b23] border-b-[2px] border-[#eee]`}>
                                    <p>{title}</p>
                                </div>
                            </NavLink>    
                        )
                    })
                }

                <div className="p-[1rem] border-b-[2px] border-[#eee] font-red cursor-pointer hover:bg-[#f2dede]" 
                    onClick={() => signOut()}>
                    Log out
                </div>
            </nav>
        </div>
    )
}