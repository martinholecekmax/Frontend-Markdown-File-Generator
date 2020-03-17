import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";

const link = createUploadLink({
  uri: "http://localhost:4000/graphql"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default client;
