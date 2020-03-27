import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./ApolloClient";

import Sidebar from "./components/SideBar/sidebar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import PostList from "./components/Blog/posts/postsList";
import EditPostWrapper from "./components/Blog/editPost/editPostWrapper";
import CategoryList from "./components/Blog/category/categoryList";
import EditCategoryWrapper from "./components/Blog/editCategory/editCategoryWrapper";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <div style={{ display: `flex`, minHeight: `100%` }}>
              <Sidebar />
              <Switch>
                <Route path="/blog" exact component={PostList} />
                <Route path="/blog/:id" component={EditPostWrapper} />
                <Route path="/category" exact component={CategoryList} />
                <Route path="/category/:id" component={EditCategoryWrapper} />
              </Switch>
            </div>
          </BrowserRouter>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
