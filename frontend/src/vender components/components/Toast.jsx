import {Box, Flex, Callout} from "@radix-ui/themes";
import "../styles/Toast.css"

import Cookies from "js-cookie";

import {motion, AnimatePresence} from "framer-motion";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo} from "@fortawesome/free-solid-svg-icons/faInfo";
import {saveToastText} from "../../Utils/saveToastText.js";

export default function Toast() {
    const [show, setShow] = useState(false);
    const [cookie, setCookie] = useState("");

    useEffect(() => {
        const text = Cookies.get("techSphereActions");
        setCookie(text);
    }, []);

    useEffect(() => {
        if (!cookie || cookie === "") return;

        setShow(true);
        saveToastText("");
    }, [cookie]);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    }, [show]);

    return (
        <Flex className={"toastContainer"}>
            <Box className={"toastContentContainer"}>
                <AnimatePresence>
                    {show && <motion.div initial={{opacity: 0, x: 300}}
                                         animate={{opacity: 1, x: 0}}
                                         exit={{opacity: 1, x: 320}}
                                         transition={{duration: 0.5, ease: "easeInOut"}}
                    >
                        <Callout.Root color="green">
                            <Callout.Icon>
                                <FontAwesomeIcon icon={faInfo}/>
                            </Callout.Icon>
                            <Callout.Text style={{fontSize: "17px", fontWeight: "500"}}>
                                {cookie}
                            </Callout.Text>
                        </Callout.Root>
                    </motion.div>}

                </AnimatePresence>
            </Box>
        </Flex>

    );
}