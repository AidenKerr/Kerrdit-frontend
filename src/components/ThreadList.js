import { useEffect, useState } from 'react';
import ThreadCard from './ThreadCard';
import { makeStyles, Grid } from '@material-ui/core';
import axios from 'axios';

function ThreadList(props) {

    const threads = props.threads;

    const [votes, setVotes] = useState({});
    const [userInfo, setUserInfo] = useState();
    const useStyles = makeStyles({
        threadList: {
            flexGrow: 1
        },
    });
    const classes = useStyles();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('username');
        const loggedInUserID = localStorage.getItem('userID');
        if (loggedInUser) {
            setUserInfo({
                username: loggedInUser,
                userID: loggedInUserID
            });
        }
    }, []);

    useEffect(() => {
        const IDs = threads.map((thread) => {
            return thread.post_id;
        });

        const fetchData = async () => {
            const result = await axios.get('http://localhost:3001/api/userVotes', {
                params: {
                    IDs: IDs,
                    user_id: userInfo ? userInfo.userID : null
                }
            });

            let newVotes = {};
            for (let i = 0; i < result.data.length; i++) {
                newVotes[result.data[i].post_id] = result.data[i].value;
            }
            setVotes(newVotes);
        }
        fetchData();
    }, [threads, userInfo]);

    const threadBoxes = threads.map((thread) => {
        return <ThreadCard
            key={thread.post_id}
            post_id={thread.post_id}
            thread_id={thread.thread_id}
            points={thread.points}
            subkerrdit={thread.subkerrdit}
            username={thread.username}
            unix_time_ms={thread.unix_time_ms}
            subject={thread.subject}
            initVote={votes[thread.post_id] ? votes[thread.post_id] : 0}
        />
    })

    return (
        <Grid item xs={12} sm={8} className={classes.threadList}>
            {threadBoxes[0] ? threadBoxes : null}
        </Grid>
    )
}
export default ThreadList