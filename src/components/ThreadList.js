function ThreadList(props) {

    const threads = props.threads;

    const threadBoxes = threads.map((thread) => {
        return <div key={thread.id}>{thread.subject}</div>;
    })

    if (threadBoxes[0]) {
        return threadBoxes;
    } else return null;
}
export default ThreadList