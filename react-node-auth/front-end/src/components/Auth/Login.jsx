import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();
    const schema = yup
        .object({
            username: yup
                .string()
                .required('Username is required'),
            password: yup
                .string()
                .required('Password is required')
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const onSubmit = async (loginData) => {
        setError('');
        setLoading(true);
        try {
            await axios.post('/api/auth/login', loginData);
            // we don't need withCredential:true because we are in a same origin.
            const me = (await axios.get('/api/auth/me')).data;
            loginUser(me);
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || 'Something went wrong!!');
        }
        finally {
            setLoading(false);
            reset();
        }
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <div className="min-h-screen flex justify-center  items-center bg-gray-50">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Login
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    {loading && <p className='m-1'>Loading...</p>}
                    {error && <p className='m-1 text-red-600'>Error</p>}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                {...register("username")}
                                type="text"
                                autoComplete="off"
                                value="john@example.com"
                                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="username"
                            />
                            {errors.username && <p className='mt-1 text-red-600'>{errors.username.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                {...register("password")}
                                type="password"
                                autoComplete="off"
                                value="John@123"
                                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && <p className='mt-1 text-red-600'>{errors.password.message}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login