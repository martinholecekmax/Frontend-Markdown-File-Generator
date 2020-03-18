import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export const filesQuery = gql`
  {
    blog(id: "5e7086bce3400b219811a65c") {
      id
      title
      category
      type
      status
      image
      date
      path
      title
      category
      description
      metaTitle
      metaDescription
    }
  }
`;

export const Files = () => {
  const { data, loading } = useQuery(filesQuery);
  if (loading) return <div>loading...</div>;
  if (data.blog && data.blog.image) {
    return (
      <img
        src={`http://localhost:4000/images/${data.blog.image}`}
        alt=""
        width="200"
      />
    );
  }
  return null;
};
