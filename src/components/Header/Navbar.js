import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { FirebaseContext } from '../../utils/firebase'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    textDecoration: 'none',
    color: 'white',
    flexGrow: 1,
    marginLeft: theme.spacing(1)
  }
}))

export default function Navbar({ history, signedIn, handleLogout }) {
  const classes = useStyles()
  const firebase = useContext(FirebaseContext)
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
        <Button onClick={handleClick} color='inherit'>
          {signedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  )
}
