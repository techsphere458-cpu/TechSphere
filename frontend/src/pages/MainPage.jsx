import DefaultComponent from "../DefaultComponent.jsx";
import MainPageContent from "../elements/MainPageComponents/MainPageContent.jsx";

export default function MainPage() {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <DefaultComponent pageName={"main"}>
            <MainPageContent/>
        </DefaultComponent>

    )
}