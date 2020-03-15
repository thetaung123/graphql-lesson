import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionItem from "./collection-item.component";

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) { #defining which mutation type we're using
        addItemToCart(item : $item) @client #calling the mutation function
    }
`;

const CollectionItemContainer = (props) => ( //this props contains item props which was passed down from collection page
    <Mutation mutation={ADD_ITEM_TO_CART}>
        {
            (addItemToCart) => <CollectionItem
                {...props}
                addItem={item => addItemToCart({variables: { item }})}/> //another way to pass in variables to mutation function
        }
    </Mutation>
);

export default CollectionItemContainer;