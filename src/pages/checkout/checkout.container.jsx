import React from 'react';
import { graphql } from "react-apollo";
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';
import CheckoutPage from "./checkout.component";

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const GET_CART_TOTAL = gql`
    {
        cartTotal @client
    }
`;

const CheckoutPageContainer = ({cartItemsData: { cartItems }, cartTotalData: { cartTotal } }) => {
    return <CheckoutPage cartItems={cartItems} total={cartTotal}/>
};

export default compose(
    graphql(GET_CART_ITEMS, {name: 'cartItemsData'}),
    graphql(GET_CART_TOTAL, {name: 'cartTotalData'})
)(CheckoutPageContainer);