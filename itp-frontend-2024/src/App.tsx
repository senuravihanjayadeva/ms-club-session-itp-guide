import "./App.css";
import React, { useState } from "react";
import PostsList from "./pages/posts-list";
import CreatePost from "./layout/create-post";

function App() {
  return (
    <div>
      <CreatePost/>
      <PostsList />
    </div>
  );
}

export default App;
