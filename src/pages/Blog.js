import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import BlogImage from "../components/BlogImage";
import InputField from "../components/InputField";

export const BLOG_POST_BY_ID = gql`
  query Blog($id: ID!) {
    blog(id: $id) {
      id
      title
      category
      type
      published
      image
      date
      path
      description
      metaTitle
      metaDescription
    }
  }
`;

function BlogPost({ blogId }) {
  const { loading, error, data } = useQuery(BLOG_POST_BY_ID, {
    variables: { id: blogId }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div>
        {/* <label for="title">Title</label>
        <input
          className="form-control"
          type="text"
          name="title"
          value={data.blog.title}
        /> */}
        <InputField value={data.blog.title} label="Title" />
        <InputField value={data.blog.category} label="Category" />
        <InputField value={data.blog.type} label="Type" />
        <InputField value={data.blog.date} label="Date" />
        <InputField value={data.blog.path} label="Path" />
        <InputField value={data.blog.description} label="Description" />
        <InputField value={data.blog.metaTitle} label="Meta Title" />
        <InputField
          value={data.blog.metaDescription}
          label="Meta Description"
        />
      </div>
      {/* <div>{data.blog.category}</div>
      <div>{data.blog.type}</div>
      <div>{data.blog.published}</div>
      <div>{data.blog.image}</div>
      <div>{data.blog.date}</div>
      <div>{data.blog.path}</div>
      <div>{data.blog.description}</div>
      <div>{data.blog.metaTitle}</div>
      <div>{data.blog.metaDescription}</div> */}
      <BlogImage blogId={blogId} />
    </div>
  );
}

class Blog extends Component {
  state = {};
  render() {
    if (!this.props.blogId) {
      return null;
    }
    return (
      <div style={{ margin: `50px auto`, maxWidth: `1000px` }}>
        <BlogPost blogId={this.props.blogId} />
      </div>
    );
  }
}

export default Blog;
