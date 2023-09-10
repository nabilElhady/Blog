import React, { useEffect, useState } from "react";
import NavBar from "../widgets/NavBar";
import Post from "../widgets/Post";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/post/getPosts").then((res) => {
      console.log(res.data);
      setPosts(res.data); // Update the posts state with the entire array
    });
  }, []);
  const blogPosts = [
    {
      id: 1,
      title: "Title of the First Blog Post",
      date: "September 3, 2023",
      author: "Author Name",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis libero et...",
      image: "https://via.placeholder.com/400x200", // Add an image URL for each post
    },
    {
      id: 2,
      title: "Title of the Second Blog Post",
      date: "September 4, 2023",
      author: "Another Author",
      summary:
        "Fusce auctor tincidunt erat. Vestibulum tincidunt nunc eu ante hendrerit...",
      image: "https://via.placeholder.com/400x200", // Add an image URL for each post
    },
    // Add more blog post data as needed
  ];
  return (
    <div>
      <div>
        <Post blogPosts={posts}></Post>
      </div>
    </div>
  );
};

export default Home;
