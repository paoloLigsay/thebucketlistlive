import React, { useState } from 'react'
import Login from './components/Login'
import BucketList from './components/BucketList'

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('thebucketlistloggedin') === 'true' || false)
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <div className="App">
      {
        loggedIn ? <BucketList setLoggedIn={setLoggedIn} loggedInUser={loggedInUser}/> : <Login setLoggedInUser={setLoggedInUser} setLoggedIn={setLoggedIn}/>
      }
    </div>
  );
}

export default App;
