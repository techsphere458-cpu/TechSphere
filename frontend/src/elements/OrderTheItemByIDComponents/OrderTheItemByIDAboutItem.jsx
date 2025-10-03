"use client"

import { Box, Flex, Separator } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import axios from "axios"
import "./OrderTheItemByID.css"

function OrderTheItemByIDTitle() {
    return <h1 className={"orderTheItemByIDTitle"}>Замовлення</h1>
}

function OrderTheItemByIDAboutItem({ item }) {
    return (
        <Box width={"100%"}>
            <p className={"orderTheItemByIDAboutItemText"}>- {item?.type} (1шт)</p>
            <p className={"orderTheItemByIDAboutItemText"}>- {item?.model}</p>
            <p className={"orderTheItemByIDAboutItemPrice"}>- {item?.price}</p>
            <p className={"orderTheItemByIDAboutItemText"}>- {item?.isNew ? "Новий" : "Б/У"}</p>
        </Box>
    )
}

function OrderTheItemByIDForm({ item }) {
    const baseUrl = import.meta.env.VITE_BASE_URL

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        if (name.trim().length > 0 && name.trim().length < 20 && phone.trim().length <= 13 && phone.trim().length >= 10 && isOnlyDigits(phone.trim())) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [name, phone])

    const handleSubmit = () => {
        axios
            .post(`${baseUrl}/order/submit`, {
                type: item?.type,
                model: item?.model,
                price: item?.price,
                isNew: item?.isNew,
                phone: phone,
                name: name,
            })
            .then((res) =>
                res.data === "success"
                    ? (window.location.href = `/order/success/${encodeURIComponent(name)}`)
                    : alert("Щось пішло не так, спробуйте пізніше"),
            )
            .catch((err) => alert("Щось пішло не так, спробуйте пізніше"))

        setPhone("")
        setName("")
    }

    return (
        <Flex
            width={"100%"}
            height={"100%"}
            direction={"column"}
            align={"center"}
            className={"orderTheItemByIDFormContainer"}
        >
            <Flex width={"100%"} justify={"center"}>
                <input
                    className="orderTheItemByIDInput"
                    placeholder="Ваше ім'я"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </Flex>
            <Flex width={"100%"} justify={"center"} className={"orderTheItemByIDFormInputMarginTop"}>
                <input
                    className="orderTheItemByIDInput"
                    placeholder="Ваш номер телефону"
                    type="tel"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                />
            </Flex>
            <Flex width={"100%"} justify={"center"} className={"orderTheItemByIDFormButtonMarginTop"}>
                <button
                    disabled={!isValid}
                    className="orderTheItemByIDButton"
                    onClick={handleSubmit}
                    title={isValid ? "надіслати нам" : "невірний номер або ім'я"}
                >
                    Надіслати
                </button>
            </Flex>
        </Flex>
    )
}

export default function OrderTheItemByIDContent({ id }) {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [item, setItem] = useState(null)

    useEffect(() => {
        if (!id) return

        if (baseUrl === "/api") {
            axios.get(`${baseUrl}/item/${id}`).then((resp) => setItem(resp.data))
        } else {
            setItem({ id: id, type: "Матриці", model: "FDDFHSLHFLSDKFGIU", price: "1200 грн", isNew: false })
        }
    }, [id])

    return (
        <Flex width={"100%"} height={"100%"} justify={"center"} align={"center"}>
            <Flex className={"orderTheItemByIDContentContainer"}>
                <Box className={"orderTheItemByIDContentTitle"}>
                    <OrderTheItemByIDTitle />
                    <Separator size={"4"} orientation={"horizontal"} className="orderTheItemByIDSeparator" />
                </Box>
                <Flex className={"orderTheItemByIDAboutItemContainer"}>
                    <OrderTheItemByIDAboutItem item={item} />
                </Flex>
                <Flex className={"orderTheItemByIDFormContentContainer"}>
                    <Separator className={"orderTheItemByIDContentFormSeparator"} size={"4"} orientation={"horizontal"} />
                    <OrderTheItemByIDForm item={item} />
                </Flex>
            </Flex>
        </Flex>
    )
}

function isOnlyDigits(value) {
    return /^\d+$/.test(value);
}