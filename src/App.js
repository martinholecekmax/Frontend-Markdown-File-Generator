import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./ApolloClient";

// import Posts from "./pages/Blog/Posts";
// import Blog from "./pages/Blog/Post";
// import AddPost from "./pages/Blog/AddPost";
// import EditPost from "./pages/Blog/EditPost";
import PostList from "./components/Blog/posts/postsList";
import EditPost from "./components/Blog/editPost/editPost";
import AddPost from "./components/Blog/addPost/addPost";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <PostList />
          {/* <Blog postId={"5e7086bce3400b219811a65c"} /> */}
          <div style={{ display: `flex` }}>
            <AddPost />
            <EditPost postId={"5e7799e8b7a3ed19900af0dc"} />
          </div>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
