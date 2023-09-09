import React from "react";
import NavBar from "../widgets/NavBar";
import Post from "../widgets/Post";

const Home = () => {
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
        <Post blogPosts={blogPosts}></Post>
      </div>
    </div>
  );
};

export default Home;
