import React, { Component } from "react";
import {
  SidebarContext,
  EDIT_POST_PAGE,
  POSTS_PAGE
} from "../context/sidebarContext";
import PostList from "../components/Blog/posts/postsList";
import Wrapper from "../components/Blog/addAndEditPost/Wrapper";

class Content extends Component {
  state = {};
  static contextType = SidebarContext;
  render() {
    const { page, id } = this.context;
    let component = null;
    if (page === POSTS_PAGE) {
      component = <PostList />;
    } else if (page === EDIT_POST_PAGE) {
      component = <Wrapper id={id} />;
    }
    return component;
  }
}

export default Content;
