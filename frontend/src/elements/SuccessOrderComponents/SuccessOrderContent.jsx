"use client"

import { Button } from "@radix-ui/themes"
import "./SuccessOrderContent.css"
import TextTypeAnimation from "../../vender components/components/TextTypeAnimation.jsx"

export default function SuccessOrderContent({ name }) {
    return (
        <>

            <TextTypeAnimation
                text={[`Дякуємо, ${name}, за ваше замовлення!`]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                textColors={["#3c3c3c"]}
                className={"successOrderContentTitle"}
            />


            <div className="successOrderIcon" onClick={() => window.location.href = "/"}>✓</div>


        </>
    )
}
