import React from 'react';
import {Query} from "react-apollo";
import { gql } from 'apollo-boost';

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

const GET_COLLECTIONS = gql`
    {
        collections {
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

const CollectionsOverviewContainer = () => (
    <Query query={GET_COLLECTIONS}>
        {// this Query higher order component returns us a function
            ({loading, error, data}) => { // this function returns loading props , so, our spinner component doesn't need to be HOC
                // console.log(loading);
                // console.log(error);
                if (loading) return <Spinner/>;

                //if loading is false
                return <CollectionsOverview collections={data.collections}/>
            }
        }
    </Query>
);

export default CollectionsOverviewContainer;