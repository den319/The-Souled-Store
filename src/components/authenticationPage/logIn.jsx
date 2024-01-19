import { useNavigate } from "react-router-dom";
import FacebookIcon from "../../assets/svg/facebookIcon";
import GoogleIcon from "../../assets/svg/googleIcon";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Password from "./password";




export default function LogIn() {

    const {projectId, setIsAuthenticated, save_user_and_token}= useContext(UserContext);

    const navigate= useNavigate();
    
    const [isPasswordHidden, set_hiddenness_of_password]= useState(true);
    const [errorState, set_error_state]= useState("");

    const [userInfo, set_user_info]= useState({
        email: '',
        password: '',
        appType: 'ecommerce',
    });

    function handle_change(event) {
        const element= event.target;

        const {name, value}= element;

        set_user_info((old_info) => {
            return {
                ...old_info,
                [name]: value,
            };
        });
    }
 
    function handle_submit(event) {
        event.preventDefault();

        if(!userInfo.email || !userInfo.password) {
            set_error_state('*Please enter email and password');
            return;
        } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userInfo.email)) {
            set_error_state("*Format of email is not correct");
            return;
        }
        
        sign_in(userInfo);
    }

    async function sign_in(userInfo) {
        try {
            var myHeaders = new Headers();
            myHeaders.append("projectId", {projectId});
            myHeaders.append("Content-Type", "application/json");
        
            const url = "https://academics.newtonschool.co/api/v1/user/login";
            var payload = {
                ...userInfo,
            };
        
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(payload),
                redirect: "follow",
            };
        
            const response = await fetch(url, requestOptions);
        
            if (response.ok) {
                const data = await response.json();
                
                const { token, data: loginData } = data;
                localStorage.setItem("authToken", token);
                localStorage.setItem("userInfo", JSON.stringify(loginData));
                save_user_and_token(loginData, token);

                setIsAuthenticated(true);
                navigate("/men");
            } else {
                set_error_state("Password or email is incorrect");
            }
        } catch (error) {
        //   console.log(error);
            navigate("/error");
        }
    }

    return (
        <>
            <p className="font-grey font-semibold text-[16px] my-[1rem]">Login with The Souled Store</p>

            <div className="bg-[#e6e7e8] border border-black w-full font-grey 
                text-[14px] font-bold">
                <div className="px-[1rem] py-[2rem] w-full min-[426px]:p-[2rem]">
                    {/* 3rd party */}
                    <div className="flex items-center justify-between">
                        <div className="flex justify-center bg-white cursor-not-allowed">
                            <div className="py-[5px] px-[10px] flex items-center justify-center
                                bg-[#6081c0] ">
                                <FacebookIcon color={"#ffffff"} />
                            </div>

                            <p className="pl-[10px] p-[6px] border-l ">Facebook</p>
                        </div>

                        <div className="flex justify-center bg-white cursor-not-allowed">
                            <div className="py-[5px] px-[10px] flex items-center justify-center
                                bg-[#ee4335]">
                                <GoogleIcon color={"#ffffff"} />
                            </div>

                            <p className="pl-[10px] p-[6px] border-l ">Google</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center my-[2rem]">
                        <p>-</p>
                        <p className="mx-[5px]">OR</p>
                        <p>-</p>
                    </div>

                    {/* form */}

                    <form className="flex flex-col w-full text-[14px] font-bold" onSubmit={(event) => handle_submit(event)}>
                        <input type="email" placeholder="Your email address" name="email" inputMode="email"
                            className="w-full border-[1px] border-[#ccc] mb-[0.5rem] rounded-[4px] px-[8px] py-[6px] text-black" 
                            onChange={(event) => handle_change(event)}/>
        
                        <Password callbackFunction={handle_change} placeholderText={"Enter password"} />

                        {
                            errorState && <div className="text-[#ff0000] font-semibold">{errorState}</div>
                        }

                        <input type="submit" 
                            className="w-full my-[1.5rem] rounded-[3px] py-[7px] cursor-pointer bc-green text-white text-[16px]
                                hover:bg-black duration-500 "/>
                    </form>

                    {/* path to go to register route */}

                    <div className="flex justify-center items-center font-medium mt-[0.5rem]">
                        <p>New User?</p>
                        
                        <p onClick={() => navigate("/authentication/register")}
                            className="ml-[5px] font-red underline underline-offset-2 underline-[#e11b23] cursor-pointer
                            hover:text-[#117a7a] hover:underline-[#117a7a]">
                            Create Account
                        </p>
                        
                    </div>
                </div>
            </div>
        </>
    )
}