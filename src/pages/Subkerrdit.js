import { useParams } from "react-router-dom";
import SubCard from "../components/SubCard";
import ThreadsPage from "./ThreadsPage";

function Subkerrdit() {

    const { subkerrdit } = useParams();

    return (
        <ThreadsPage 
            apiRoute={`r/${subkerrdit}/threads`}
            sideCard={<SubCard subkerrdit={subkerrdit}/>}
        />
    );
}

export default Subkerrdit;