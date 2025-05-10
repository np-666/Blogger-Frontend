import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, PlusCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import Logo from "../assets/logo1.png";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("You have been logged out!");
        navigate("/");
    };

    return (
        <nav className="bg-blue-700 text-white flex justify-between items-center px-2 shadow-md">
            <Link to="/dashboard">
                <img src={Logo} alt="Logo" className="w-48 h-16 rounded" />
            </Link>
            <div className="flex items-center space-x-6">
                <Link
                    to="/dashboard"
                    className="flex items-center bg-white text-blue-700 font-semibold text-lg px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                    <HomeIcon className="h-5 w-5 mr-2" />
                    Dashboard
                </Link>
                <Link
                    to="/add-blog"
                    className="flex items-center bg-green-500 text-white font-semibold text-lg px-4 py-2 rounded-lg hover:bg-green-600 transition">
                    <PlusCircleIcon className="h-5 w-5 mr-2" />
                    Add Blog
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex items-center bg-red-500 text-white font-semibold text-lg px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    Sign Out
                </button>
            </div>
        </nav>
    );
}
