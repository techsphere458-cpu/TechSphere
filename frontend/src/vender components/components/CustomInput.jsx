import "../styles/CustomInput.css"

export default function CustomInput({placeholder,type,onChange,value}) {
    return (

        <div className="input-group">
            <input
                className="input-text"
                name="text"
                type={type}
                placeholder="Type here"
                autoComplete="off"
                onChange={event => onChange(event.target.value.trim())}
                value={value}
            />
            <label className="input-text-label" for="text">{placeholder}</label>
        </div>

    );
}