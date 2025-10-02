import axios from "axios";

export default async function createImage(file){
    const formData = new FormData();

    formData.append("file",file);

    const response = await axios.post("/api/cloudinary/add/image",formData,{
        headers: {
            "Content-Type": "multipart/form-data"
        }});

    return response.data;
}