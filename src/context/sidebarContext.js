import React, { Component, createContext } from "react";

export const POSTS_PAGE = "POSTS_PAGE";
export const EDIT_POST_PAGE = "EDIT_POST_PAGE";

export const SidebarContext = createContext();

export class SidebarProvider extends Component {
  state = { page: POSTS_PAGE, id: null };

  redirect = (component, id = null) => {
    switch (component) {
      case POSTS_PAGE:
        this.setState({ page: POSTS_PAGE, id });
        break;
      case EDIT_POST_PAGE:
        this.setState({ page: EDIT_POST_PAGE, id });
        break;
      default:
        this.setState({ page: POSTS_PAGE, id });
        break;
    }
  };
  render() {
    return (
      <SidebarContext.Provider
        value={{ ...this.state, redirect: this.redirect }}
      >
        {this.props.children}
      </SidebarContext.Provider>
    );
  }
}
