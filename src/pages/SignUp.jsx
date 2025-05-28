import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import Logo from "../assets/logo1.png";
import axios from "axios";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const backend = import.meta.env.VITE_API_URL;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;
        try {
            const response = await axios.post(`${backend}/api/signup`, {
                name,
                email,
                password,
            });
            alert(response.data.message);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed, please try again.");
            console.error("Signup error:", error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-2/5 flex flex-col items-center bg-gray-200">
                <img src={Logo} alt="Logo" className="w-48 mt-16 rounded-xl" />
                <div className="bg-white p-8 rounded-xl shadow-md mt-16 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Register With Us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block mb-2 text-base font-bold">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-base font-bold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                placeholder="john.doe@email.com"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-base font-bold">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                placeholder="abcd@1234"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white text-lg py-2 rounded-lg hover:bg-blue-700 transition">
                            Sign Up
                        </button>
                    </form>
                    <br />
                    Have an Account? Click here to{" "}
                    <Link to="/" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
            <div className="w-3/5 bg-blue-400 flex flex-col items-center justify-center rounded-xl">
                <h1 className="text-3xl font-bold text-black mb-4">Welcome to Our Platform</h1>
                <div className="bg-white text-black p-8 rounded-xl m-4 shadow-md w-full max-w-2xl text-center">
                    <h3 className="text-2xl font-semibold mb-4">Privacy Policy</h3>
                    <ul className="list-disc pl-5 space-y-2 text-base text-left">
                        <li>Your personal data is stored securely and never shared without consent.</li>
                        <li>You can request deletion of your data at any time.</li>
                        <li>All information is encrypted during transmission.</li>
                        <li>We only collect data necessary for providing our services.</li>
                    </ul>
                </div>
                <div className="bg-white text-black p-8 rounded-xl m-4 shadow-md w-full max-w-2xl text-center">
                    <h3 className="text-2xl font-semibold mb-4">Terms & Conditions</h3>
                    <ul className="list-disc pl-5 space-y-2 text-base text-left">
                        <li>By using our service, you agree to abide by our usage policies.</li>
                        <li>Accounts must not be used for unlawful activities.</li>
                        <li>Violation of terms may result in suspension or termination.</li>
                        <li>We reserve the right to modify terms at any time.</li>
                        <li>Continued use of the site implies acceptance of updated terms.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
