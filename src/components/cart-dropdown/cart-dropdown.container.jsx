import React from 'react';
import { Query, Mutation } from "react-apollo";
import { gql } from 'apollo-boost';

import CartDropdown from "./cart-dropdown.component";

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

const CartDropdownContainer = () => ( //writing mutation and query in the same function and passing both of the properties down in CartDropdown
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            (toggleCartHidden) => (
                <Query query={GET_CART_ITEMS}>
                    {
                        ({ data: { cartItems } }) => {
                            console.log(cartItems);
                            return(
                            <CartDropdown cartItems={cartItems} toggleCartHidden={toggleCartHidden}/>
                        )}
                    }
                </Query>
            )
        }
    </Mutation>
);

export default CartDropdownContainer;