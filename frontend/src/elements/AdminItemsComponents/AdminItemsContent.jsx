import {Box, Flex, Separator} from "@radix-ui/themes";
import AdminItemsByType from "./AdminItemsByType.jsx";

export default function AdminItemsContent({type}){
    return(
        <Box width={"100%"} height={"100%"}>
            <Flex justify={"center"}>
                <p className={"productByIDH1"}>{type.trim()}</p>
            </Flex>

            <Flex justify={"center"}>
                <Separator className={'productByIDTitleSeparator'}/>
            </Flex>

            <Flex justify={"center"} width={"100%"}>
                <AdminItemsByType type={type.trim()}/>
            </Flex>
        </Box>
    );
}