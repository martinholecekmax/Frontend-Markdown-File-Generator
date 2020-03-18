import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./ApolloClient";

import Posts from "./pages/Blog/Posts";
import Blog from "./pages/Blog/Post";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <Posts />
          <Blog blogId={"5e7086bce3400b219811a65c"} />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
