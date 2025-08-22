import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import BlogCard from "../components/BlogCard";
import {Link} from "react-router";

const AllBlogs = function () {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchBlogs() {
      try {
        const response = await axios.get(
          "https://blog-backend-1-iif8.onrender.com/api/v1/blogs"
        );
        setBlogs(response.data);
      } catch (error) {
        toast.error("Failed to get all blogs");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <main>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Blogs</h1>
        <p className="text-gray-600 mb-6">
          Explore all the amazing stories shared by community
        </p>
      </div>
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogs.map(function (blog) {
            return <BlogCard key={blog.id} blog={blog} />;
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No blogs available yet.</p>
          <Link
            to="/add-blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Write the First Blog
          </Link>
        </div>
      )}
    </main>
  );
};

export default AllBlogs;
