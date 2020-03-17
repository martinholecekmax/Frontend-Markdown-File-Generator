import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { BLOG_IMAGE } from "./BlogImage";

const REMOVE_IMAGE = gql`
  mutation RemoveImage($blogId: ID!) {
    removeImage(blogId: $blogId)
  }
`;

const RemoveImage = ({ blogId }) => {
  console.log("BLOG_IMAGE", BLOG_IMAGE);
  const [removeImage] = useMutation(REMOVE_IMAGE, {
    refetchQueries: [{ query: BLOG_IMAGE, variables: { id: blogId } }]
  });
  return (
    <div
      onClick={e => {
        e.preventDefault();
        removeImage({
          variables: { blogId: blogId }
        });
      }}
    >
      Remove
    </div>
  );
};

export default RemoveImage;
