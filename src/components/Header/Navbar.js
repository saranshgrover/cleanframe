import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { FirebaseContext } from '../../utils/firebase'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	title: {
		textDecoration: 'none',
		color: 'white',
		flexGrow: 1,
		marginLeft: theme.spacing(1)
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main
	}
}))

export default function Navbar({ history, signedIn, handleLogout }) {
	const classes = useStyles()
	const firebase = useContext(FirebaseContext)
	const [userInfo, setUserInfo] = useState(null)
	useEffect(() => {
		const user = firebase.auth().currentUser
		signedIn &&
			firebase
				.firestore()
				.collection('users')
				.doc(user.uid)
				.get()
				.then(resp => setUserInfo(resp.data()))
	}, [signedIn, firebase])
	const handleClick = () => {
		!signedIn ? history.push('/login') : handleLogout()
	}
	return (
		<AppBar position='sticky' color='primary' className={classes.appBar}>
			<Toolbar spacing={2} className={classes.title}>
				<Typography
					variant='h6'
					className={classes.title}
					component={Link}
					to='/'
				>
					Wireframer
				</Typography>
				{signedIn && userInfo && (
					<Button onClick={handleClick}>
						<Avatar className={classes.avatar} variant='square'>
							{userInfo.firstName[0]}
						</Avatar>
					</Button>
				)}
				{!signedIn && (
					<Button onClick={handleClick} color='inherit'>
						{' '}
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}
