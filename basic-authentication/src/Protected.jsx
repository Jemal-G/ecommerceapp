import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Container from './Container'

function Protected() {
  console.log('Protected component rendered', logs)
  // This component is protected and will only be accessible to authenticated users 
  return (
    <Container>
      <h1>Protected route</h1>
    </Container>
  )
}

export default withAuthenticator(Protected)
