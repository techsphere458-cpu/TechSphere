import "../styles/Search.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

export default function Search({setSearchTarget,searchValue}) {
    return (
        <div className="container">
            <input value={searchValue} type="text" name="text" className="input" placeholder="Пошук" onChange={(e) => setSearchTarget(e.target.value)}/>
            <button className="search__btn" onClick={() => searchValue === "/admin" ? window.location.href ="/admin" : setSearchTarget("")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                    <FontAwesomeIcon icon={faTrashCan} />
                </svg>
            </button>
        </div>
    );
}
