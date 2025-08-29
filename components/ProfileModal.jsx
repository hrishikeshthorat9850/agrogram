"use client";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import UserSidebar from "../components/UserProfileSidebar";
export default function ProfileModal(){
    const [isClick,setisClick] = useState(false);
    const handleClick = ()=>{
        setisClick((prev)=>!prev);
    }
    return(
        <div className="fixed top-0 right-0">
            <CgProfile className="text-4xl text-green-700 hover:text-black cursor-pointer mr-6 mt-6 " 
                onClick={handleClick}
            />
            {isClick ? <UserSidebar /> : null}
        </div>

    
        
    )
}