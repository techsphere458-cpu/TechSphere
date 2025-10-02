import {Flex, Separator} from "@radix-ui/themes";

export default function TitleSeperated({text}){
    return(<>
        <Flex justify={"center"}>
            <p className={"mainPageH1"}>{text}</p>
        </Flex>
        <Flex justify={"center"}>
            <Separator className={'contactTitleSeparator'}/>
        </Flex>
        </>);
}