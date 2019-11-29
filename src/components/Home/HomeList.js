import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../utils/firebase'
import LinearProgress from '@material-ui/core/LinearProgress'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '10vh',
    minWidth: '50vw'
  },
  list: {
    height: '100%'
  }
}))

export default function HomeList() {
  const [loading, setLoading] = useState(true)
  const [wireframes, setWireframes] = useState([])
  const firebase = useContext(FirebaseContext)
  useEffect(() => {
    let localWireframes = []
    const user = firebase.auth().currentUser
    const firestore = firebase.firestore()
    firestore
      .collection('wireframes')
      .orderBy('lastEdited', 'desc')
      .get()
      .then(resp => {
        resp.forEach(
          doc =>
            doc.data().ownerId === user.uid && localWireframes.push(doc.data())
        )
        setWireframes(localWireframes)
        setLoading(false)
      })
  }, [firebase])
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paper}>
        {loading ? (
          <LinearProgress />
        ) : (
          <List
            className={classes.list}
            style={{ overflow: 'auto' }}
            subheader={
              <ListSubheader disableSticky={true}>
                Your Wireframes
              </ListSubheader>
            }
          >
            {wireframes.map(wireframe => (
              <ListItem
                alignItems='center'
                key={wireframe.key}
                button
                component={Link}
                to={`/wireframe/${wireframe.key}`}
              >
                <ListItemText
                  primary={wireframe.name}
                  secondary={`Last Edited: ${wireframe.lastEdited
                    .toDate()
                    .toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </>
  )
}
