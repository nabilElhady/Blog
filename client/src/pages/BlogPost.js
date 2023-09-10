import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/post/${postId}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPost(null);
      });
  }, [postId]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4 flex justify-center">
        {post.title}
      </h1>
      <img
        src={`http://localhost:3001/${post.cover}`}
        alt={`Image for ${post.title}`}
        className="w-full h-auto rounded-md shadow-md mb-4"
      />
      <p className="text-gray-600 mb-4">{post.date}</p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default BlogPost;
