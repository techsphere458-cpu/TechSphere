import {useParams} from "react-router-dom";
import DefaultComponent from "../DefaultComponent.jsx";
import {Button, Text} from "@radix-ui/themes";
import SuccessOrderContent from "../elements/SuccessOrderComponents/SuccessOrderContent.jsx";

export default function SuccessOrder(){
    const {name} = useParams();

    const decodedName = decodeURIComponent(name);

    return(
        <DefaultComponent>
            <SuccessOrderContent name={decodedName}/>
        </DefaultComponent>
    );
}