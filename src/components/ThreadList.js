import { Card, CardHeader, Box, makeStyles, IconButton, Grid, Typography, CardActionArea } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
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
                <CardActionArea>
                    <CardHeader
                        title={thread.subject}
                        subheader={`Posted ${
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

    if (threadBoxes[0]) {
        return (
            <Grid item xs={12} sm={8} className={classes.threadList}>
                {threadBoxes}
            </Grid>
        );
    } else return null;
}
export default ThreadList