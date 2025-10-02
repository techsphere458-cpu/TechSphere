import {Button} from "@radix-ui/themes";
import "./SuccessOrderContent.css";
import TextTypeAnimation from "../../vender components/components/TextTypeAnimation.jsx";

export default function SuccessOrderContent({name}) {

    return (
        <>
            <TextTypeAnimation text={[`Дякуємо, ${name}, за ваше замовлення!`]}
                               typingSpeed={75}
                               pauseDuration={1500}
                               showCursor={true}
                               cursorCharacter="|"
                               textColors={["black"]}
                               className={"successOrderContentTitle"}/>
            <Button className={"successOrderContentButton"} onClick={() => window.location.href = "/"}>до Головної</Button>
        </>
    )
}