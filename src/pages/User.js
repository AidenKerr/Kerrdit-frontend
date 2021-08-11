import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';
import ThreadsPage from './ThreadsPage';

function User() {

    const { username } = useParams();

    return (
        <ThreadsPage
            apiRoute={`u/${username}/threads`}
            sideCard={<UserCard user={username}/>}
        />
    );

}

export default User;