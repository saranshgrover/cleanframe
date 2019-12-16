import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../utils/firebase'
import LinearProgress from '@material-ui/core/LinearProgress'
import HomeNew from './HomeNew'
import {
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	ListItemSecondaryAction,
	Paper,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: '10vh',
		minWidth: '50vw'
	},
	list: {
		height: '100%'
	}
}))

export default function HomeList({ history }) {
	const [loading, setLoading] = useState(true)
	const [wireframes, setWireframes] = useState([])
	const [dialog, setDilaog] = useState(null)
	const firebase = useContext(FirebaseContext)
	const handleDelete = id => {
		firebase
			.firestore()
			.collection('wireframes')
			.doc(id)
			.delete()
			.then(
				setWireframes(
					wireframes.filter(wireframe => wireframe.docId !== id)
				)
			)
		setDilaog(null)
	}
	useEffect(() => {
		let localWireframes = []
		const user = firebase.auth().currentUser
		const firestore = firebase.firestore()
		firestore
			.collection('wireframes')
			.orderBy('lastEdited', 'desc')
			.get()
			.then(resp => {
				resp.forEach(doc => {
					doc.data().ownerId === user.uid &&
						localWireframes.push({ ...doc.data(), docId: doc.id })
				})
				setWireframes(localWireframes)
				setLoading(false)
			})
	}, [firebase])
	const classes = useStyles()

	return (
		<>
			<Dialog open={dialog !== null}>
				<DialogTitle id='simple-dialog-title'>
					Confirm Delete
				</DialogTitle>
				<DialogContent>
					The diagram isn't saved, would you like to save before going
					back?
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleDelete(dialog)}>Yes</Button>
					<Button onClick={() => setDilaog(null)}>No</Button>
				</DialogActions>
			</Dialog>
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
								<ListItemSecondaryAction>
									<IconButton
										onClick={() =>
											setDilaog(wireframe.docId)
										}
										aria-label='delete'
									>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						))}
						<HomeNew history={history} />
					</List>
				)}
			</Paper>
		</>
	)
}
