import DefaultComponent from "../DefaultComponent.jsx";
import ServiceTitle from "../elements/ServiceComponents/ServiceTitle.jsx";
import {Separator} from "@radix-ui/themes";
import "./ServiceStyles.css"
import ServiceContent from "../elements/ServiceComponents/ServiceContent.jsx";

export default function Service(){
    return(
        <DefaultComponent pageName={"service"}>
            <ServiceTitle/>


            <ServiceContent/>
        </DefaultComponent>
    )
}