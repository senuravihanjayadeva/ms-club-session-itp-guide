import React, { useState } from "react";
import { Button } from "antd";
import PopupModal from "../../components/modal";
import PostForm from "../../components/post-form";
import { useUpdatePostMutation } from "../../app/services/post.slice";

function EditPost({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [updatePostFunc] = useUpdatePostMutation();

  const onEditPost = (post: Post) => {
    updatePostFunc(post)
      .unwrap()
      .then(() => {
        alert("Post updated");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      {isOpen && (
        <PopupModal
          isOpen={isOpen}
          title={"Edit a post"}
          onClickModal={() => setIsOpen(!isOpen)}
        >
          <PostForm id={id} onEditPost={onEditPost} />
        </PopupModal>
      )}
    </div>
  );
}

export default EditPost;
