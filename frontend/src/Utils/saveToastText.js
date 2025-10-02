import Cookies from "js-cookie";

export const saveToastText = (text) =>{
    Cookies.set("techSphereActions", text,{expires:1});
}