import { Card, CardHeader, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    title: {
        wordBreak: 'break-all'
    }
});

function SubCard(props) {
    const classes = useStyles();

    return (
        <Grid item xs>
            <Card>
                <CardHeader
                    title={`r/${props.subkerrdit}`}
                    subheader='info here'
                    className={classes.title}
                />
            </Card>
        </Grid>
    );
}
export default SubCard;