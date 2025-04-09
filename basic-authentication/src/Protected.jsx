import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Container from './Container'

function Protected() {
  return (
    <Container>
      <h1>Protected route</h1>
    </Container>
  )
}

export default withAuthenticator(Protected)
