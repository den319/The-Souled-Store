import { useContext, useState } from "react"
import { UserContext } from "../../context/userContext"
import { Link } from "react-router-dom";
import NavbarForProfile from "./navBarForProfile";
import { updateUserInfo } from "../../utils/utilities";
import GenderModal from "../modals/genderModal";
import { userData } from "../../utils/apiUrl";

 



export default function EditProfileSection() {

    const { user, saveUser, token, projectId, isMobile}= useContext(UserContext);

    const nameArr= user?.name?.split(" ");
    const [name, setName]= useState(nameArr?.[0]);
    const [surname, setSurname]= useState(nameArr?.[1]);

    const [userInfo, setUserInfo]= useState({
        firstName: "",
        lastName: "",
        phone: "",
    });

    const [isGenderModalOpen, setIsGenderModalOpen]= useState(true);

    const [gender, setGender]= useState("others");
    const [error, setError]= useState("");

    function handleChange(event) {
        const name= event.target.name;
        const value= event.target.value;

        setUserInfo((old) => {
            return {
                ...old,
                [name]: value,
            }
        });
        setError("");
    }

    function formValidation(event) {
        event.preventDefault();

        if(!/^[a-zA-Z]+(?:['\s-][a-zA-Z]+)*$/.test(userInfo.firstName)) {
            setError("*First name should only contain letters and spaces.");
            return;
        } else if (!/^[a-zA-Z]+(?:['\s-][a-zA-Z]+)*$/.test(userInfo.lastName)) {
            setError("*Last name should only contain letters and spaces.");
            return;
        } else if (!/[0-9]/.test(userInfo.phone) || userInfo.phone.length !== 10 ) {
            setError("*Enter valid mobile number.");
            return;
        } 

        updateUserInfo(userData.updateData ,userInfo, user, saveUser, token, projectId)
    }   

    return (
        <>
            {
                isMobile && <NavbarForProfile />
            }

            <div className="w-full p-[1rem] text-[15px] text-black">
                {
                    isGenderModalOpen &&
                    <GenderModal setGender={setGender} isOpen={isGenderModalOpen} 
                        onClose= {() => setIsGenderModalOpen(false)} />
                }
                <p className="text-[#a7a9ac]">EDIT PROFILE</p>

                <div className="mt-[1rem]">
                <div className="p-[1rem] border sm:p-[2rem]">
                        <p>Email Id</p>
                        <p className="bg-[#eceeef] border border-[#ccc] rounded-[10px] px-[1rem] mt-[5px] 
                            py-[5px] w-min pointer-events-none font-grey">
                            {user?.email}
                        </p>
                </div>

                <div className="flex flex-col items-center border p-[1rem] sm:p-[2rem]">
                        <div className="flex justify-start w-full pb-[1.5rem]">
                            General Information
                        </div>

                        <div className="flex flex-col w-full justify-between border-y py-[1.5rem] sm:flex-row">
                            <div className="flex flex-col items-start justify-start w-full">
                                <div className="flex flex-col w-3/4">
                                    <label htmlFor="first-name" className="mb-[5px]">First Name*</label>
                                    <input type="text" name="firstName" id="first-name" placeholder={(user?.name && userInfo.firstName !== "") ? "" : "First name*"}
                                        defaultValue={user?.name ? `${name}` : ""} required
                                    className="border border-[#ccc] rounded-[10px] px-[10px] py-[5px]" 
                                    onChange={(e) => handleChange(e)}/>
                                </div>
                                <div className="flex flex-col w-3/4 mt-[15px]">
                                    <label htmlFor="last-name" className="mb-[5px]">Last Name*</label>
                                    <input type="text" name="lastName" id="last-name" placeholder={(user?.name && userInfo.lastName !== "") ? "" : "Last name*"}
                                        defaultValue={user?.name ? surname : ""} required 
                                        className="border border-[#ccc] rounded-[10px] px-[10px] py-[5px]"
                                        onChange={(e) => handleChange(e)} />
                                </div> 

                                <div className="mt-[15px]">
                                    <div>
                                        Gender
                                    </div>

                                    <div className="flex items-center flex-wrap mt-[5px]">
                                        <div className="flex items-center cursor-pointer mr-[1rem]">
                                            <input type="radio" id="male" name="gender" value={"Male"} checked= {gender === "male"} readOnly= {true}
                                                className="w-[1rem]" />
                                            <label htmlFor="male" className="ml-[5px]">Male</label>
                                        </div>
                                        <div className="flex items-center cursor-pointer mr-[1rem]">
                                            <input type="radio" id="female" name="gender" value={"Female"} checked= {gender === "female"} readOnly= {true}
                                                className="w-[1rem]" />
                                            <label htmlFor="female" className="ml-[5px]">Female</label>
                                        </div>
                                        <div className="flex items-center cursor-pointer">
                                            <input type="radio" id="other" name="gender" value={"Other"} checked= {gender === "others"} readOnly= {true}
                                                className="w-[1rem]" />
                                            <label htmlFor="other" className="ml-[5px]">Other</label>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="w-full flex flex-col items-start justify-start w-full mt-[1rem] sm:mt-0">
                                <div className="flex flex-col w-3/4">
                                    <label htmlFor="phone" className="mb-[5px]">Mobile Number*</label>
                                    <input type="tel" name="phone" id="phone" placeholder={(user?.phone && userInfo.phone !== "") ? "" : "Mobile Number*"}
                                        defaultValue={user?.phone ? user?.phone : ""} required
                                        className="border border-[#ccc] rounded-[10px] px-[10px] py-[5px]"
                                        onChange={(e) => handleChange(e)} />
                                </div>

                                <div className="w-full flex items-center justify-center sm:justify-start">
                                    <Link to={isMobile ? "/address" : "/profile/address"}>
                                        <div className="mt-[2rem] text-center
                                            bg-[#117a7a] border border-[#117a7a] rounded-[4px] text-white
                                            cursor-pointer px-[4rem] py-[8px] text-[12px] font-bold
                                            hover:bg-white hover:text-[#117a7a]">
                                            Edit/Change Address
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>  

                        {
                            error != "" && 
                            <div className="mt-[10px] bg-[#ffe3e4] font-red px-[5px]">
                                {error}
                            </div>
                        }           

                        <div className="bg-[#117a7a] border border-[#117a7a] rounded-[4px] text-white
                            cursor-pointer px-[4rem] py-[8px] text-[12px] font-bold mt-[1.5rem]
                            hover:bg-white hover:text-[#117a7a]"
                            onClick={(e) => formValidation(e)}>
                            SAVE
                        </div>
                </div>
                </div>
            </div>
        </>
    )
}