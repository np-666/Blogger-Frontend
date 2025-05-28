import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({ title: "", content: "" });
    const backend = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${backend}/api/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };
        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${backend}/api/blogs/${id}`, blog);
            alert("Blog updated successfully!");
            navigate(`/blog/${id}`);
        } catch (error) {
            console.error("Error updating blog:", error);
            alert("Failed to update blog.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-8 border-gray-300 border">
                <h1 className="text-3xl font-bold">Edit Blog</h1>
                <form onSubmit={handleUpdate} className="mt-4">
                    <label className="block font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-2"
                        required
                    />

                    <label className="block font-semibold mt-4">Content</label>
                    <textarea
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-2"
                        rows="6"
                        required></textarea>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate(`/blog/${id}`)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Update Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
