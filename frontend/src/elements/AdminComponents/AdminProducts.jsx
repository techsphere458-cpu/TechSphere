"use client"

import { Box, Button, Grid } from "@radix-ui/themes"
import Search from "../../vender components/components/Search.jsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./AdminProducts.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd"

export default function AdminProducts() {
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
            <Box className={"adminProductSearchContainer"}>
                <FontAwesomeIcon
                    icon={faAdd}
                    className={"adminProductAddProductButton"}
                    size={"2x"}
                    onClick={() => navigate("/admin/add/product")}
                />
                <Search setSearchTarget={setSearchTarget} searchValue={searchTarget} />
            </Box>

            <Grid
                columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
                gap="4"
                width="100%"
                style={{ marginTop: "80px", marginRight: "5px" }}
            >
                {(isUsedFilter ? filteredProducts : products).length === 0 ? (
                    <div className={"adminProductsNotFoundContainer"}>
                        <p>Нічого не знайдено</p>
                    </div>
                ) : (
                    (isUsedFilter ? filteredProducts : products).map((p) => (
                        <div key={p.id} className={"adminProductContainer"}>
                            <img
                                src={p.imageURL || "/placeholder.svg"}
                                loading={"lazy"}
                                onClick={() => navigate(`/admin/redact/product/${p.id}`)}
                            />
                            <p>{p.title}</p>
                            <Button
                                className={"adminProductButton"}
                                onClick={() => navigate(`/admin/product/${encodeURIComponent(p.title.trim())}`)}
                            >
                                Більше
                            </Button>
                            <button className={"adminProductsChangeButton"} onClick={() => navigate(`/admin/redact/product/${p.id}`)}>
                                <FontAwesomeIcon icon={faPen} size={"xl"} />
                            </button>
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
    ]
}
