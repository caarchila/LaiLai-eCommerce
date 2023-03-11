import React from 'react';

function useSession(user){
  let loggedIn = true;
  if(Object.keys(user).length === 0){
    loggedIn = false;
  }
  return loggedIn;
}
export default useSession;
