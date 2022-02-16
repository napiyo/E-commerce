import React from 'react';
import './author.css';

import userlogo from '../assests/user.jpeg';
export default function Author() {
  return (
    <div className='authorSingle'>
      <div><img src={userlogo} alt="loading" className='authorlogo'/></div>
      <div>Narendra Dewasi</div>
    </div>
  )
}