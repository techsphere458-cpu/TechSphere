import DefaultComponent from "../../DefaultComponent.jsx";
import {Box} from "@radix-ui/themes";
import TitleSeperated from "../../vender components/components/TitleSeperated.jsx";
import AdminItemRedactContainer from "./AdminItemRedactContainer.jsx";

export default function AdminItemRedactContent({id}){
    return (
      <DefaultComponent>
          <Box width={"100%"}>
             <TitleSeperated text={"Редакція"}/>
              <AdminItemRedactContainer />
          </Box>

      </DefaultComponent>
    );
}