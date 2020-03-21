import {gql} from 'apollo-boost';
import {addItemToCart, getCartItemCount, getCartTotal, removeItemFromCart} from "./cart.utils";

export const typeDefs = gql` # we're defining the mutation type we want to use
    extend type Item { # item query is already exists ,so, this won't create a new one like below
        quantitiy: Int  #integer value
    }

    extend type DateTime { # for createdAt property of User type // firebase return DateTime props with nanoseconds and second properties insidie createdAt // see the console.log from setCurrentUser for details
        nanoseconds: Int!
        seconds: Int!
    }

    extend type User {
        id: ID!
        displayName: String!
        email: String!
        createdAt: DateTime!
    }

    extend type Mutation { # this means that we want to extend the These mutations in the backend. If there are no such mutation in backend(and there aren't in this case) we want to create one
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]! #array exits but inside it, there can or can't be items
        RmoveItemFromCart(item: Item!): [Item]!
        ClearItemFromCart(item: Item!): [Item]!
        CartTotal: Int!
        SetCurrentUser(user: User!): User!
    }
`;

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

const GET_ITEMS_COUNT = gql`
    {
        itemCount @client
    }
`;

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

const GET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;

export const resolvers = { //this function is called resolver because it fetch the data and then change it and then return that modified data
    Mutation: { //this is the actual mutation functions // above function is just defining the mutation

        toggleCartHidden: (_root, _args, _context, _info) => { //every mutations functions get access to 4 arguments // _root is the owner of the mutation variable// _args stores argument of gql queries e.g getCollectionsByTittle would be stored title in _args variable //)
            const { cache } = _context;

            const { cartHidden } = cache.readQuery({ //we're just query the value we store in our client
                query: GET_CART_HIDDEN, // you can also pass in variables here under variable property
                //variables: { variables/arguments for the query }
            });

            cache.writeQuery({ // changing the value stored in cache
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden}
            });

            return !cartHidden;
        },

        addItemToCart: (_root, { item }, { cache }, _info) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            //console.log(cartItems);

            const newCartItems = addItemToCart(cartItems, item); //item will be the one we got from argument we inserted when we use this function

            cache.writeQuery({
                query: GET_ITEMS_COUNT,
                data: {itemCount: getCartItemCount(newCartItems)}
            });

            cache.writeQuery({
                query: GET_CART_TOTAL,
                data: {cartTotal: getCartTotal(newCartItems)}
            });

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            return newCartItems;
        },
        removeItemFromCart: (_root, { item }, { cache }, _info) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = removeItemFromCart(cartItems, item);

            cache.writeQuery({
                query: GET_ITEMS_COUNT,
                data: {itemCount: getCartItemCount(newCartItems)}
            });

            cache.writeQuery({
                query: GET_CART_TOTAL,
                data: {cartTotal: getCartTotal(newCartItems)}
            });

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            return newCartItems;
        },
        clearItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });
            const newCartItems = cartItems.filter(
                cartItem => cartItem.id !== item.id
            );

            cache.writeQuery({
                query: GET_ITEMS_COUNT,
                data: {itemCount: getCartItemCount(newCartItems)}
            });

            cache.writeQuery({
                query: GET_CART_TOTAL,
                data: {cartTotal: getCartTotal(newCartItems)}
            });

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            return newCartItems;
        },

        setCurrentUser: (_root, {user}, {cache}) => { //we're passing a big userAuth object from firebase but the way we set the User it'll only store four properties, id, displayName, createdAt, email
            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: { currentUser: user}
            });

            // console.log(cache.readQuery({
            //     query: GET_CURRENT_USER
            // }))
            return user;
        }
    }
};