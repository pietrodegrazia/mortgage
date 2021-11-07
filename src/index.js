import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const GRAPHQL_URI = process.env.GRAPHQL_URI || "http://localhost:8080"

const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache()
});

ReactDOM.render(
	<ApolloProvider client={client}>
    	<App />
  	</ApolloProvider>,
	document.getElementById('root')
);
