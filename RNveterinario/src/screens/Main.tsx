import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { InSessionStack } from '../stacks/InSessionStack';
import { OutSessionStack } from '../stacks/OutSessionStack';

const Main = () => {

  // Context
  const { authState } = useContext(AuthContext);

  return (
    <>
      {
        authState.isLoggedIn ?
          <OutSessionStack />
          :
          <InSessionStack />
      }
    </>
  )
}

export { Main }