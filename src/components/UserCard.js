import { Card, CardContent, CardHeader, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
const humanizeDuration = require("humanize-duration");

const useStyles = makeStyles({
    title: {
        wordBreak: 'break-all'
    }
});

function UserCard(props) {

    const [userInfo, setuserInfo] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:3001/api/${props.user}/userinfo`)
            setuserInfo(result.data[0]);
        }
        fetchData();
    });

    return (
        <Grid item xs>
            <Card>
                <CardHeader
                    title={`u/${props.user}`}
                    subheader={`Karma: ${userInfo.karma} |
                        Account Age: ${
                            humanizeDuration(
                                userInfo.unix_time_ms - new Date().getTime(), {
                                    largest: 2
                                }
                            )
                        }`}
                    className={classes.title}
                />
            </Card>
        </Grid>
    );
}
export default UserCard;