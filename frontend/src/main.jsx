import {createRoot} from 'react-dom/client'
import "@radix-ui/themes/styles.css";
import App from './App.jsx'
import {Box, Theme} from "@radix-ui/themes";
import "./index.css"

createRoot(document.getElementById('root')).render(
    <Theme accentColor={"indigo"}>

            <App/>

    </Theme>
)
