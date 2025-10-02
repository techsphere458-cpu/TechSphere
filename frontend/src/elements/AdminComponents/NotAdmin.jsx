import {Button, Flex, Text} from "@radix-ui/themes";

export default function NotAdmin(){
    return(
        <Flex width={"100%"} height={"80%"} justify={"center"} align={"center"} direction={"column"}>
            <Text style={{fontSize:"50px",fontWeight:"bold"}}>Ви не адмін</Text>
            <Button size={"3"} style={{marginTop:"10px",cursor:"pointer"}} onClick={() => window.location.href= "/"}>Назад</Button>
        </Flex>
    )
}