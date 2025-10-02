import {useParams} from "react-router-dom";
import DefaultComponent from "../DefaultComponent.jsx";
import MainProductByIdContent from "../elements/ProductByIDComponents/MainProductByIdContent.jsx";

export default function ProductByID(){
    const {type} = useParams();
    const decodedType = decodeURIComponent(type);

    return(
       <DefaultComponent>
              <MainProductByIdContent type={decodedType}/>
       </DefaultComponent>
    )
}