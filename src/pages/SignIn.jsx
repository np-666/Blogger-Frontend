import "../index.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slide from "../assets/slides.png";
import Logo from "../assets/logo1.png";

export default function SignIn() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const backend = import.meta.env.VITE_API_URL;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backend}/api/login`, formData);
            alert(response.data.message);

            localStorage.setItem("token", response.data.token);

            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed, please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-3/5">
                <img src={Slide} alt="Side" className="object-cover w-full h-full" />
            </div>
            <div className="w-2/5 flex flex-col items-center bg-gray-200">
                <img src={Logo} alt="Logo" className="w-48 mt-16 rounded-xl" />
                <div className="bg-white p-8 rounded-xl shadow-md mt-16 w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Sign In to View</h2>
                    <form onSubmit={handleSubmit}>
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
                            Sign In
                        </button>
                    </form>
                    <br />
                    Don't have an Account? Click here to{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
