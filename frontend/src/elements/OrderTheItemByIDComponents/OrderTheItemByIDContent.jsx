import {Flex} from "@radix-ui/themes";

import OrderTheItemByIDAboutItem from "./OrderTheItemByIDAboutItem.jsx";


export default function OrderTheItemByIDContent({id}){
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return(
        <Flex width={"100%"} height={"100%"} justify={"center"} align={"center"}>
            <OrderTheItemByIDAboutItem id={id}/>
        </Flex>
    );
}
