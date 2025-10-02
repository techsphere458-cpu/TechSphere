import {Box} from "@radix-ui/themes";
import TextType from "../../vender components/components/TextTypeAnimation.jsx";
import "./ServiceTitle.css"

export default function ServiceTitle(){

    return(
        <Box className={"serviceTitleContainer"}>
            <TextType
                text={["Ремонт ваших гаджетів", "Швидко,дешево та професійно", "ТЕХНОСФЕРА - надійний сервіс!"]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                textColors={["#acacac", "#999999", "gray"]}
                className={"serviceTitleText"}
            />

        </Box>
    )
}