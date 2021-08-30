import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';
import ThreadsPage from './ThreadsPage';

function User(props) {

    const { username } = useParams();

    return (
        <ThreadsPage
            apiRoute={`u/${username}/threads`}
            sideCard={<UserCard user={username}/>}
            userID={props.userID}
        />
    );

}

export default User;