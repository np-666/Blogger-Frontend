import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function AddBlog() {
    const [formData, setFormData] = useState({ title: "", content: "", author: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(`https://blogger-backend-c5d7.onrender.com/api/blogs`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Blog added successfully!");
            navigate("/dashboard");
        } catch (error) {
            alert("Failed to add blog!");
            console.error("Error creating blog:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 border-gray-300 border">
                <h1 className="text-2xl font-bold">Create a New Blog</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Blog Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="block w-full border p-2 rounded-lg mb-4"
                        required
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Author Name"
                        value={formData.author}
                        onChange={handleChange}
                        className="block w-full border p-2 rounded-lg mb-4"
                        required
                    />
                    <textarea
                        name="content"
                        placeholder="Blog Content"
                        value={formData.content}
                        onChange={handleChange}
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        className="block w-full border p-2 rounded-lg mb-4"
                        required></textarea>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Publish Blog
                    </button>
                </form>
            </div>
        </div>
    );
}
