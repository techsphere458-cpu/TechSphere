import "../styles/ImgInput.css"

export default function ImgInput({setImg}) {

    return (
        <>
            <label className="imgInput">
                <input
                    type="file"
                    accept="image/png"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            if (file.type !== "image/png") {
                                alert("Дозволені тільки PNG файли!");
                                e.target.value = "";
                                return;
                            }
                           setImg(file);
                        }
                    }}
                />
                <span>📷 Завантажити зображення</span>
            </label>

        </>
    );
}

