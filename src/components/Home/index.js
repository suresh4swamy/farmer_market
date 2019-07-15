import React from 'react';
import Messages from '../Messages';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Messages />
  </div>
);

export default HomePage;