import { Container, Grid } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ThreadList from '../components/ThreadList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    userPage: {
        marginTop: '15px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse'
        }
    }
}));


/* 
    ThreadsPage is the typical Kerrdit page
    It contains a list of threads on the left, and a sidebar with info on the right

    props:
        apiRoute: the route to return the list of threads
        sideCard: the component to show on the right. Should be a Grid with 'item xs', and a card as child
*/

function ThreadsPage(props) {

    const [threads, setThreads] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:3001/api/${props.apiRoute}`)
            setThreads(result.data);
        }
        fetchData();
    }, [props.apiRoute]);


    return (
        <Container>
            <Grid
                container
                justifycontent='center'
                spacing={1}
                className={classes.userPage}
            >
                <ThreadList threads={threads} />
                {props.sideCard}
            </Grid>
        </Container>
    );

}

export default ThreadsPage;