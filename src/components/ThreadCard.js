import { Link } from 'react-router-dom';
import { Card, CardHeader, Box, IconButton, Typography, CardActionArea, makeStyles } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
const humanizeDuration = require("humanize-duration");


function ThreadCard({ post_id, thread_id, points, subkerrdit, username, unix_time_ms, subject, initVote, loggedInID }) {

    const [vote, setVote] = useState(initVote);
    const [score, setScore] = useState(points);
    const useStyles = makeStyles({
        postCard: {
            display: 'flex',
            marginBottom: '5px',
        },
        votingBox: {
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '5px'
        },
        score: {
            margin: '-10px 0 -10px 0',
            textAlign: 'center'
        }
    });
    const classes = useStyles();

    useEffect(() => {
        setVote(initVote);
    }, [initVote]);

    const sendVote = (post_id, user_id, value) => {

        console.log("vote " + vote);

        if (value === vote)
            value = 0;

        const diff = value - vote; // to change the displayed vote count

        axios.post('http://localhost:3001/api/posts/vote', {
            post_id: post_id,
            user_id: user_id,
            value: value
        });
        setScore(score + diff);
        setVote(value);
    }

    const upvoteColor = vote > 0 ? 'error' : 'inherit';
    const downvoteColor = vote < 0 ? 'primary' : 'inherit';

    return (
        <Card className={classes.postCard}>

            <Box className={classes.votingBox}>
                <IconButton onClick={() => sendVote(post_id, loggedInID, 1)}><ArrowUpward color={upvoteColor} /></IconButton>
                <Typography className={classes.score}>{score}</Typography>
                <IconButton onClick={() => sendVote(post_id, loggedInID, -1)}><ArrowDownward color={downvoteColor} /></IconButton>
            </Box>

            <CardActionArea component={Link} to={`/r/${subkerrdit}/comments/${thread_id}`}>
                <CardHeader
                    title={subject}
                    subheader={`/r/${subkerrdit} |
                            ${username} |
                            Posted ${humanizeDuration(
                        unix_time_ms - new Date().getTime(), {
                        largest: 1
                    }
                    )} ago`
                    }
                />
            </CardActionArea>
        </Card>
    );
}
export default ThreadCard