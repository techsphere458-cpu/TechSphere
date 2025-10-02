import "./OrderTheItemByIDAboutItem.css"
import {Box} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import axios from "axios";

export default function OrderTheItemByIDAboutItem({item}) {


    return (
        <>
            <Box width={"100%"}>
                <p className={"OrderTheItemByIDAboutItemText"}>- {item?.type} (1шт)</p>
                <p className={"OrderTheItemByIDAboutItemText"}>- {item?.model}</p>
                <p className={"OrderTheItemByIDAboutItemText"}>- {item?.price}</p>
                <p className={"OrderTheItemByIDAboutItemText"}>- {item?.isNew ? "Новий" : "Б/У"}</p>
            </Box>
        </>
    );
}