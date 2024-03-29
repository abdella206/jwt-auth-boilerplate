import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import NavBar from './components/Navbar';






function App() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [apiData, setApiData] = useState(null)




  //====================================================================================================================================
  useEffect(() => {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // token is invalid or missing
      localStorage.removeItem('mernToken');
      setToken('')
      setUser(null)

    } else {
      // we found a token in localStorage, verify it
      axios.post('/auth/me/from/token', { token })
        .then(res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            setToken('')
            setUser(null)
            setErrorMessage(res.data.message)

          } else {
            localStorage.setItem('mernToken', res.data.token);
            setToken(res.data.token)
            setUser(res.data.user)
            setErrorMessage('')

          }
        })
    }
  }, [])

  //====================================================================================================================================


  const liftToken = ({ token, user }) => {
    console.log('setting user: ', user);
    console.log('setting token: ', token)
    setToken(token)
    setUser(user)

  }


  //====================================================================================================================================



  const logout = () => {
    // remove token from localStorage
    localStorage.removeItem('mernToken');
    // remove user and token from state
    setToken('')
    setUser(null)

  }

  //====================================================================================================================================


  var contents
  if (user) {
    contents = (
      <div>
        <Router>
          <NavBar logout={logout}/>
         
          <h1>Hello, {user.name}</h1>
         
          {/* <Route exact path='/details' render={() => <Details favPlayers={favPlayers} currentPlayer={currentPlayer} handleYearChange={setYears} />} /> */}
        </Router>

      </div>
    );
  } else {
    contents = (
      <div>
        <Router>
        <Route exact path='/' render={() =><Login liftToken={liftToken} /> }/>
        <Route exact path='/signup' render={() => <Signup liftToken={liftToken} />}/>
        </Router>
      </div>
    )
  }
  return (
    <>
      <div className="App">
        {contents}
      </div>
    </>
  );
}
export default App;
