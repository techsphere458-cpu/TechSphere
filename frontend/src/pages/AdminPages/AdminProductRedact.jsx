import {useParams} from "react-router-dom";
import AdminProductRedactContent from "../../elements/AdminRedactComponents/AdminProductRedactContent.jsx";

export default function AdminProductRedact(){
    const {id} = useParams();

    return(
        <AdminProductRedactContent id={id}/>
    );
}
