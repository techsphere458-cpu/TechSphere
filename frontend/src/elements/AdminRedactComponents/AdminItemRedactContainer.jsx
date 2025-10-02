import {useParams} from "react-router-dom";
import {Badge, Box, Button, Flex, Separator, Switch, Tooltip} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import "./AdminItemRedactContainer.css";
import axios from "axios";
import CustomInputWithCleaner from "../../vender components/components/CustomInputWithCleaner.jsx";
import ImgInput from "../../vender components/components/ImgInput.jsx";
import AlertDialogCustom from "../../vender components/components/AlertDialogCustom.jsx";
import createImage from "../../Utils/createImage.js";
import {saveToastText} from "../../Utils/saveToastText.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

export default function AdminItemRedactContainer() {
    const {id} = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const [item, setItem] = useState(null);

    const [newImageURL, setNewImageURL] = useState("");
    const [newModel, setNewModel] = useState("");
    const [newPrice, setNewPrice] = useState(0);
    const [newIsNew, setNewIsNew] = useState(null);

    const [urlInput, setUrlInput] = useState(true);

    const [newImageURLPrev, setNewImageURLPrev] = useState("");
    const [newImgFile, setNewImgFile] = useState(null);
    const [newImgFilePrev, setNewImgFilePrev] = useState("");

    const [correct, setCorrect] = useState(false);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if (!id) return;

        if (baseUrl === "/api") {
            axios.get(`${baseUrl}/item/${id}`).then(res => {
                setItem(res.data);
            });
        } else {
            setItem(getMockItemData());
        }
    }, [id]);

    useEffect(() => {
        if (!item) return;

        setNewImageURLPrev(item?.imageUrl);
        setNewPrice(item?.price);
        setNewModel(item?.model);
        setNewIsNew(item?.isNew);

    }, [item]);


    useEffect(() => {
        setNewImageURL(newImageURLPrev);
    }, [newImageURLPrev]);


    useEffect(() => {
        if (!newImgFile) return;

        const url = URL.createObjectURL(newImgFile);

        setNewImgFilePrev(url);
        setNewImageURL(url);
    }, [newImgFile])

    useEffect(() => {
        if (urlInput) {
            setNewImageURL(newImageURLPrev);
        } else {
            setNewImageURL(newImgFilePrev);
        }
    }, [urlInput]);

    useEffect(() => {
        if (newModel && newImageURL && newPrice && newImageURL.length < 255 && newModel.length > 0 && newImageURL.length > 0 && newPrice > 0 && !newPrice.toString().includes('e', ',',)) {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
    }, [newModel, newImageURL, newPrice, newImgFile]);



    const setDefaultAll = () => {
        setNewImageURLPrev(item.imageUrl);
        setNewPrice(item.price);
        setNewModel(item.model);
        setNewImgFilePrev("");
        setNewImgFile(null);
        setUrlInput(true);
        setNewIsNew(item.isNew);
    }

    const saveAll = async () => {
        setPause(true);
        const normalizedPrice = newPrice.toString().replace(",", ".");
        if (urlInput) {
            const newItem = {
                id: item.id,
                type: item.type,
                model: newModel.trim(),
                price: normalizedPrice,
                isNew: newIsNew,
                imageUrl: newImageURL.trim()
            };

            if (baseUrl === "/api") {
                setPause(true);
                axios.post(`${baseUrl}/item/redact`, newItem).then(res => {
                    saveToastText(res.data);
                    window.location.href = `/admin/product/${newItem.type}`;
                });
            } else {
                saveToastText("Гаджет успішно змінено");
                window.location.href = `/admin/product/${newItem.type}`;
            }
        } else {
            if (!newImgFile) return;

            setPause(true);

            const url = await createImage(newImgFile);

            const newItem = {
                id: item.id,
                type: item.type,
                model: newModel.trim(),
                price: normalizedPrice,
                isNew: newIsNew,
                imageUrl: url.trim()
            };

            axios.post(`${baseUrl}/item/redact`, newItem).then(res => {
                saveToastText(res.data);
                window.location.href = `/admin/product/${newItem.type}`;
            });
        }
    }

    const deleteItem = () => {
        setPause(true);
        if (baseUrl === "/api") {
            const itemToDelete = {
                id: item.id,
                type: "toDelete",
                model: "toDelete",
                imageUrl: "toDelete",
                price: 123.00,
                isNew: false
            }

            axios.post(`${baseUrl}/item/delete`, itemToDelete).then(res => {
                saveToastText(res.data);
                window.location.href = `/admin/product/${item.type}`;
            });
        } else {
            saveToastText("Гаджет успішно видалено");
        }
    }

    return (
        <>
            <>
                <Flex width={"100%"} height={"45%"} justify={"center"}>
                    <Flex justify={"center"} align={"center"} direction={"column"}
                          className={"adminItemRedactContainer"}>
                        <img src={newImageURL}/>
                        <p className={"adminItemRedactContainerModel"}>{newModel}</p>
                        <p className={"adminItemRedactContainerPrice"}>{newPrice}</p>
                        <Badge className={"adminItemRedactContainerBadge"} variant="solid" radius="full"
                               color={newIsNew ? "indigo" : "gray"} size={"3"}
                               style={newIsNew ? {left: "80%"} : {left: "86%"}}>
                            {newIsNew ? "Новий" : "Б/У"}
                        </Badge>
                        <Box style={{marginTop: "350px",position:"absolute"}}>
                            <AlertDialogCustom description={"Ви справді хочете видалити цей гаджет?"}
                                               disabledText={"Ви справді хочете видалити цей гаджет?"}
                                               isLoading={pause}
                                               onSaveClick={deleteItem}
                                               buttonColor={"red"}
                                               buttonText={<FontAwesomeIcon icon={faTrash}/>}/>
                        </Box>
                    </Flex>


                </Flex>

                <Flex width={"100%"} align={"center"} direction={"column"}>
                    <Flex className={"adminItemRedactContainerProps"} align={"center"} direction={"column"}>

                        <Flex width={"300px"} direction={"column"} align={"center"}>
                            <h3>Настройка</h3>
                            <Switch checked={urlInput}
                                    onCheckedChange={(checked) => setUrlInput(checked)}/>
                            <Box className={"adminItemRedactContainerImageURLInput"}>

                                {urlInput ? <CustomInputWithCleaner type={"text"} value={newImageURLPrev}
                                                                    placeholder={"Посилання на картинку"}
                                                                    setValue={setNewImageURLPrev}
                                                                    tooltipText={"URL картинки"}/>
                                    :
                                    <ImgInput setImg={setNewImgFile}/>
                                }
                            </Box>

                            <Separator orientation={"horizontal"} size={"4"} style={{marginTop: "20px"}}/>

                            <Box style={{marginTop: "20px"}}>
                                <CustomInputWithCleaner type={"text"} value={newModel} setValue={setNewModel}
                                                        tooltipText={"Модель"} placeholder={"Введіть модель"}/>
                            </Box>

                            <Separator orientation={"horizontal"} size={"4"} style={{marginTop: "20px"}}/>

                            <Tooltip content={"Стан"}>
                                <Switch checked={newIsNew} onCheckedChange={(checked) => setNewIsNew(checked)}
                                        style={{marginTop: "20px"}}/>
                            </Tooltip>

                            <Separator orientation={"horizontal"} size={"4"} style={{marginTop: "20px"}}/>

                            <Box style={{marginTop: "20px"}}>
                                <CustomInputWithCleaner type={"number"} placeholder={"Ціна"} tooltipText={"Ціна"}
                                                        setValue={setNewPrice} value={newPrice}/>
                            </Box>

                            <Separator orientation={"horizontal"} size={"4"} style={{marginTop: "20px"}}/>

                            <Flex style={{marginTop: "20px"}} gap={"4"}>
                                <AlertDialogCustom description={"Ви точно хочете зберегти зміни?"} buttonColor={"green"}
                                                   isLoading={pause}
                                                   buttonText={"Зберегти"} onSaveClick={correct && saveAll}
                                                   disabledText={!correct && "Ви ввели щось не правильно"}/>
                                <AlertDialogCustom description={"Ви точно хочете скинути всі зміни?"}
                                                   buttonText={"Скинути"} buttonColor={"red"}
                                                   onSaveClick={setDefaultAll} isLoading={pause}/>

                            </Flex>
                            <p></p>
                        </Flex>
                    </Flex>
                </Flex>
            </>
        </>
    );
}


function getMockItemData() {
    return {
        id: "1",
        type: "test",
        model: "AXCDSFDA",
        price: 123.0,
        isNew: true,
        imageUrl: "https://content.rozetka.com.ua/goods/images/big/3975900.jpg"
    }
}
