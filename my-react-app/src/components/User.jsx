import { useParams } from "react-router-dom";

export default function User() {
    const params = useParams();

    return (
        <>
            <h1>I am {params.username}</h1>
        </>
    );

}