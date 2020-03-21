import React from 'react';
import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';
import DirectoryData from './directory-data'

const Directory = () => (
  <div className='directory-menu'>
    {DirectoryData.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

export default Directory;
