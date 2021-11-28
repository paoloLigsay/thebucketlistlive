import React, { useState } from 'react'
import axios from 'axios'
import scene1 from '../assets/s1.svg'

const Login = ({setLoggedIn, setLoggedInUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async() => {
    try {
      const res = await axios.post('http://localhost:3001/login', {
        username: username,
        password: password
      })

      const loginTrue = () => {
        setLoggedIn(true)
        setLoggedInUser(res.data)
        localStorage.setItem('thebucketlistloggedin', true)
        localStorage.setItem('thebucketlistloggedinuserid', res.data._id)
      }

      res.data !== '' ? loginTrue() : alert('Invalid Credentials')

    } catch (e) {
      console.log(e)
      alert('sds')
    }
  }

  return (
    <div className="form">
      <embed type="image/svg+xml" src={scene1} className="form__mainvisual"/>
      <div className="form__container">
        <h1> The BucketList </h1>
        <h3> Start living it. </h3>
        <input placeholder="Username" type="text" onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="text" onChange={e => setPassword(e.target.value)} />
        <button onClick={login} > Login </button>

        {/* <p> Do not have an account? </p> <a href=""> Sign Up </a> */}
      </div>
    </div>
  );
}

export default Login;
