import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ThreadList from '../components/ThreadList';
import UserCard from '../components/UserCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    userPage: {
        marginTop: '15px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse'
        }
    }
}));

function User(props) {

    const { username } = useParams();
    const [threads, setThreads] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:3001/api/${username}/threads`);
            setThreads(result.data);
        }
        fetchData();
    }, [username]);
    

    return (
        <Container>
            <Grid
            container
            justifycontent='center'
            spacing={1}
            className={classes.userPage}
        >
            <ThreadList threads={threads}/>
            <UserCard user={username}/>
        </Grid>
        </Container>
        
    );

}

export default User;