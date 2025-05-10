import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function Dashboard() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`https://blogger-backend-c5d7.onrender.com/api/blogs`);
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-8">
                <h1 className="text-4xl font-bold text-center mb-6">Latest Blogs</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <Link to={`/blog/${blog._id}`}>
                            <div
                                key={blog._id}
                                className="shadow-lg rounded-lg p-6 bg-white hover:shadow-xl transition">
                                <h2 className="text-xl font-bold">{blog.title}</h2>
                                <h4 className="text-gray-600">
                                    By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}
                                </h4>
                                <p className="line-clamp-2 mt-4 overflow-hidden">{blog.content}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <h3 className="text-blue-500 font-semibold hover:underline">Read More ➜</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
