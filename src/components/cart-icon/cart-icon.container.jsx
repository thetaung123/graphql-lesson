import React from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';

import CartIcon from "./cart-icon.component";

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;

const CartIconContainer = ({data: {itemCount}, toggleCartHidden}) => (
    <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount}/>
);
//instead of using Query and Mutation components, we can also us these HOC components which resembles react-redux
export default compose(// compose is like connect
    graphql(GET_ITEM_COUNT), //in here, it accepts all the queries and mutations
    graphql(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'}) //queries has default name of data and mutations have default name of mutate // but you can change the names in option object
)(CartIconContainer);