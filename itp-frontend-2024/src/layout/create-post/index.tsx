import React, { useState } from "react";
import { Button } from "antd";
import PopupModal from "../../components/modal";
import PostForm from "../../components/post-form";
import { useCreatePostMutation } from "../../app/services/post.slice";

function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [ createPostFunc ] = useCreatePostMutation();

  const onAddPost = (post: Post) => {
    createPostFunc(post).unwrap().then(()=>{
        alert("Post added");
    }).catch((error)=>{
        console.log({error})
    })
  }
  
  return (
    <div>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Create a Post
      </Button>
      <PopupModal
        isOpen={isOpen}
        title={"Create a post"}
        onClickModal={() => setIsOpen(!isOpen)}
      >
        <PostForm onAddPost={onAddPost}/>
      </PopupModal>
    </div>
  );
}

export default CreatePost;
