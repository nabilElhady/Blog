import React from "react";
import { Link } from "react-router-dom";

// Sample data for blog posts

const Home = ({ blogPosts }) => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold mt-8 mb-4">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <Link to={`/post/${post._id}`}>
            <div
              key={post.id}
              className="hover:scale-125  bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-3xl font-bold text-green-600 mb-2 flex items-center justify-center">
                {post.title}
              </h2>
              <img
                src={`http://localhost:3001/${post.cover}`} // Use the image URL from the post data
                alt={`Image for ${post.title}`}
                className="w-full h-auto rounded-md shadow-md mb-2"
              />
              <p className="text-gray-600">{post.date}</p>
              <p className="text-gray-700 mt-2">{post.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
