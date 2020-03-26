import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./ApolloClient";

import Sidebar from "./components/SideBar/sidebar";
import { SidebarProvider } from "./context/sidebarContext";
import Content from "./pages/Content";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <SidebarProvider>
            <div style={{ display: `flex`, minHeight: `100%` }}>
              <Sidebar />
              <Content />
            </div>
          </SidebarProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
