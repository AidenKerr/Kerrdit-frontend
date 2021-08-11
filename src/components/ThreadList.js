import { Card, CardHeader, Box, makeStyles, IconButton, Grid, Typography, CardActionArea } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { Link } from 'react-router-dom';
const humanizeDuration = require("humanize-duration");

function ThreadList(props) {

    const threads = props.threads;

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
        threadList: {
            flexGrow: 1
        },
        score: {
            margin: '-10px 0 -10px 0',
            textAlign: 'center'
        }
    });
    const classes = useStyles();


    const threadBoxes = threads.map((thread) => {
        return (
            <Card key={thread.id} className={classes.postCard}>
                <Box className={classes.votingBox}>
                    <IconButton><ArrowUpward/></IconButton>
                    <Typography className={classes.score}>{thread.points}</Typography>
                    <IconButton><ArrowDownward/></IconButton>
                </Box>
                <CardActionArea component={Link} to={`/r/${thread.subkerrdit}/comments/${thread.id}`}>
                    <CardHeader
                        title={thread.subject}
                        subheader={`/r/${thread.subkerrdit} |
                            ${thread.username} |
                            Posted ${
                            humanizeDuration(
                                thread.unix_time_ms - new Date().getTime(), {
                                    largest: 1
                                }
                            )} ago`
                        }
                    />
                </CardActionArea>
            </Card>
        );
    })

    return (
        <Grid item xs={12} sm={8} className={classes.threadList}>
            {threadBoxes[0] ? threadBoxes : null}
        </Grid>
    )
}
export default ThreadList