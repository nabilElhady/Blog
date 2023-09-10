const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Post = require("../models/Post");
// Define the directory where you want to save the uploaded and renamed images
const directoryPath = "C:/Data/full/full/blog/server/uploads";

// Function to save an image with a specific name
function saveImageWithUniqueName(imageData) {
  // Generate a unique filename using UUID
  const uniqueFilename = `${uuidv4()}.jpg`;
  const imagePath = path.join(directoryPath, uniqueFilename);

  // Save the image data to the specified path
  fs.writeFileSync(imagePath, imageData);

  return imagePath;
}

const createPost = async (req, res) => {
  try {
    const { content, summary, title } = req.body;
    const file = req.file; // Access the uploaded file

    const fileExt = path.extname(file.path); // Get the file extension
    const timestamp = Date.now();
    const newFileName = `image_${timestamp}${fileExt}`;
    const newPath = path.join("uploads", newFileName);

    // Rename the file with the new path
    fs.renameSync(file.path, newPath);

    // Now `newPath` contains the path of the renamed file
    console.log("Renamed Image Path:", newPath);

    // Respond with success or other relevant data
    const PostDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
    });
    res.json({ message: "Post created successfully", PostDoc });
  } catch (err) {
    console.log(err);
  }
};
const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};
const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  res.json(post);
};
module.exports = { createPost, getPosts, getPost };
