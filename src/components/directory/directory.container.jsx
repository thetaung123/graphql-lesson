import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from "react-apollo";
import {flowRight as compose } from 'lodash';
import Directory from "./directory.component";

const GET_DIRECTORY_SECTIONS = gql`
    {
        directorySections @client
    }
`;

const DirectoryContainer = ({data}) => {
    const { directorySections } = data
    console.log(data);
    return <Directory sections={directorySections} />
};

export default compose(
    graphql(GET_DIRECTORY_SECTIONS)
)(DirectoryContainer);