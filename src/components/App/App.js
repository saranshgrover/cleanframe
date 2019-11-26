import React, { useContext, useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import 'firebase/firestore'
import { FirebaseContext } from '../../utils/firebase'
import Navbar from '../Header/Navbar'
import HomeScreen from '../Home/HomeScreen'
import EditScreen from '../Edit/EditScreen'
import databaseTester from '../databaseTester/databaseTester'
import Login from '../Login/Login'
import Register from '../Register/Register'

export default function App() {
  const firebase = useContext(FirebaseContext)
  const [signedIn, setSignedIn] = useState(
    firebase.auth().currentUser ? true : false
  )
  const [user, setUser] = useState(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setUser(user)
        setSignedIn(true)
      } else {
        // No user is signed in.
        setUser(null)
        setSignedIn(false)
      }
    })
  })
  const handleLogout = () => {}
  return (
    <>
      <Router>
        <Route
          render={props => (
            <Navbar
              {...props}
              signedIn={signedIn}
              user={user}
              handleLogout={handleLogout}
            />
          )}
        />
        {signedIn ? (
          <Switch>
            <Route path='/' component={HomeScreen} />
            <Route path='/wireframe/:wireframeId' component={EditScreen} />
            <Route path='/databaseTester' component={databaseTester} />
          </Switch>
        ) : (
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Redirect to='/login' />
          </Switch>
        )}
      </Router>
    </>
  )
}
