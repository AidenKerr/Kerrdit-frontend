import { Button, Card, CardContent, CardHeader, Grid, makeStyles } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from 'react-router-dom';

const useStyles = makeStyles({
    title: {
        wordBreak: 'break-all'
    }
});

function SubCard(props) {
    const classes = useStyles();
    const { subkerrdit } = useParams();

    return (
        <Grid item xs>
            <Card>
                <CardHeader
                    title={`r/${subkerrdit}`}
                    subheader='info here'
                    className={classes.title}
                />
                <CardContent>
                    <Button size='large' variant='outlined' component={Link} to={`/r/${subkerrdit}/submit`} >Submit</Button>
                    <ReactMarkdown>
                        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt nibh in enim hendrerit, nec dapibus arcu luctus. Nunc ornare quam ligula, et tincidunt est pretium sodales. Morbi pretium nisl vel ligula mollis, vitae convallis justo aliquet.

Aliquam lectus nunc, feugiat et porta non, consequat ac sem. Nullam nulla odio, bibendum a dapibus nec, pretium nec augue. Aenean euismod tortor sit amet lectus volutpat, eu mattis metus vestibulum. Suspendisse elementum sagittis justo. Sed pulvinar eget metus at fringilla.`                       }
                    </ReactMarkdown>
                </CardContent>
            </Card>
        </Grid>
    );
}
export default SubCard;