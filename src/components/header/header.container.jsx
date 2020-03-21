import React from 'react';
import { graphql } from "react-apollo";
import { gql } from 'apollo-boost';
import {flowRight as compose} from 'lodash';

import Header from "./header.component";

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

const GET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;

const HeaderContainer = ({ cartHiddenData: {cartHidden }, currentUserData: {currentUser}}) => (
    <Header hidden={cartHidden} currentUser={currentUser}/>
);

export default compose(
    graphql(GET_CART_HIDDEN, {name: 'cartHiddenData'}),
    graphql(GET_CURRENT_USER, {name: 'currentUserData'})
)(HeaderContainer);