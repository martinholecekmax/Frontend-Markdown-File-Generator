import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Upload } from "../components/Upload";
import { useMutation } from "@apollo/react-hooks";

export const BLOG_IMAGE = gql`
  query Blog($id: ID!) {
    blog(id: $id) {
      id
      image
    }
  }
`;

const REMOVE_IMAGE = gql`
  mutation RemoveImage($blogId: ID!) {
    removeImage(blogId: $blogId)
  }
`;

const RemoveImage = ({ blogId }) => {
  console.log("blogId", blogId);
  console.log("BLOG_IMAGE", BLOG_IMAGE);
  const [removeImageMutation, { data, error }] = useMutation(REMOVE_IMAGE, {
    update(cache, { data: { removeImage } }) {
      const { blog } = cache.readQuery({
        query: BLOG_IMAGE,
        variables: { id: blogId }
      });
      console.log("blog", blog);
      if (removeImage) {
        blog.image = "";
      }
      cache.writeData({
        query: BLOG_IMAGE,
        data: { blog }
      });
    }
    //   refetchQueries: () => [{ query: BLOG_IMAGE, variables: { id: blogId } }]
  });

  console.log("data back", data);
  if (error) {
    console.log("error", error);
    return "Error ";
  }
  return (
    <button
      onClick={e => {
        e.preventDefault();
        removeImageMutation({
          variables: { blogId }
        });
      }}
    >
      Remove
    </button>
  );
};

const BlogImage = ({ blogId }) => {
  const { loading, error, data } = useQuery(BLOG_IMAGE, {
    variables: { id: blogId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("image data", data);

  const image =
    data.blog && data.blog.image ? (
      <div>
        <img
          src={`http://localhost:4000/images/${data.blog.image}`}
          alt="blog_image"
          width="200"
          height="200"
        />
        <div>
          <RemoveImage blogId={blogId} />
        </div>
      </div>
    ) : (
      <Upload />
    );

  return <div style={{ display: `flex` }}>{image}</div>;
};

export default BlogImage;
