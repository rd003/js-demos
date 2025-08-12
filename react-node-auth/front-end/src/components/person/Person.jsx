import { useEffect } from "react"
import axiosHttp from "../../utils/axios.util";

const Person = () => {
    useEffect(() => {
        axiosHttp.get('/people').then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            // set loading false here
        })
    }, []);
    return (
        <div>Person</div>
    )
}

export default Person