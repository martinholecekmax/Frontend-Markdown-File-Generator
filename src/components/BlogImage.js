import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Upload } from "../components/Upload";
import { useMutation } from "@apollo/react-hooks";

export const POST_IMAGE = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      image
    }
  }
`;

const REMOVE_IMAGE = gql`
  mutation RemoveImage($postId: ID!) {
    removeImage(postId: $postId)
  }
`;

const RemoveImage = ({ postId }) => {
  console.log("postId", postId);
  console.log("POST_IMAGE", POST_IMAGE);
  const [removeImageMutation, { data, error }] = useMutation(REMOVE_IMAGE, {
    update(cache, { data: { removeImage } }) {
      const { post } = cache.readQuery({
        query: POST_IMAGE,
        variables: { id: postId }
      });
      console.log("post", post);
      if (removeImage) {
        post.image = "";
      }
      cache.writeData({
        query: POST_IMAGE,
        data: { post }
      });
    }
    //   refetchQueries: () => [{ query: POST_IMAGE, variables: { id: postId } }]
  });

  if (error) {
    console.log("error", error);
    return "Error ";
  }
  return (
    <button
      className="btn btn-danger my-3"
      onClick={e => {
        e.preventDefault();
        removeImageMutation({
          variables: { postId }
        });
      }}
    >
      Remove
    </button>
  );
};

const BlogImage = ({ postId }) => {
  const { loading, error, data } = useQuery(POST_IMAGE, {
    variables: { id: postId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("image data", data);

  const image =
    data.post && data.post.image ? (
      <div>
        <img
          src={`http://localhost:4000/images/${data.post.image}`}
          alt="post_image"
          width="200"
          height="200"
        />
        <div>
          <RemoveImage postId={postId} />
        </div>
      </div>
    ) : (
      <Upload />
    );

  return <div style={{ display: `flex` }}>{image}</div>;
};

export default BlogImage;
