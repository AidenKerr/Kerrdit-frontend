import { useParams } from "react-router-dom";
import SubCard from "../components/SubCard";
import ThreadsPage from "./ThreadsPage";

function Subkerrdit(props) {

    const { subkerrdit } = useParams();

    return (
        <ThreadsPage 
            apiRoute={`r/${subkerrdit}/threads`}
            sideCard={<SubCard subkerrdit={subkerrdit}/>}
            userID={props.userID}
        />
    );
}

export default Subkerrdit;