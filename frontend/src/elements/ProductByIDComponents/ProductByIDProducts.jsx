import {Badge, Box, Button, Grid, Select} from "@radix-ui/themes";
import Search from "../../vender components/components/Search.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import "./ProductByIDProducts.css"

export default function ProductByIDProducts({type}) {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [isUsedFilter, setIsUsedFilter] = useState(false);

    const [productsByID, setProductsByID] = useState([]);
    const [filteredProductsByID, setFilteredProductsByID] = useState(productsByID);

    const [searchTarget, setSearchTarget] = useState("");

    const [productCondition, setProductCondition] = useState("all");
    const [needToBeNew, setNeedToBeNew] = useState(null);

    useEffect(() => {
        if(baseUrl ==="/api" && type.length > 0){
            axios.get(`${baseUrl}/items/${type}`).then(res => setProductsByID(res.data));
        }else {
            setProductsByID(getMockDataForProductsByID());
        }

    }, [type]);

    //condition filter
    useEffect(() => {
        switch (productCondition) {
            case "all":
                setNeedToBeNew(null);
                break;
            case "new":
                setNeedToBeNew(false);
                break;
            case "used":
                setNeedToBeNew(true);
                break;
        }

    }, [productCondition]);

    //filters
    useEffect(() => {
        if (searchTarget.trim().length > 0 && needToBeNew === null) {
            setIsUsedFilter(true);
            setFilteredProductsByID(productsByID.filter(p => p.model.toLowerCase().trim().includes(searchTarget.toLowerCase().trim())));
        } else if (searchTarget.trim().length > 0 && needToBeNew !== null) {
            setIsUsedFilter(true);
            setFilteredProductsByID(productsByID.filter(p => p.model.toLowerCase().trim().includes(searchTarget.toLowerCase().trim()) && p.isNew !== needToBeNew));
        } else if (searchTarget.trim().length === 0 && needToBeNew !== null) {
            setIsUsedFilter(true);
            setFilteredProductsByID(productsByID.filter(p => p.isNew !== needToBeNew));
        } else {
            setIsUsedFilter(false);
            setFilteredProductsByID([]);
            setNeedToBeNew(null);
        }
    }, [searchTarget, needToBeNew]);

    return (
        <>
            <Box className={"mainPageProductByIDSearchContainer"}>
                <Search setSearchTarget={setSearchTarget} searchValue={searchTarget}/>

                <Select.Root defaultValue="all" onValueChange={(value) => setProductCondition(value)}>
                    <Select.Trigger variant="ghost" radius="large"
                                    style={{color: "gray", position: "absolute", left: "5%", marginTop: "5px"}}/>
                    <Select.Content color="gray">

                        <Select.Item value="all">Всі</Select.Item>
                        <Select.Item value={"new"}>Нові</Select.Item>
                        <Select.Item value={"used"}>Б/У</Select.Item>
                    </Select.Content>
                </Select.Root>
            </Box>

            <Grid
                columns={{initial: "1", sm: "2", md: "3", lg: "4"}}
                gap="4"
                width="100%"
                style={{marginTop: "80px",marginRight:"5px"}}
            >
                {
                    (isUsedFilter ? filteredProductsByID : productsByID).length === 0 ? (
                        <div className={"mainPageProductByIDNotFoundContainer"}>
                            <p>Нічого не знайдено</p>
                        </div>
                    ) : (
                        (isUsedFilter ? filteredProductsByID : productsByID).map((p) => (
                            <div key={p.id} className={"mainPageProductByIDContainer"}>
                                <img src={p.imageUrl} />
                                <p className={"mainPageProductByIDContainerType"}>{p.model}</p>
                                <p className={"mainPageProductByIDPrize"}>{p.price}грн</p>

                                <Box className={"mainPageProductByIDButtonAndBadgeContainer"}>
                                    <Button onClick={() => window.location.href=`/order/item/${p.id}`}>Замовити</Button>
                                    <Badge className={"mainPageProductByIDBadge"} variant="solid" radius="full"
                                           color={p.isNew ? "indigo" : "gray"} size={"3"}
                                           style={p.isNew ? {left: "80%"} : {left: "86%"}}>
                                        {p.isNew ? "Новий" : "Б/У"}
                                    </Badge>
                                </Box>
                            </div>
                        ))
                    )
                }

            </Grid>
        </>
    );
}


function getMockDataForProductsByID() {
    return [{
        id: 1,
        type: "Matrix",
        model: "XWRRTY",
        price: "100",
        isNew: false,
        imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
    },
        {
            id: 2,
            type: "Matrix",
            model: "SGRDS",
            price: "100",
            isNew: true,
            imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
        },
        {
            id: 3,
            type: "Matrix",
            model: "XGEFD",
            price: "100",
            isNew: true,
            imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
        },
        {
            id: 4,
            type: "Matrix",
            model: "XGRS",
            price: "100",
            isNew: true,
            imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
        },
        {
            id: 5,
            type: "Matrix",
            model: "XGRSFFS",
            price: "100",
            isNew: true,
            imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
        },
        {
            id: 6,
            type: "Matrix",
            model: "XFSDS",
            price: "100",
            isNew: true,
            imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
        },
        {
            id: 7,
            type: "Matrix",
            model: "ZDFD",
            price: "100",
            isNew: true,
            imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
        },
        {
            id: 8,
            type: "Matrix",
            model: "GDFDAS",
            price: "100",
            isNew: true,
            imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
        },
        {
            id: 9,
            type: "Matrix",
            model: "FDA",
            price: "100",
            isNew: true,
            imageUrl: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg"
        }];
}