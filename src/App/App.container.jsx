import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import App from "./App";

const GET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;

const SET_CURRENT_USER = gql`
    mutation SetCurrentUser($user: User!){
        setCurrentUser(user: $user) @client
    }
`;

const AppContainer = ({data: {currentUser}, setCurrentUser}) => (
    <App currentUser={currentUser} setCurrentUser={(user) => setCurrentUser({variables: { user }})}/>
);

export default compose(
    graphql(GET_CURRENT_USER),
    graphql(SET_CURRENT_USER, {name: 'setCurrentUser'})
)(AppContainer)