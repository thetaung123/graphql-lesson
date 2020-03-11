import React from 'react';
import {Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";

const GET_COLLECTION_BY_TITLE = gql`
    query getCollectionsByTitle($title: String!){ # we're just defining the type of query // we want that query to be dynamic ,also. //this is from apollo boost
        getCollectionsByTitle(title: $title) { # now we're using a variable we got back from that query in actual grapql query
            id
            title
            items {
                id 
                name
                price
                imageUrl
            }
        }
    }
`;

const CollectionPageContainer = ({match}) => (
    <Query
        query={GET_COLLECTION_BY_TITLE}
        variables={{title: match.params.collectionId}}
    >{/*variables are dynamic data that we want to pass down to query*/}
        {
            ({loading, data}) => {
                if (loading) return <Spinner/>;

                const {getCollectionsByTitle} = data; //getCollectionsByTitle is only available after the loading ,so, it's important that we destruct it here
                return <CollectionPage collection={getCollectionsByTitle} />
            }
        }
    </Query>
);

export default CollectionPageContainer;