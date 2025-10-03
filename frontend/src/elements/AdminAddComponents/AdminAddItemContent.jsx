"use client"

import DefaultComponent from "../../DefaultComponent.jsx"
import { Badge, Box, Flex, Separator, Switch, Select, Tooltip } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import TitleSeperated from "../../vender components/components/TitleSeperated.jsx"
import CustomInputWithCleaner from "../../vender components/components/CustomInputWithCleaner.jsx"
import ImgInput from "../../vender components/components/ImgInput.jsx"
import axios from "axios"
import AlertDialogCustom from "../../vender components/components/AlertDialogCustom.jsx"
import createImage from "../../Utils/createImage.js"
import { saveToastText } from "../../Utils/saveToastText.js"
import "./AdminAddItemContent.css";

export default function AdminAddItemContent() {
    const baseUrl = import.meta.env.VITE_BASE_URL

    const [imageURL, setImageURL] = useState(null)
    const [model, setModel] = useState(null)
    const [price, setPrice] = useState(null)
    const [isNew, setIsNew] = useState(true)
    const [type, setType] = useState("")

    const [types, setTypes] = useState([])

    const [imageURlPrev, setImageURlPrev] = useState(null)

    const [file, setFile] = useState(null)
    const [filePrev, setFilePrev] = useState(null)

    const [urlInput, setUrlInput] = useState(true)

    const [correct, setCorrect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (urlInput) {
            setImageURL(imageURlPrev)
        } else {
            setImageURL(filePrev)
        }
    }, [urlInput, filePrev, imageURlPrev])

    useEffect(() => {
        if (!file) return

        setFilePrev(URL.createObjectURL(file))
    }, [file])

    useEffect(() => {
        if (baseUrl === "/api") {
            axios.get(`${baseUrl}/products`).then((response) => setTypes(response.data))
        } else {
            setTypes(getMockDataForProducts)
        }
    }, [])

    useEffect(() => {
        if (
            model &&
            type &&
            imageURL &&
            price &&
            imageURL.length < 255 &&
            model.length > 0 &&
            model.length <= 30 &&
            type.length > 0 &&
            imageURL.length > 0 &&
            price > 0 &&
            !price.toString().includes("e", ",")
        ) {
            setCorrect(true)
        } else {
            setCorrect(false)
        }
    }, [model, imageURL, type, price, file])

    const clearAll = () => {
        setIsNew(true)
        setPrice("")
        setModel("")
        setType("")
        setImageURlPrev("")
        setFilePrev("")
        setFile(null)
        setUrlInput(true);
    }

    const saveItem = async () => {
        setIsLoading(true)
        const normalizedPrice = price.toString().replace(",", ".")
        if (baseUrl !== "/api") {
            const newItem = {
                id: 0,
                type: type.trim(),
                model: model,
                imageUrl: imageURL,
                price: Number.parseFloat(normalizedPrice),
                isNew: isNew,
            }

            clearAll()
            saveToastText("Гаджет успішно доданий")
            window.location.href = `/admin/product/${newItem.type}`
        } else {
            if (urlInput) {
                const newItem = {
                    id: 0,
                    type: type.trim(),
                    model: model.trim(),
                    imageUrl: imageURL.trim(),
                    price: Number.parseFloat(normalizedPrice),
                    isNew: isNew,
                }

                axios.post(`${baseUrl}/item/add`, newItem).then((res) => {
                    saveToastText(res.data)
                    window.location.href = `/admin/product/${newItem.type}`
                })
            } else {
                const imageUrl = await createImage(file)

                const newItem = {
                    id: 0,
                    type: type.trim(),
                    model: model.trim(),
                    imageUrl: imageUrl.trim(),
                    price: Number.parseFloat(normalizedPrice),
                    isNew: isNew,
                }

                axios.post(`${baseUrl}/item/add`, newItem).then((res) => {
                    saveToastText(res.data)
                    window.location.href = `/admin/product/${newItem.type}`
                })
            }
        }
    }

    return (
        <DefaultComponent>
            <Flex align={"center"} direction={"column"}>
                <TitleSeperated text={"Додавання"} />
                <Flex width={"100%"} height={"45%"} justify={"center"}>
                    <Flex justify={"center"} align={"center"} direction={"column"} className={"adminItemRedactContainer"}>
                        <img src={imageURL || "/placeholder.svg"} />
                        <p className={"adminItemRedactContainerModel"}>{model}</p>
                        <p className={"adminItemRedactContainerPrice"}>{price}</p>
                        <Badge
                            className={"adminItemRedactContainerBadge"}
                            variant="solid"
                            radius="full"
                            color={isNew ? "indigo" : "gray"}
                            size={"3"}
                            style={isNew ? { left: "80%" } : { left: "86%" }}
                        >
                            {isNew ? "Новий" : "Б/У"}
                        </Badge>
                    </Flex>
                </Flex>

                <Flex align={"center"} direction={"column"} className={"adminAddItemContentPropsContainer"}>
                    <h1>Настройка</h1>

                    <Select.Root value={type} onValueChange={(value) => setType(value)}>
                        <Tooltip content={"Тип"}>
                            <Select.Trigger />
                        </Tooltip>

                        <Select.Content>
                            {types.map((item) => (
                                <Select.Item key={item.id} value={item?.title}>
                                    {item?.title}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                    <Separator orientation={"horizontal"} size={"4"} style={{ marginTop: "20px" }} />

                    <Switch
                        defaultChecked={urlInput}
                        size={"3"}
                        onCheckedChange={(checked) => setUrlInput(checked)}
                        style={{ marginTop: "20px" }}
                    />
                    <Box style={{ marginTop: "20px" }}>
                        {urlInput ? (
                            <CustomInputWithCleaner
                                type={"text"}
                                value={imageURlPrev}
                                setValue={setImageURlPrev}
                                tooltipText={"URL картинки"}
                                placeholder={"URL картинки"}
                            />
                        ) : (
                            <ImgInput setImg={setFile} />
                        )}
                    </Box>

                    <Separator orientation={"horizontal"} size={"4"} style={{ marginTop: "20px" }} />

                    <Box style={{ marginTop: "20px" }}>
                        <CustomInputWithCleaner
                            type={"text"}
                            value={model}
                            placeholder={"Модель"}
                            tooltipText={"Модель"}
                            setValue={setModel}
                        />
                    </Box>

                    <Separator orientation={"horizontal"} size={"4"} style={{ marginTop: "20px" }} />

                    <Box style={{ marginTop: "20px" }}>
                        <CustomInputWithCleaner
                            type={"number"}
                            placeholder={"Ціна"}
                            tooltipText={"Ціна"}
                            setValue={setPrice}
                            value={price}
                        />
                    </Box>

                    <Separator orientation={"horizontal"} size={"4"} style={{ marginTop: "20px" }} />

                    <Tooltip content={"Стан"}>
                        <Switch
                            defaultChecked={isNew}
                            onCheckedChange={(checked) => setIsNew(checked)}
                            style={{ marginTop: "20px" }}
                        />
                    </Tooltip>

                    <Separator orientation={"horizontal"} size={"4"} style={{ marginTop: "20px" }} />

                    <Flex style={{ marginTop: "20px" }} gap={"3"}>
                        <AlertDialogCustom
                            description={"Ви впевнені, що хочете додати цей продукт?"}
                            buttonText={"Зберегти"}
                            buttonColor={"green"}
                            disabledText={correct ? "" : "Невірні настройки продукта"}
                            onSaveClick={correct && saveItem}
                            isLoading={isLoading}
                        />
                        <AlertDialogCustom
                            description={"Ви впевнені, що хочете скинути настройки цього продукту?"}
                            buttonText={"Скинути"}
                            buttonColor={"red"}
                            onSaveClick={clearAll}
                            isLoading={isLoading}
                        />
                    </Flex>
                    <p></p>
                </Flex>
            </Flex>
        </DefaultComponent>
    )
}

function getMockDataForProducts() {
    return [
        { id: 1, title: "Блоки Живлення", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 3, title: "SSSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
    ]
}
