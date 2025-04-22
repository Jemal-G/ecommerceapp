import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Container from './Container';

function Profile({ signOut, user }) {
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    async function checkUser() {
      try {
        const current = await getCurrentUser();
        setCurrentUser({ ...current?.signInDetails?.loginId && { username: current.signInDetails.loginId }, ...user });
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    }

    checkUser();
  }, [user]);

  return (
    <Container>
      <h1>Profile</h1>
      <h2>Username: {currentUser.username || 'N/A'}</h2>
      <h3>Email: {currentUser.email || 'N/A'}</h3>
      <h4>Phone: {currentUser.phone || 'N/A'}</h4>
      <button onClick={signOut}>Sign Out</button>
    </Container>
  );
}

export default withAuthenticator(Profile);
