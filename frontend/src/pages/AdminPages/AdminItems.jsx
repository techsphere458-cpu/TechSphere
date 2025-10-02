import DefaultComponent from "../../DefaultComponent.jsx";
import {useParams} from "react-router-dom";
import AdminItemsContent from "../../elements/AdminItemsComponents/AdminItemsContent.jsx";

export default function AdminItems(){
    const {type} = useParams();

    const productType = decodeURIComponent(type);

    return(
        <DefaultComponent>
            <AdminItemsContent type={productType}/>
        </DefaultComponent>
    );
}