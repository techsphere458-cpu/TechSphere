import "../styles/CustomInputWithCleaner.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Box, Tooltip} from "@radix-ui/themes";

export default function CustomInputWithCleaner({setValue, value, placeholder, type,tooltipText}) {
    return (
        <Tooltip content={tooltipText}>
            <Box className="containerOfInput">

                <input value={value} type={type} name="text" className="inputOfInput" placeholder={placeholder}
                       onChange={(e) => setValue(e.target.value)}/>
                <button className="search__btnOfInput" onClick={() => setValue("")}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </svg>
                </button>

            </Box>
        </Tooltip>
    );
}
