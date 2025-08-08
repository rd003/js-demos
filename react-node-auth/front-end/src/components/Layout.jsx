import { useState } from 'react';

const Layout = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-xl font-bold text-gray-800">App Name</h1>
                </div>
                <nav className="mt-8">
                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                        Dashboard
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                        Person
                    </a>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-end px-6">
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center text-gray-600 hover:text-gray-800"
                        >
                            <span className="mr-2">John Doe</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                                    Profile
                                </a>
                                <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6">
                    <div className="bg-white rounded-lg shadow-sm h-full p-6">
                        {/* content pages */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;