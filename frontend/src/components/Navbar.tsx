import React  from 'react';
import {Link} from "@tanstack/react-router";
import UserMenu from "@/components/UserMenu.tsx";
import {useAuth} from "@/auth/authContext.tsx";

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Blog', href: '/blogs' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Feedback', href: '/feedback' },
];

const Navbar: React.FC = () => {
    const {user,logout}= useAuth();
    return (
        <nav className="bg-white text-gray-600 shadow-md fixed top-0 w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-700">EduConsultancy</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="hover:text-gray-800"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* SignUp Button or Profile Icon */}
                    <div className="flex items-center space-x-4">
                        {user ?(<UserMenu user={user} logout={logout} />
                        ) : (
                            // Login Button
                            <>
                            <Link
                                to="/auth/signup"
                                className="flex items-center justify-center text-white font-bold bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 px-6 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
                            >
                                Signup
                            </Link>
                            <Link
                                to="/auth/login"
                                className="flex items-center justify-center text-white font-bold bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 px-6 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
                            >
                                Login
                            </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
