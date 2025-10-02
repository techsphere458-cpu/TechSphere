import "./OrderTheItemByIDForm.css"
import {Button, Flex, Tooltip} from "@radix-ui/themes";
import CustomInput from "../../vender components/components/CustomInput.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function OrderTheItemByIDForm({item}) {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (name.trim().length > 0 && name.trim().length < 20 && phone.trim().length <= 13 && phone.trim().length >= 10) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [name, phone]);


    const handleSubmit = () => {
        axios.post(`${baseUrl}/order/submit`, {
            type: item?.type, model: item?.model, price: item?.price, isNew: item?.isNew,
            phone: phone,
            name: name
        }).then(res => res.data === "success" ? window.location.href = `/order/success/${encodeURIComponent(name)}` : alert("Щось пішло не так, спробуйте пізніше"))
            .catch((err) => alert("Щось пішло не так, спробуйте пізніше"));


        setPhone("");
        setName("");
    };


    return (
        <Flex width={"100%"} height={"100%"} direction={"column"} align={"center"}
              className={"orderTheItemByIDFormContainer"}>
            <Flex width={"100%"} justify={"center"}>
                <CustomInput placeholder={"Ваше ім'я"} type={"text"} onChange={setName} value={name}/>
            </Flex>
            <Flex width={"100%"} justify={"center"} className={"orderTheItemByIDFormInputMarginTop"}>
                <CustomInput placeholder={"Ваш номер телефону"} type={"number"} onChange={setPhone} value={phone}/>
            </Flex>
            <Flex width={"100%"} justify={"center"} className={"orderTheItemByIDFormButtonMarginTop"}>
                <Tooltip content={isValid ? "надіслати нам" : "невірний номер або ім'я"}
                         style={isValid ? {backgroundColor: "green"} : {backgroundColor: "red"}}>
                    <button disabled={!isValid} className="boton-elegante" onClick={handleSubmit}>Надіслати</button>
                </Tooltip>
            </Flex>
        </Flex>
    );
}