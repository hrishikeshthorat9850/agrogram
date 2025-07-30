import { useContext } from "react";
import { languageProvider } from "../(context)/practiceContext";
import { useLanguage } from "../(context)/practiceContext";

export default function Practice(){
    const sampleLanguage = {
        Word : "Hello",
        language : "ENG"
    }
    const toggleLanguage = ()=>{
        const changeLanguage = sampleLanguage.language === "ENG"
    }
    return(
        <div>

        </div>
    )
}