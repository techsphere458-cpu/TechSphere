import {useEffect, useState} from "react";
import axios from "axios";
import DefaultComponent from "../../DefaultComponent.jsx";
import AdminMainPageContent from "../../elements/AdminComponents/AdminMainPageContent.jsx";
import NotAdmin from "../../elements/AdminComponents/NotAdmin.jsx";


export default function Admin() {
    const baseURL = import.meta.env.VITE_BASE_URL;

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (baseURL === "/api") {
            axios.get(`${baseURL}/getUserInfo`, {withCredentials: true}).then((response) => setUser(response.data));
        } else {
            setUser({email: "mykola.chichkalenko@gmail.com", isAdmin: true})
        }
    }, []);

    useEffect(() => {
        if (!user) return;
        if (!user.email) window.location.href = "/oauth2/authorization/google";

    }, [user]);
    return (
        <>
            <DefaultComponent><AdminMainPageContent/></DefaultComponent>
        </>
    );
}