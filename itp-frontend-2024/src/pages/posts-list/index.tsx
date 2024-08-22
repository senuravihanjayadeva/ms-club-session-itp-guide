import React from "react";
import { useGetPostsQuery } from "../../app/services/post.slice";
import PostCard from "../../components/post-card";

const PostsList = () => {
  const { data: posts, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="row">
        {posts &&
          posts.length &&
          posts.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </div>
  );
};

export default PostsList;
