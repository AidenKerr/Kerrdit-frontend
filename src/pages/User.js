import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ThreadList from '../components/ThreadList';

function User(props) {

    const { username } = useParams();

    const [threads, setThreads] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(`http://localhost:3001/api/${username}/threads`);

            setThreads(result.data);
        }

        fetchData();

    }, [username]);

    return (
        <div>
            <h2>User: {username}</h2>
            <ThreadList threads={threads} />
        </div>
    );

}

export default User;