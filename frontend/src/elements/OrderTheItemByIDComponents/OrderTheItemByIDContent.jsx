import {Box, Flex, Separator} from "@radix-ui/themes";
import "./OrderTheItemByIDContentContainer.css";
import OrderTheItemByIDTitle from "./OrderTheItemByIDTitle.jsx";
import OrderTheItemByIDAboutItem from "./OrderTheItemByIDAboutItem.jsx";
import OrderTheItemByIDForm from "./OrderTheItemByIDForm.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export default function OrderTheItemByIDContent({id}){
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [item, setItem] = useState(null);

    useEffect(() => {
        if (!id) return;

        if (baseUrl === "/api") {
            axios.get(`${baseUrl}/item/${id}`).then(resp => setItem(resp.data));
        }else{
            setItem({id: id, type: "Матриці", model: "FDDFHSLHFLSDKFGIU", price: "1200 грн", isNew: false});
        }
    }, [id]);

    return(
        <Flex width={"100%"} height={"100%"} justify={"center"} align={"center"}>
            <Flex className={"orderTheItemByIDContentContainer"}>
                <Box className={"orderTheItemByIDContentTitle"} >
                    <OrderTheItemByIDTitle/>
                    <Separator size={"4"} orientation={"horizontal"} style={{backgroundColor:"white"}}/>
                </Box>
                <Flex className={"orderTheItemByIDAboutItemContainer"}>
                    <OrderTheItemByIDAboutItem item={item}/>
                </Flex>
                <Flex className={"orderTheItemByIDFormContentContainer"} >
                    <Separator className={"orderTheItemByIDContentFormSeparator"} size={"4"} orientation={"horizontal"}/>
                    <OrderTheItemByIDForm item={item}/>
                </Flex>
            </Flex>
        </Flex>
    );
}
