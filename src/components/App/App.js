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
import DatabaseTester from '../databaseTester/databaseTester'
import Login from '../Login/Login'
import Register from '../Register/Register'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import blue from '@material-ui/core/colors/blue'
import blueGrey from '@material-ui/core/colors/blueGrey'
import { LinearProgress } from '@material-ui/core'

// typography
const typography = {
	fontFamily: [
		'Playfair Display',
		'Open Sans',
		'"Helvetica Neue"',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"'
	].join(',')
}

const lightTheme = {
	palette: {
		primary: blue,
		secondary: blueGrey,
		type: 'light'
	},
	typography: typography
}

export default function App() {
	const firebase = useContext(FirebaseContext)
	const [user, setUser] = useState(undefined)
	useEffect(() => {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log('%cUSER LOGGED IN', 'font-size: large')
				setUser(user)
			} else {
				console.log('%cUSER LOGGED OUT', 'font-size: large')

				console.debug('No User Set')
				setUser(null)
			}
		})
	})
	const handleLogout = () => {
		firebase.auth().signOut()
	}
	const muiTheme = createMuiTheme(lightTheme)
	return (
		<>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				{user === undefined && <LinearProgress />}
				{user !== undefined && (
					<Router>
						<Route
							exact
							path='/'
							render={props => (
								<Navbar
									{...props}
									user={user}
									signedIn={user ? true : false}
									handleLogout={handleLogout}
								/>
							)}
						/>
						{user ? (
							<Switch>
								<Route exact path='/' component={HomeScreen} />
								<Route
									exact
									path='/wireframe/:wireframeId'
									component={EditScreen}
								/>
								<Route
									exact
									path='/databaseTester'
									component={DatabaseTester}
								/>
								<Redirect to='/' />
							</Switch>
						) : (
							<Switch>
								<Route path='/login' component={Login} />
								<Route path='/register' component={Register} />
								<Redirect to='login' />
							</Switch>
						)}
					</Router>
				)}
			</ThemeProvider>
		</>
	)
}
