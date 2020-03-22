import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import BlogImage from "../../components/BlogImage";
import InputField from "../../components/Blog/UI/inputField/InputField";
import { POST_BY_ID } from "../../queries";

function Post({ postId }) {
  const { loading, error, data } = useQuery(POST_BY_ID, {
    variables: { id: postId }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div>{data.post.status}</div>

      <div>
        <InputField value={data.post.title} label="Title" />
        <InputField value={data.post.category} label="Category" />
        <InputField value={data.post.type} label="Type" />
        {/* <InputField value={data.post.date} label="Date" /> */}
        {/* <ReactDatePicker
          selected={data.post.date}
          // onChange={this.handleChange}
        /> */}
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            id="date"
            defaultValue={data.post.date}
          />
        </div>
        <InputField value={data.post.path} label="Path" />
        <InputField value={data.post.description} label="Description" />
        <InputField value={data.post.metaTitle} label="Meta Title" />
        <InputField
          value={data.post.metaDescription}
          label="Meta Description"
        />
      </div>
      <BlogImage postId={postId} />
    </div>
  );
}

class Blog extends Component {
  state = {};
  render() {
    if (!this.props.postId) {
      return null;
    }
    return (
      <div style={{ margin: `50px auto`, maxWidth: `1000px` }}>
        <Post postId={this.props.postId} />
      </div>
    );
  }
}

export default Blog;
