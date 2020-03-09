import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, gql } from 'apollo-boost'; //we only installed apollo-boost and react-apollo but we are able to use other libraries like apollo-http-link because they're bundled with apollo-boost

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

const cache = new InMemoryCache(); //this stores the requested data in memory// when we request the same data this will give us that data without requesting again


const client = new ApolloClient({
  link: httpLink,
  cache
});
//client has query and mutation functions to use
client.query({//gql is for the javascript to understand graphql requests
  //graphql query like we saw it in the playground
  query: gql` 
  {
    getCollectionsByTitle(title: "hats"){
      id
      title
      items {
        id
        name
        imageUrl
        price
      }
    }
  }
  `
}).then(res => console.log(res)).catch(error => console.log(error))

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
