import React from "react";
import { Card } from "antd";
import EditPost from "../../layout/edit-post";

const PostCard: React.FC<Post> = ({ id, title, body }) => {
  return (
    <>
      <div className="col-md-4 mb-4">
        <Card title={title} bordered={false}>
          <p>{body}</p>
          { id && <EditPost id={id}/> }
        </Card>
      </div>
    </>
  );
};

export default PostCard;
