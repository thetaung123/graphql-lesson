import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import CheckoutItem from "./checkout-item.component";

const REMOVE_ITEM_FROM_CART = gql`
    mutation RemoveItemFromCart($item: Item!) {
        removeItemFromCart(item: $item) @client
    }
`;

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) { #defining which mutation type we're using
        addItemToCart(item : $item) @client #calling the mutation function
    }
`;

const CLEAR_ITEM_FROM_CART = gql`
    mutation ClearItemFromCart($item: Item!) {
        clearItemFromCart(item : $item ) @client
    }
`;

const CheckoutItemContainer = ({cartItem , addItem, removeItem, clearItem}) => (
    <CheckoutItem cartItem={cartItem}
                  addItem={cartItem => addItem({variables: { item: cartItem}})}
                  removeItem={cartItem => removeItem({variables: { item: cartItem}})}
                  clearItem={cartItem => clearItem({variables: { item: cartItem}})}/>
);

export default compose(
    graphql(ADD_ITEM_TO_CART, {name: 'addItem'}),
    graphql(REMOVE_ITEM_FROM_CART, {name: 'removeItem'}),
    graphql(CLEAR_ITEM_FROM_CART, {name: 'clearItem'})
)(CheckoutItemContainer)