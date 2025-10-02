import {Box, Flex, Separator} from "@radix-ui/themes";
import "./ContactsElement.css"

export default function ContactsElement() {

    return (
        <Box width={"100%"} height={"300px"}>
            <Flex justify={"center"} align={"center"}>
                <h1 className={"contactH1"}>Контакти</h1>

            </Flex>
            <Flex justify={"center"}>
            <Separator className={'contactTitleSeparator'}/>
            </Flex>

            <Box position={"relative"}>
                <Separator orientation={"vertical"} size={"3"} className={"contactSeparator"}/>
                <Separator orientation={"vertical"} size={"3"} className={"contactSeparator"}/>
                <Separator orientation={"vertical"} size={"3"} className={"contactSeparator"}/>
            </Box>

            <Box className={"contactContainer"}>
                <p>тел: <span>093 77-026-77</span></p>
                <p>адреса: <span> м. Біла Церква Героїв Небесної Сотні 18 </span> </p>
            </Box>

        </Box>
    )
}