import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import BlogDetails from "./pages/BlogDetails";
import AddBlog from "./pages/AddBlog";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import EditBlog from "./pages/EditBlog";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/blog/:id" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
                <Route path="/add-blog" element={<ProtectedRoute><AddBlog /></ProtectedRoute>} />
                <Route path="/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
