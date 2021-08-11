import { Container, Card, CardHeader, CardContent, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router-dom";

/*
    Thread is the page that shows an individual thread, with all of it's comments below
*/

const useStyles = makeStyles((theme) => ({
    threadCard: {
        marginTop: '15px',
    }
}));

function Thread(props) {

    const { id } = useParams();
    const classes = useStyles();
    const [threadData, setThreadData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`http://localhost:3001/api/thread/${id}`);
            setThreadData(result.data[0]);
        }
        fetchData();
    }, [id]);

    return (
        <Container>
            <Card className={classes.threadCard}>
                <CardHeader title={threadData.subject} />
                <CardContent>
                    <ReactMarkdown>
                        {threadData.message}
                    </ReactMarkdown>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Thread;