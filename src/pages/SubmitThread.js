import { useState } from "react";
import { Container, Card, CardHeader, CardContent, OutlinedInput, FormControl, FormLabel, Button } from "@material-ui/core";
import axios from "axios";
import { useParams, Link as RouterLink } from "react-router-dom";

function SubmitThread(props) {

    const { subkerrdit } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        console.log(props.user);
        try {
            axios.post('http://localhost:3001/api/threads', {
                sub_name: subkerrdit,
                userID: props.userID,
                subject: title,
                message: content
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Container>
            <Card>
                <CardHeader title={`Submit a new post to r/${subkerrdit}`}/>
                <CardContent>
                    <FormControl fullWidth>
                        <FormLabel htmlFor='title'>Title:</FormLabel>
                        <OutlinedInput id='title' autoFocus rowsMax='1' onChange={(e) => {setTitle(e.target.value)}}></OutlinedInput>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel htmlFor='content'>Post Content:</FormLabel>
                        <OutlinedInput id='content' multiline rows='2' rowsMax='100' onChange={(e) => {setContent(e.target.value)}}></OutlinedInput>
                    </FormControl>
                    <br/>
                    <Button size='large' variant='outlined' component={RouterLink} to={`/r/${subkerrdit}`} onClick={handleSubmit}>Submit</Button>
                </CardContent>
            </Card>
        </Container>
    );
}
export default SubmitThread;