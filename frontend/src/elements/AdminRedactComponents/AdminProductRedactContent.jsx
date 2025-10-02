import DefaultComponent from "../../DefaultComponent.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import TitleSeperated from "../../vender components/components/TitleSeperated.jsx";
import {Box, Flex, Separator, Switch} from "@radix-ui/themes";
import "./AdminProductRedactContent.css"
import CustomInputWithCleaner from "../../vender components/components/CustomInputWithCleaner.jsx";
import ImgInput from "../../vender components/components/ImgInput.jsx";
import AlertDialogCustom from "../../vender components/components/AlertDialogCustom.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import createImage from "../../Utils/createImage.js";
import {saveToastText} from "../../Utils/saveToastText.js";

export default function AdminProductRedactContent({id}) {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const [imageURL, setImageURL] = useState("");
    const [title, setTitle] = useState("");

    const [urlInput, setUrlInput] = useState(true);

    const [imageURLPrev, setImageURLPrev] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageFilePrev, setImageFilePrev] = useState("");

    const [correct, setCorrect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (baseUrl === "/api") {
            axios.get(`${baseUrl}/products`).then(res => setProducts(res.data));
        } else {
            setProducts(getMockData());
        }
    }, []);

    useEffect(() => {
        if (!id) return;
        if (baseUrl === "/api") {
            axios.get(`${baseUrl}/products/${id}`).then(res => setProduct(res.data));
        } else {
            setProduct({
                id: 1,
                title: "test",
                imageURL: "https://www.professional-one.com/en/wp-content/uploads/2014/05/happy-people.jpg"
            });
        }
    }, [id]);

    useEffect(() => {
        if (!product) return;
        setImageURLPrev(product.imageURL);
        setTitle(product.title);
    }, [product]);

    useEffect(() => {
        if (!imageFile) return;

        const url = URL.createObjectURL(imageFile);

        setImageFilePrev(url);
    }, [imageFile]);

    useEffect(() => {
        if (urlInput) {
            setImageURL(imageURLPrev);
        } else {
            setImageURL(imageFilePrev);
        }
    }, [urlInput, imageFilePrev, imageURLPrev]);


    useEffect(() => {
        const contains = products.some(p => {
            if (product.title === p.title) {
                return false;
            } else {
                return p.title === title.trim();
            }
        });

        if (imageURL && imageURL.trim().length > 0 && imageURL.trim().length < 255 && title && title.trim().length > 0 && title.trim().length < 25 && !contains) {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
    }, [imageURL, title]);


    const setDefault = () => {
        setImageURLPrev(product.imageURL);
        setTitle(product.title);
        setImageFilePrev("");
        setUrlInput(true);
        setImageFile(null);
    }

    const redactProduct = async () => {
        setIsLoading(true);
        if (baseUrl === "/api") {
            if (urlInput) {
                const item = {
                    id: product.id,
                    title: title.trim(),
                    imageURL: imageURL.trim()
                }

                axios.post(`${baseUrl}/products/change`, item).then(res =>{
                    saveToastText(res.data);
                    window.location.href ="/admin";
                });

            } else {
                const URL = await createImage(imageFile);

                const item = {
                    id: product.id,
                    title: title.trim(),
                    imageURL: URL
                }

                axios.post(`${baseUrl}/products/change`, item).then(res => {
                    saveToastText(res.data);
                    window.location.href ="/admin";
                });

            }
        } else {
            saveToastText("Продукт успішно змінено");
            window.location.href ="/admin";
            setDefault();
        }
    }

    const deleteProduct = () =>{
        setIsLoading(true);
        if(baseUrl ==="/api"){
            axios.post(`${baseUrl}/products/delete`,product).then(res => {
                saveToastText(res.data);
                window.location.href ="/admin";
            });
        }else{
            saveToastText("Продукт успішно видалено");
            window.location.href ="/admin";
        }
    }
    return (
        <DefaultComponent>
            <TitleSeperated text={"Редакція"}/>
            <Flex className={"adminProductRedactContentContainer"} direction={"column"}>
                <img src={imageURL}/>
                <h1>{title}</h1>
                <Box>
                    <AlertDialogCustom buttonText={<FontAwesomeIcon icon={faTrash}/>} isLoading={isLoading}
                                       buttonColor={"red"}
                                       description={"Якшо ви видалите цей продукт - то всі його гаджети будуть видалені"}
                                        onSaveClick={deleteProduct}/>
                </Box>
                <p></p>
            </Flex>

            <Flex className={"adminProductRedactContentContainerProps"} direction={"column"} align={"center"}>
                <h1>Настройка</h1>
                <Separator orientation={"horizontal"} size={"4"}/>

                <Switch checked={urlInput} style={{marginTop: "20px"}}
                        onCheckedChange={(checked) => setUrlInput(checked)}/>

                <Box style={{marginTop: "20px"}}>{
                    urlInput ?
                        <CustomInputWithCleaner type={"text"} placeholder={"URL картинки"} value={imageURLPrev}
                                                setValue={setImageURLPrev} tooltipText={"URL картинки"}/>
                        :
                        <ImgInput setImg={setImageFile}/>
                }</Box>

                <Separator orientation={"horizontal"} size={"4"} style={{marginTop: "30px"}}/>

                <Box style={{marginTop: "20px"}}>
                    <CustomInputWithCleaner type={"text"} placeholder={"Назва продукту"} tooltipText={"Назва продукту"}
                                            setValue={setTitle} value={title}/>
                </Box>

                <Separator orientation={"horizontal"} size={"4"} style={{marginTop: "20px"}}/>
                <Flex align={"center"} direction={"row"} gap={"4"} style={{marginTop: "20px"}}>
                    <AlertDialogCustom description={"Ви точно хочете змінити цей продукт"} buttonText={"Зберегти"}
                                       buttonColor={"green"} disabledText={!correct && "Ви ввели щось не так"}
                                       isLoading={isLoading} onSaveClick={correct && redactProduct}/>

                    <AlertDialogCustom description={"Ви точно хочете скинути все що ви змінили"} buttonText={"Скинути"}
                                       buttonColor={"red"} isLoading={isLoading} onSaveClick={setDefault}/>
                </Flex>
                <p></p>
            </Flex>
        </DefaultComponent>
    );
}

function getMockData() {
    return [{id: 1, imageURL: "test", title: "test"},
        {id: 1, imageURL: "test", title: "tested"},
        {id: 1, imageURL: "test", title: "test1"},
        {id: 1, imageURL: "test", title: "test2"},
        {id: 1, imageURL: "test", title: "test3"},
        {id: 1, imageURL: "test", title: "test4"},
        {id: 1, imageURL: "test", title: "test5"}]
}

