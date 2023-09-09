const express = require("express");
const multer = require("multer");
const createPost = async (req, res) => {
  try {
    const { content, summary, title } = req.body;
    const file = req.file; // Access the uploaded file

    // Here, you can save the file details to your database if needed
    // You can also return a response with the file details
    res.json({ content, summary, title, file });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createPost };
