import DefaultComponent from "../../DefaultComponent.jsx";
import {useEffect, useState} from "react";
import {Box, Flex, Separator, Switch} from "@radix-ui/themes";
import "./AdminAddProductContent.css";
import TitleSeperated from "../../vender components/components/TitleSeperated.jsx";
import ImgInput from "../../vender components/components/ImgInput.jsx";
import CustomInputWithCleaner from "../../vender components/components/CustomInputWithCleaner.jsx";
import AlertDialogCustom from "../../vender components/components/AlertDialogCustom.jsx";
import axios from "axios";
import createImage from "../../Utils/createImage.js";
import {saveToastText} from "../../Utils/saveToastText.js";
import {gapPropDefs} from "@radix-ui/themes/props";

export default function AdminAddProductContent() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [existProducts, setExistProducts] = useState([]);

    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [urlInput, setUrlInput] = useState(true);

    const [imageURLPrev, setImageURLPrev] = useState("");
    const [file, setFile] = useState(null);
    const [filePrev, setFilePrev] = useState("");

    const [correct, setCorrect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (baseUrl === "/api") {
            axios.get(`${baseUrl}/products`).then(res => setExistProducts(res.data));
        } else {
            setExistProducts(getMockDataForProducts());
        }
    }, []);

    useEffect(() => {
        if (urlInput) {
            setImageURL(imageURLPrev)
        } else {
            setImageURL(filePrev)
        }
    }, [urlInput]);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFilePrev(url);
            setImageURL(url);
        } else {
            setFilePrev("");
        }
    }, [file]);

    useEffect(() => {
        setImageURL(imageURLPrev);
    }, [imageURLPrev]);

    useEffect(() => {
        if (imageURL && imageURL.length > 0 && imageURL.length < 255 && title && title.length > 0) {
            const exists = existProducts.some(product => product.title.trim().toLowerCase() === title.trim().toLowerCase());
            setCorrect(!exists);
        } else {
            setCorrect(false);
        }
    }, [imageURL, title]);

    const clearAll = () => {
        setFile(null);
        setUrlInput(true);
        setFilePrev("");
        setImageURLPrev("");
        setTitle("");
    }

    const saveProduct = async () => {
        setIsLoading(true);
        if (baseUrl === "/api") {
            if (urlInput) {
                const product = {
                    id: 0,
                    title: title,
                    imageURL: imageURL
                };

                axios.post(`${baseUrl}/products/add`, product)
                    .then(res => {
                        saveToastText(res.data);
                        window.location.href = "/admin";
                    });
            } else {
                const url = await createImage(file);


                const product = {
                    id: 0,
                    title: title,
                    imageURL: url
                };

                axios.post(`${baseUrl}/products/add`, product).then(res => {
                    saveToastText(res.data);
                    window.location.href = "/admin";
                });

            }
        } else {
            const product = {
                id: 0,
                title: title,
                imageURL: imageURL
            };

            saveToastText("Продукт успішно додано");
            window.location.href = "/admin";
        }
        clearAll();
    }

    return (
        <DefaultComponent>
            <TitleSeperated text={"Додавання"}/>
            <Flex className={"adminAddProductContentContainer"} direction={"column"}>
                <img src={imageURL}/>
                <h1>{title}</h1>
            </Flex>
            <Flex className={"adminAddProductContentProps"} direction={"column"}>
                <h1>Настройка</h1>
                <Separator orientation={"horizontal"} size={"4"}/>

                <Switch checked={urlInput} onCheckedChange={(checked) => setUrlInput(checked)} size={"3"}
                        style={{marginTop: "20px"}}/>

                <Box style={{marginTop: "20px"}}>{urlInput ?
                    <CustomInputWithCleaner type={"text"} placeholder={"URL картинки"} value={imageURLPrev}
                                            setValue={setImageURLPrev} tooltipText={"URL картинки"}/>
                    :
                    <ImgInput setImg={setFile}/>}
                </Box>
                <Separator orientation={"horizontal"} size={"4"} style={{marginTop: "20px"}}/>
                <Box style={{marginTop: "20px"}}>
                    <CustomInputWithCleaner type={"text"} placeholder={"Назва типу продукту"}
                                            tooltipText={"Назва типу продукту"} setValue={setTitle} value={title}/>
                </Box>

                <Separator orientation={"horizontal"} size={"4"} style={{marginTop: "20px"}}/>

                <Flex justify={"center"} direction={"row"} gap={"4"} style={{marginTop: "20px"}}>
                    <AlertDialogCustom
                        description={"Ви точно хочете створити новий тип товарів?"}
                        buttonColor={"green"} buttonText={"Зберегти"}
                        disabledText={!correct && "Ви ввели щось не правильно"} onSaveClick={correct && saveProduct}
                        isLoading={isLoading}/>
                    <AlertDialogCustom description={"Ви точно хочете скинути данні?"} buttonColor={"red"}
                                       buttonText={"Скинути"} onSaveClick={clearAll} isLoading={isLoading}
                    />
                </Flex>
            </Flex>
        </DefaultComponent>
    );
}

function getMockDataForProducts() {
    return [
        {id: 1, title: "Блоки Живлення", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg"},
        {id: 2, title: "SSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg"},
        {id: 3, title: "SSSD", imageURL: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg"}
    ];
}
