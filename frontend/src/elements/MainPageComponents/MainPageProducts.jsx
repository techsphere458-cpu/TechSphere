"use client"

import { Grid, Button, Box } from "@radix-ui/themes"
import "./MainPageProducts.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Search from "../../vender components/components/Search.jsx"
import { useNavigate } from "react-router-dom"

export default function MainPageProducts() {
    const baseUrl = import.meta.env.VITE_BASE_URL

    const [products, setProducts] = useState([])
    const [searchTarget, setSearchTarget] = useState("")
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [isUsedFilter, setIsUsedFilter] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (baseUrl === "/api") {
            axios.get(`${baseUrl}/products`).then((response) => setProducts(response.data))
        } else {
            //test data
            setProducts(getMockDataForProducts())
        }
    }, [])

    //filters
    useEffect(() => {
        if (searchTarget.trim().length > 0) {
            setIsUsedFilter(true)
            setFilteredProducts(
                products.filter((p) => p.title.toLowerCase().trim().includes(searchTarget.toLowerCase().trim())),
            )
        } else {
            setIsUsedFilter(false)
            setFilteredProducts([])
        }
    }, [searchTarget])

    return (
        <>
            <Box className={"mainPageProductSearchContainer"}>
                <Search setSearchTarget={setSearchTarget} searchValue={searchTarget} />
            </Box>

            <Grid
                columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
                gap="4"
                width="100%"
                style={{ marginTop: "80px", marginRight: "5px" }}
            >
                {(isUsedFilter ? filteredProducts : products).length === 0 ? (
                    <div className={"mainPageProductsNotFoundContainer"}>
                        <p>Нічого не знайдено</p>
                    </div>
                ) : (
                    (isUsedFilter ? filteredProducts : products).map((p) => (
                        <div key={p.id} className={"mainPageProductContainer"}>
                            <img
                                src={p.imageURL || "/placeholder.svg"}
                                loading={"lazy"}
                                onClick={() => navigate(`/product/${encodeURIComponent(p.title.trim())}`)}
                            />
                            <p>{p.title}</p>
                            <Button className={"mainPageProductContainerButton"} onClick={() => navigate(`/product/${encodeURIComponent(p.title.trim())}`)}>Більше</Button>
                        </div>
                    ))
                )}
            </Grid>
        </>
    )
}

function getMockDataForProducts() {
    return [
        { id: 1, title: "Блоки Живлення", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 3, title: "SSSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
        { id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg" },
    ]
}
