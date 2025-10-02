import {useParams} from "react-router-dom";
import AdminItemRedactContent from "../../elements/AdminRedactComponents/AdminItemRedactContent.jsx";

export default function AdminItemRedact(){
    const {id} = useParams();
    return (
      <AdminItemRedactContent id={id} />
    );
}