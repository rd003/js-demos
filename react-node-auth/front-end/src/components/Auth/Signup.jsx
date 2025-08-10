import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { useReducer } from 'react';
import { Link } from 'react-router-dom';

const SignupComponent = () => {
    const schema = yup
        .object({
            email: yup
                .string()
                .email()
                .required('Email is required'),
            password: yup
                .string()
                .required('Password is required')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
                ),
            confirmPassword: yup
                .string()
                .required('ConfirmPassword is required')
                .oneOf([yup.ref('password'), null], 'Password must match'),
            terms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const initialState = {
        loading: false,
        error: '',
        message: ''
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'START':
                return { ...state, loading: true, };
            case 'SUCCESS':
                return { ...state, loading: false, error: '', message: action.payload };
            case 'ERROR':
                return { ...state, loading: false, error: action.payload, message: '' };
            case 'RESET':
                return initialState;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const onSubmit = async (data) => {
        dispatch({ type: 'SUCCESS' });
        try {
            const { email, password } = data;
            await axios.post('/api/auth/signup', { email, password });

            dispatch({ type: 'SUCCESS', payload: 'Account created successfully!' });

            reset();
        }
        catch (err) {
            console.log(err);
            dispatch({
                type: 'ERROR',
                payload: err.response?.data?.message || 'Something went wrong.',
            });
        }

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                {state.loading && <p className="text-blue-500">loading...</p>}
                {state.error && <p className="text-red-600">{state.error}</p>}
                {state.message && <p className="text-green-600">{state.message}</p>}

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email*
                            </label>
                            <input {...register("email")}
                                id="email"
                                type="text"
                                autoComplete="off"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="John Doe"
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>


                        <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                Password*
                            </label>
                            <input {...register("password")}
                                id="new-password"
                                type="password"
                                autoComplete="off"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="••••••••"
                            />

                            {errors.password && (
                                <p className='mt-1 text-red-600'>{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                Confirm Password*
                            </label>
                            <input {...register("confirmPassword")}
                                id="confirm-password"
                                type="password"
                                autoComplete="off"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="••••••••"
                            />

                            {errors.confirmPassword && (
                                <p className='mt-1 text-red-600'>{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            {...register("terms")}
                            id="terms"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                            I agree to the{' '}
                            <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>

                    {errors.terms && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.terms.message}
                        </p>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SignupComponent;