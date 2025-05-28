import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const backend = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${backend}/api/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Error fetching blog details:", error);
            }
        };
        fetchBlog();
    }, [id]);

    const deleteBlog = async () => {
        try {
            await axios.delete(`${backend}api/blogs/${id}`);
            alert("Blog deleted successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error deleting blog:", error);
            alert("Failed to delete blog.");
        }
    };

    if (!blog) return <p>Loading...</p>;

    return (
        <div>
            <Navbar />
            <div className="p-8 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-8 border-gray-300 border">
                <h1 className="text-3xl font-bold">{blog.title}</h1>
                <p className="text-gray-500 mt-2">
                    By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <hr className="my-4" />
                <p className="text-lg whitespace-pre-line">{blog.content}</p>
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={() => navigate(`/edit/${id}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Edit
                    </button>
                    <button onClick={deleteBlog} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
