import React, { useState, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'

import { FirebaseContext } from '../../utils/firebase'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    margin: 'auto',
    width: '50vw',
    height: '70vh'
  },
  input: {
    width: '30vw',
    padding: theme.spacing(1)
  },
  title: {
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  }
}))
export default function Register({ history }) {
  const classes = useStyles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const firebase = useContext(FirebaseContext)
  // console.log(firebase.auth().currentUser)
  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(resp =>
        firebase
          .firestore()
          .collection('users')
          .doc(resp.user.uid)
          .set({
            firstName: firstName,
            lastName: lastName,
            initials: `${firstName[0]}${lastName[0]}`
          })
      )
      .then(() => {
        setLoading(false)
        history.push('/')
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }
  return (
    <>
      <Paper square className={classes.paper}>
        <form>
          <Grid
            container
            direction='column'
            alignItems='center'
            justify='center'
          >
            <Grid item>
              <Typography
                className={classes.title}
                color='primary'
                variant='h5'
              >
                Register
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                className={classes.input}
                id='outlined-basic'
                label='First Name'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                className={classes.input}
                id='outlined-basic'
                label='Last Name'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                className={classes.input}
                id='outlined-basic'
                label='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                className={classes.input}
                id='outlined-password-input'
                type='password'
                label='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            {error && (
              <Grid item>
                <Typography variant='body1' color='error'>
                  {error}
                </Typography>
              </Grid>
            )}
            {!loading && (
              <Grid item>
                <Button
                  className={classes.button}
                  disabled={loading}
                  varaint='outlined'
                  color='primary'
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </Grid>
            )}
            {loading && (
              <Grid item>
                <CircularProgress size={24} />
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </>
  )
}
