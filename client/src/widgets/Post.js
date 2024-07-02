import React from "react";
import { Link } from "react-router-dom";

const Home = ({ blogPosts }) => {
  return (
    <div className="">
      <h1 className="text-3xl font-bold mt-8 mb-4">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <Link to={`/post/${post._id}`} key={post.id}>
            <div className="bg-gray-100 mx-4 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 relative">
              <h2 className="text-3xl font-bold text-green-600 mb-2 p-4 text-center">
                {post.title}
              </h2>
              <div className="relative overflow-hidden">
                <img
                  src={`http://localhost:3001/${post.cover}`}
                  alt={`Image for ${post.title}`}
                  className="w-full h-auto rounded-full p-4 shadow-md transition-transform duration-300 transform scale-100 hover:scale-125"
                />
              </div>
              <p className="text-gray-600 p-4">{post.date}</p>
              <p className="text-gray-700 px-4 pb-4 text-center">
                {post.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
