import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Container from './Container';

function Profile({ signOut: injectedSignOut }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getCurrentUser()
      .then(data => setUser({ username: data.username }))
      .catch(console.error);
  }, []);

  return (
    <Container>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <button onClick={() => {
        signOut().then(() => window.location.reload());
      }}>
        Sign out
      </button>
    </Container>
  );
}

export default withAuthenticator(Profile);
