import {Box, Flex, Separator} from "@radix-ui/themes";
import "./MainPageContent.css";
import "../ContactsComponents/ContactsElement.css"
import MainPageProducts from "./MainPageProducts.jsx";
import {useEffect} from "react";
import {saveToastText} from "../../Utils/saveToastText.js";
import TitleSeperated from "../../vender components/components/TitleSeperated.jsx";

export default function MainPageContent() {


    return (
        <Box width={"100%"} height={"100%"}>
            <TitleSeperated text={"Продукти"}/>

            <Flex justify={"center"} width={"100%"}>
                <MainPageProducts/>
            </Flex>
        </Box>
    )
}

