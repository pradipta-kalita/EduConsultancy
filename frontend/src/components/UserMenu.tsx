import React, {useState} from "react";
import {Link,useNavigate} from "@tanstack/react-router";
import {User} from "@/auth/authContext.tsx";

const UserMenu: React.FC<{ user: User; logout: () => void }> = ({user, logout}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="relative">
            {/* User Icon / Initial */}
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm focus:outline-none"
            >
                {user.username.charAt(0).toUpperCase()}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <ul className="py-1 text-gray-700">
                        <li>
                            {user.role === 'ADMIN' &&
                                <Link
                                    to="/admin/dashboard"
                                    onClick={closeMenu}
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Dashboard
                                </Link>}
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                onClick={closeMenu}
                                className="block px-4 py-2 hover:bg-gray-100"
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => {
                                    logout();
                                    closeMenu();
                                    navigate({to:"/"});
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {/* Click outside to close the menu */}
            {isOpen && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 z-40 bg-transparent"
                ></div>
            )}
        </div>
    );
};

export default UserMenu;
