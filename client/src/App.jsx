












// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import Login from './Login'
// import Signup from './Signup'
// import "./App.css"






// const App = () => {

//    const [token, setToken] = useState('') 
//    const [user, setUser] = useState(null) 
//    const [errorMessage, setErrorMessage] = useState('') 
//    const [apiDate, setApiDate] = useState(null) 
  


//     useEffect(() => {
//       checkForLocalToken()
//     }, []);


//       const checkForLocalToken = () => {
//    // var token = localStorage.getItem('mernToken')
//     if (!token || token === 'undefined') {
//       //  token is invalid or missing
//       localStorage.removeItem('mernToken');
//       setToken('')
//       setUser(null)
   
//     } else {
//       // we found a token in localStorage, verify it
//       axios.post('/auth/me/from/token', { token })
//         .then(res => {
//           if (res.data.type === 'error') {
//             localStorage.removeItem('mernToken')
//             setToken('')
//             setUser(null)
//             setErrorMessage( res.data.message)
         
//           } else {
//             localStorage.setItem('mernToken', res.data.token);

//             setToken(res.data.token)
//             setUser(res.data.user)
//             setErrorMessage('')
          
//           }
//         })
//     }
//   }

//   const liftToken = (data) => {
//     this.setState({
//       token: data.token,
//       user: data.user
//     })
//   }

//   const logout = () => {
//     // Remove token from localStore
//     localStorage.removeItem('mernToken')
//     // Remove user and token from state
//     setToken('')
//     setUser(null)
//   }


//       if(user) {
//         return(
//           <>
//           <p>PLease signup or login</p>
//           <Login liftToken={liftToken} />
//           <Signup liftToken={liftToken} />
//         </>
//         )
//       }
//     return (

//         <div className="App">
//             hello
//             <Login liftToken={liftToken} />
//             <Signup liftToken={liftToken} />
          
//         </div>
//     )

// }

// export default App







  
import React from 'react';
import axios from 'axios';
import Login from './Login'
import Signup from './Signup'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      apiDate: null
    }
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.liftToken = this.liftToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  checkForLocalToken() {
    var token = localStorage.getItem('mernToken')
    if (!token || token === 'undefined') {
      //  token is invalid or missing
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null
      })
    } else {
      // we found a token in localStorage, verify it
      axios.post('/auth/me/from/token', { token })
        .then(res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            this.setState({
              token: '',
              user: null,
              errorMessage: res.data.message
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            this.setState({
              token: res.data.token,
              user: res.data.user,
              errorMessage: ''
            })
          }
        })
    }
  }

  liftToken(data) {
    this.setState({
      token: data.token,
      user: data.user
    })
  }

  logout() {
    // Remove token from localStore
    localStorage.removeItem('mernToken')
    // Remove user and token from state
    this.setState({
      token: '',
      user: null
    })
  }

  componentDidMount() {
    this.checkForLocalToken()
  }

  render() {
    var user = this.state.user
    var contents = ''
    if (user) {
      contents = (
        <>
          <p>Hello, {user.name}</p>
          <p onClick={this.logout}>Logout</p>
        </>
      )
    } else {
      contents = (
        <>
          <p>PLease signup or login</p>
          <Login liftToken={this.liftToken} />
          <Signup liftToken={this.liftToken} />
        </>
      );
    }
    return (
      contents

    );
  }
}










export default App;
