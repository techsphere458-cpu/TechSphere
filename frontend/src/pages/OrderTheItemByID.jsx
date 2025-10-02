import DefaultComponent from "../DefaultComponent.jsx";
import OrderTheItemByIDContent from "../elements/OrderTheItemByIDComponents/OrderTheItemByIDContent.jsx";
import {useParams} from "react-router-dom";

export default function OrderTheItemByID(){
    const {id} = useParams();
    return(
        <DefaultComponent>

            <OrderTheItemByIDContent id={id} />
        </DefaultComponent>
    );
}