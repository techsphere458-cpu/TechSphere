import './ServiceContent.css';
import {Box} from "@radix-ui/themes";
import Markdown from "react-markdown";


export default function ServiceContent() {
    return (
        <Box className={"serviceContentContainer"}>


            <Box className={"serviceItemTitleContainer"}>
                <p> Ремонт телевізорів </p>
            </Box>

            <Box className={"serviceItemContainer"}>
                <Box>
                    <Box className={"serviceItemUnderTitleContainer"}>
                        <p> Наші майстри виконують: </p>
                    </Box>

                    <Box className={"serviceItemContentContainer"}>
                        <Markdown>
                            - заміну екранів та LED-підсвітки
                        </Markdown>

                        <Markdown>
                            - ремонт блоків живлення та плат управління
                        </Markdown>

                        <Markdown>
                            - прошивку та відновлення Smart TV
                        </Markdown>

                        <Markdown>
                            - усунення проблем після перепадів напруги
                        </Markdown>

                        <Markdown>
                            Ми працюємо **з усіма брендами**: Samsung, LG, Philips, Sony, TCL та іншими.
                        </Markdown>

                    </Box>
                </Box>

            </Box>



            <Box style={{marginTop:"5px"}} className={"serviceItemTitleContainer"}>
                <p> Ремонт компютерів і ноутбуків </p>
            </Box>

            <Box className={"serviceItemContainer"}>
                <Box>
                    <Box className={"serviceItemUnderTitleContainer"}>
                        <p> У нашому сервісному центру доступні послуги: </p>
                    </Box>

                    <Box className={"serviceItemContentContainer"}>
                        <Markdown>
                            - діагностика так заміна комплектуючих
                        </Markdown>

                        <Markdown>
                            - чистка від пилу, заміна термопасти
                        </Markdown>

                        <Markdown>
                            - встановлення та налаштування програмного забезпечення
                        </Markdown>

                        <Markdown>
                            - ремонт після механічних пошкоджень та потрапляння рідин
                        </Markdown>

                        <Markdown>
                            - відновлення даних
                        </Markdown>

                        <Markdown>
                            Ми маємо **сучасне обладнання**, що дозволяє якісно та швидко вирішувати **будь-які проблеми**.
                        </Markdown>

                    </Box>
                </Box>

            </Box>
            <Box className={"serviceHiddenBoxForDesign"}></Box>
        </Box>
    )
}