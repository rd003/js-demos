import React from 'react'
import useUser from '../contexts/UserContext';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { loginUser } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser({ username, password });
    }


    return (

        <form onSubmit={handleSubmit} className='border-2 p-4 w-1/2'>
            <h1 className='text-2xl font-bold mb-3'>Login</h1>

            <div className="inline-flex gap-3">
                <input type="text" className="border-2 px-3 py-2 rounded-xl" name="username" id="username" placeholder='username' onChange={(e) => { setUsername(e.target.value) }} />

                <input type="password" className="border-2 px-3 py-2 rounded-xl" name="password" id="password" placeholder='upassword' onChange={(e) => { setPassword(e.target.value) }} />

                <button type="submit" className="bg-sky-200 cursor-pointer border-2 px-3 py-2 rounded-xl">Save</button>
            </div>



        </form>
    )
}

export default Login