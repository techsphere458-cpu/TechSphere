import {Box, Flex, Separator} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import axios from "axios";
import "./MainProductByIdContent.css"
import ProductByIDProducts from "./ProductByIDProducts.jsx";

export default function MainProductByIdContent({type}){
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return(
        <Box width={"100%"} height={"100%"}>
            <Flex justify={"center"}>
                <p className={"productByIDH1"}>{type.trim()}</p>
            </Flex>

            <Flex justify={"center"}>
                <Separator className={'productByIDTitleSeparator'}/>
            </Flex>

            <Flex justify={"center"} width={"100%"}>
                <ProductByIDProducts type={type.trim()}/>
            </Flex>
        </Box>
    );
}