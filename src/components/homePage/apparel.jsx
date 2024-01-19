import { useContext, useEffect, useState } from "react"
import Logo from "../../assets/svg/logo";
import { Link, useNavigate } from "react-router-dom";
import RenderNavbarTag from "./renderNavberTag";
import Menu from "../../assets/svg/menu";
import Empty_heart from "../../assets/svg/emptyHeart";
import PersonFilled from "../../assets/svg/personFilled";
import { UserContext } from "../../context/userContext";
import Searchbar from "./searchBar";
import CartIcon from "../../assets/svg/cartIcon";
import CloseButton from "../../assets/svg/closeButton";
import ChevronDown from "../../assets/svg/chevronDown";
import ChevronUp from "../../assets/svg/chevronUp";
import { apparelForKids, apparelForMen, apparelForWomen } from "../../utils/tags";





export default function Apparel({list}) {

    const {isAuthenticated, setIsAuthenticated, save_user_and_token, whishlistItems, itemsInCart,
        user, isMobile}= useContext(UserContext);

    const [isHovered, setIsHovered]= useState(false);

    const [isLoggedOut, setIsLoggedOut]= useState(false);
    const [isClickedOnMenu, setIsClickedOnMenu]= useState(false);
    const [isDropDownActive, setIsDropDownActive]= useState(false);


    const [activeRoute, setActiveRoute]= useState(
        {
            men: true,
            women: false,
            // kids: false,
        }
    );
    const [listInMenubar, setListInMenubar]= useState();

    const navigate= useNavigate();

    const [profileOptions, setProfileOptions]= useState([
        {option: "Orders", route: "orders"},
        {option: "Gift Vouchers", route: "my-gift-vouchers"},
        {option: "TSS Money", route: "my-money"},
        {option: "TSS Points", route: "my-points"},
        {option: "Saved Cards", route: "my-saved-cards"},
        {option: "Profile", route: `/myprofile/${user?.name}`},
        {option: "FAQs", route: "faqs"},
        {option: "Submit Design", route: "submit-art-work"},
    ]);

    const [aboutSection, setAboutSection]= useState([
        {
            title: "Careers", route: "careers"
        },
        {
            title: "Store Near Me", route: "store-near-me"
        },
        {
            title: "About Us", route: "about-us"
        },
        {
            title: "T&C", route: "t&c"
        },
        {
            title: "Privacy Policy", route: "privacy-policy"
        },
    ])

    useEffect(() => {
        if(isLoggedOut) {
            localStorage.removeItem("authToken");

            localStorage.removeItem("userInfo");
            save_user_and_token(null, null);
            setIsAuthenticated(false);
            navigate("/men");
        }
    }, [isLoggedOut]);

    useEffect(() => {
        if(activeRoute.men) {
            setListInMenubar(apparelForMen);
        } else if(activeRoute.women) {
            setListInMenubar(apparelForWomen);
        } else if(activeRoute.kids) {
            setListInMenubar(apparelForKids);
        }
    }, [activeRoute]);


    function handleChange(val) {

        const key= val.toLowerCase();

        setActiveRoute((old) => {
            const updatedState= {};

            Object.keys(old).forEach((route) => {
                updatedState[route]= route === key;
            })

            return updatedState;
        });
    }

    function sideBarMenu() {
        return (
            <div className="menu absolute bg-white top-0 left-0 w-full h-[2000px] z-30 sm:px-[1rem]">
                <div className="flex justify-between items-center py-[1rem]">
                    <div className="flex items-center">
                        <div className="">
                            <Link to={"/men"}>
                                <Logo width={"16px"} height={"16px"} color={"#f65757"} />
                            </Link>
                        </div>

                        {
                            isAuthenticated ?
                                <div className="font-medium text-[17px] ml-[1rem]">
                                    {
                                        user?.name.toUpperCase()
                                    }
                                </div>
                            :
                                <div className="ml-[1rem] text-[11px] border border-[#117a7a] text-[#117a7a] 
                                    rounded-[5px] cursor-pointer
                                    hover:bg-[#117a7a] hover:text-white 
                                    sm:ml-[3rem] sm:text-[13px]">
                                    <Link to={"/authentication"}>
                                        <p className="px-[15px] py-[5px] sm:px-[1.5rem] sm:py-[7px]">Logon/Register</p>
                                    </Link>
                                </div>
                        }
                    </div>

                    <div onClick={() => setIsClickedOnMenu(false)} 
                        className="cursor-pointer mr-[5px]">
                        <CloseButton width={"35px"} height={"35px"} effect={"hover:fill-[#e11b23]"} />
                    </div>
                    
                </div>

                <div className="py-[1rem] w-full h-max px-[1rem] border-b-[5px] border-[#ebebeb] sm:px-0">
                    <nav onClick={(e) => handleChange(e.target.innerText)}
                        className="flex flex-auto justify-between items-center grow h-[2.5rem]
                            w-full font-grey font-semibold text-[15px] bg-[#ebebeb] rounded-[10px]
                            shadow-[0px_0px_20px_-5px_rgba(0,0,0,0.5)]">
                        <p className={`${activeRoute.men ? "bg-white text-black rounded-[10px]" : ""} w-1/2 h-full
                            flex items-center justify-center pt-[2px]`}>Men</p>
                        <p className={`${activeRoute.women ? "bg-white text-black rounded-[10px]" : ""} w-1/2 h-full 
                            flex items-center justify-center pt-[2px]`}>Women</p>
                        {/* <p className={`${activeRoute.kids ? "bg-white text-black rounded-[10px]" : ""} w-1/3 h-full 
                            flex items-center justify-center pt-[2px]`}>Kids</p> */}
                    </nav>
 
                    <ul className="flex flex-col flex-wrap justify-center mt-[1.5rem] 
                        min-h-[2rem] sm:flex-row">
                        {
                            listInMenubar.map(item => {
                                const {category, isRoute, route, tagList}= item;
                                
                                
                                return <li key={category} className="sm:pl-[1.5rem] ">
                                    {
                                        isRoute ?
                                            <Link to={route}>
                                                <p className="py-[19px] w-full border-b-[5px] border-white hover:text-[#e11b23] 
                                                    hover:border-b-[5px] hover:border-[#e11b23] sm:w-max"
                                                    onClick={() => setIsClickedOnMenu(false)}>{category}</p>     
                                            </Link>
                                        :
                                            <RenderNavbarTag category={category} list={tagList} handleState= {setIsClickedOnMenu}
                                                effect={"w-full py-[19px] border-b-[5px] border-white hover:text-[#e11b23] hover:border-b-[5px] hover:border-[#e11b23] hover:bg-[#fbfbfb] sm:w-max"} /> 
                                    }
                                </li>
                            })
                        }
                    </ul>
                </div>

                <div className="border-b py-[10px] text-[15px] font-semibold px-[1rem]">
                    <Link to={"/membership"}>
                        <p className="text-[#ff7e33] cursor-pointer py-[10px]" onClick={() => setIsClickedOnMenu(false)}>Get Extra Discounts With Membership</p>
                    </Link>

                    {
                        isAuthenticated &&
                        <>
                            <Link to={"/profile"}>
                                <p className="cursor-pointer py-[10px]" onClick={() => setIsClickedOnMenu(false)}>My Account</p>
                            </Link>

                            <Link to={"/orders"}>
                                <p className="cursor-pointer py-[10px]" onClick={() => setIsClickedOnMenu(false)}>My Orders</p>
                            </Link>
                        </>
                    }

                    <Link to={"/contact-us"} >
                        <p className="cursor-pointer py-[10px]" onClick={() => setIsClickedOnMenu(false)} >Contact Us</p>
                    </Link>
                    
                    <Link to={"/faqs"}>
                        <p className="cursor-pointer py-[10px]" onClick={() => setIsClickedOnMenu(false)}>FAQs</p>
                    </Link>

                    <Link to={"/community-initiatives"}>
                        <p className="cursor-pointer py-[10px]" onClick={() => setIsClickedOnMenu(false)}>Community Initiatives</p>
                    </Link>
                </div>
                
                <div className="px-[1rem] text-[14px] font-medium w-full">
                    <div className="group flex justify-between items-center py-[10px]"
                        onClick={() => setIsDropDownActive((old) => !old)}>
                        <p className="group-hover:fill-[#e11b23] text-[15px] font-bold">More</p>

                        <div>
                            {
                                isDropDownActive ?
                                    <ChevronUp width={"15px"} height={"15px"} effect={"group-hover:fill-[#e11b23]"} color={"#585958"} />
                                :
                                    <ChevronDown width={"15px"} height={"15px"} effect={"group-hover:fill-[#e11b23]"} color={"#585958"} />
                            }
                        </div>
                    </div>

                    {
                        isDropDownActive && 
                            <ul className="text-black">
                                {
                                    aboutSection.map(item => {
                                        const {title, route}= item;

                                        return (
                                            <li key={title}>
                                                <Link to={`/${route}`}>
                                                    <p className="py-[5px]" onClick={() => setIsClickedOnMenu(false)}>{title}</p>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                    }
                </div>
            </div>
        )
    }


    function renderProfileModal(list) {
        return (
            <ul className="absolute top-[65px] right-0 font-semibold text-[15px] w-max min-w-[10rem]
                shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)] z-10 font-grey">
                <div className="p-[1rem] bg-white">
                    {
                        list.map((item) => {
                            const {option, route}= item;
                            return (
                                <li key={option} className="py-[3px] hover:text-[#e11b23]">
                                    <Link to={`/profile/${route}`}>
                                        <div className="flex">
                                            <p>{option}</p>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })
                    }
                    <li key={"sign-out"} className="py-[3px] cursor-pointer hover:text-[#e11b23]"
                        onClick={() => setIsLoggedOut(true)}>
                        <div className="flex">
                            <p>Sign Out</p>
                        </div>
                    </li>
                </div>
            </ul>
        )
    }

    function renderAccountSection() {
        return (
            <div className="flex items-center">
                <Searchbar />

                <Link to={"/wishlist"}>
                    <div className="relative px-[8px] mt-[6px] lg:px-[1rem] py-[16px] border-b-[5px] border-white 
                        hover:border-b-[5px] hover:border-[#e11b23] hover:bg-[#fbfbfb]">
                        <Empty_heart width={"22px"} height={"22px"} color={"#585958"} />

                        {
                            whishlistItems.length > 0 &&
                            <div className="absolute top-[5px] right-0 text-white bc-red rounded-full font-bold px-[5px]
                                lg:right-[5px]">
                                {whishlistItems.length}
                                
                            </div>
                        }
                    </div>
                </Link>
                
                
                <Link to={"/cart"}>
                    <div className="relative px-[8px] lg:px-[1rem] py-[19px] border-b-[5px] border-white 
                        hover:border-b-[5px] hover:border-[#e11b23] hover:bg-[#fbfbfb]">
                        <CartIcon width={"22px"} height={"22px"} color={"#585958"} />
                        {
                            itemsInCart.length > 0 &&
                            <div className="absolute top-[10px] right-0 text-white bc-red rounded-full font-bold px-[5px]
                                lg:right-[8px]">
                                {itemsInCart.length}
                                
                            </div>
                        }
                    </div>
                </Link>
                

                {
                    !isMobile && 
                    <div className="relative" 
                        onMouseOver={() => setIsHovered(true)}
                        onMouseOut={() => setIsHovered(false)}>
                        <Link to={isAuthenticated ? "/profile/orders" : "/authentication"}>
                            <div className="px-[10px] lg:px-[1rem] py-[19px] border-b-[5px] border-white 
                            hover:border-b-[5px] hover:border-[#e11b23] hover:bg-[#fbfbfb]">
                                <PersonFilled width={"22px"} height={"22px"} color={"#585958"} />
                            </div>
                        </Link>

                        {
                            (isHovered && isAuthenticated) && 
                                renderProfileModal(profileOptions)
                        }
                    </div>
                    
                }
            </div>
        )
    }

    return (
        <>
            {
                isMobile ? 
                <>
                    <div className="flex justify-between items-center w-full px-[7px] font-grey font-bold text-[14px]
                        shadow-[0_2px_3px_rgba(0,0,0,0.2)] sm:px-[1rem]">
                        <div onClick={() => setIsClickedOnMenu(true)}>
                            <Menu width={"30px"} height={"30px"} color={"#585958"} />
                        </div>

                        <Link to={"/men"}>
                            <Logo width={"16px"} height={"16px"} color={"#f65757"} />
                        </Link>

                        {
                            renderAccountSection()
                        }
                    </div>

                    {
                        isClickedOnMenu &&
                        <>
                            {
                                sideBarMenu()
                            }
                        </>
                    }
                </>

                :

                <div className=" w-full px-[3rem] font-grey font-bold text-[14px]
                    shadow-[0_2px_3px_rgba(0,0,0,0.2)]">
                    <div className="relative flex justify-between">
                        <div className="flex items-center">
                            <div className="xl:absolute xl:top-[-25px] xl:left-0">
                                <Logo width={"23px"} height={"16px"} color={"#f65757"} />
                            </div>

                            <ul className="flex flex-wrap items-center ml-[2rem] xl:ml-[10rem]">
                                {
                                    list.map(item => {
                                        const {category, isRoute, route, tagList}= item;
                                        
                                        
                                        return <li key={category} className="pl-[1rem]">
                                            {
                                                isRoute ?
                                                    <Link to={route}>
                                                        <p className="py-[19px] px-[10px] border-b-[5px] border-white hover:text-[#e11b23] 
                                                            hover:border-b-[5px] hover:border-[#e11b23]">{category}</p>     
                                                    </Link>
                                                :
                                                    <RenderNavbarTag category={category} list={tagList} 
                                                        effect={"py-[19px] px-[10px] border-b-[5px] border-white hover:text-[#e11b23] hover:border-b-[5px] hover:border-[#e11b23] hover:bg-[#fbfbfb]"} /> 
                                            }
                                        </li>
                                    })
                                }

                                <li key={"membership"} className="ml-[1rem] py-[19px] px-[10px] border-b-[5px] border-white 
                                    hover:text-[#e11b23] hover:border-b-[5px] hover:border-[#e11b23]">
                                    <Link to="/membership">
                                        <p>
                                            MEMBERSHIP
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                            
                            
                            
                        </div>

                        {
                            renderAccountSection()
                        }
                    </div>
                </div>
            }
        </>
    )
}