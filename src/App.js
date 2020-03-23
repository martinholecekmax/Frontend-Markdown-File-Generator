import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./ApolloClient";

import PostList from "./components/Blog/posts/postsList";
import AddPost from "./components/Blog/addPost/addPost";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Wrapper from "./components/Blog/addAndEditPost/Wrapper";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/addPost" component={AddPost} />
              <Route exact path="/editPost/:id" component={Wrapper} />
              <Route path="/" component={PostList} />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
