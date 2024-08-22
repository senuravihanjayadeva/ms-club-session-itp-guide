// src/components/PostForm.tsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useLazyGetPostByIdQuery } from "../../app/services/post.slice";

interface PostFormProps {
  id?: number;
  onAddPost?: (post: Post) => void;
  onEditPost?: (post: Post) => void;
  onClose?: () => void
}

const PostForm: React.FC<PostFormProps> = ({ onAddPost, onEditPost, id }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [ getPostByIdFunc, {data: postDetails} ] = useLazyGetPostByIdQuery();

  useEffect(()=>{
    if(id){
      getPostByIdFunc(id);
    }
  },[id])

  useEffect(()=>{
    if(postDetails){
      setTitle(postDetails.title);
      setBody(postDetails.body);
      setUserId(postDetails.userId);
    }
  }, [postDetails])

  const handleSubmit = () => {
    onAddPost && onAddPost({ userId, title, body });
    onEditPost && onEditPost({id, userId, title, body});
    setTitle("");
    setBody("");
    setUserId(0);
  };

  return (
    <div className="container mb-4">
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="User Id"
          rules={[{ required: true, message: "Please enter user Id!" }]}
        >
          <Input
            type="number"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
            placeholder="Enter user id"
          />
        </Form.Item>

        <Form.Item
          label="Title"
          rules={[{ required: true, message: "Please enter a title!" }]}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
          />
        </Form.Item>

        <Form.Item
          label="Body"
          rules={[{ required: true, message: "Please enter the body!" }]}
        >
          <Input.TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter the body"
            rows={4}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;
