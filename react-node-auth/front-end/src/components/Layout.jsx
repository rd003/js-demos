import { useState } from 'react';
import { Outlet } from "react-router";
import { Link } from "react-router";
import useAuth from '../context/AuthContext';
import { useNavigate } from 'react-router';
import axiosHttp from '../utils/axios.util';

const Layout = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        // logging out from backend
        try {
            await axiosHttp.post('auth/logout');
            logoutUser(); // method of AuthContext
            navigate('/login')
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-xl font-bold text-gray-800">PersonApp</h1>
                </div>
                <nav className="mt-8">
                    <Link to="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                        Dashboard
                    </Link>
                    <Link to="/person" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                        Person
                    </Link>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-end px-6">
                    {user && (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center text-gray-600 hover:text-gray-800"
                            >
                                <span className="mr-2">{user.username}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="cursor-pointer absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                                        Profile
                                    </a>
                                    <a onClick={handleLogout} className="block px-4 py-2 cursor-pointer text-gray-600 hover:bg-gray-100">
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    )
                    }

                </header>

                {/* Content Area */}
                <main className="flex-1 p-6">
                    <div className="bg-white rounded-lg shadow-sm h-full p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;