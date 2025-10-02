import {Box, Flex, Separator} from "@radix-ui/themes";
import "../MainPageComponents/MainPageContent.css";
import AdminProducts from "./AdminProducts.jsx";
import Toast from "../../vender components/components/Toast.jsx";

export default function AdminMainPageContent() {
    return(
        <Box width={"100%"} height={"100%"}>
            <Flex justify={"center"}>
                <p className={"mainPageH1"}>Продукти</p>
            </Flex>

            <Flex justify={"center"}>
                <Separator className={'contactTitleSeparator'}/>
            </Flex>

            <Flex justify={"center"} width={"100%"}>
                <AdminProducts />
            </Flex>

            <Toast/>
        </Box>
    );
}