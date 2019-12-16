import React, { useState, useContext } from 'react'
import {
	Button,
	Dialog,
	DialogTitle,
	TextField,
	DialogContent,
	DialogActions,
	CircularProgress,
	Typography
} from '@material-ui/core'
import { FirebaseContext } from '../../utils/firebase'
import { buildWireframe } from '../../logic/builders'

export default function HomeNew({ history }) {
	const firebase = useContext(FirebaseContext)
	const [clicked, setClicked] = useState(false)
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const handleSubmit = () => {
		setLoading(true)
		const user = firebase.auth().currentUser
		const firestore = firebase.firestore()
		const doc = firestore.collection('wireframes').doc()
		doc.set(buildWireframe(doc.id, user.uid, name)).then(() => {
			firestore
				.collection('users')
				.doc(user.uid)
				.update({
					wireframes: firebase.firestore.FieldValue.arrayUnion(doc.id)
				})
				.then(() => {
					history.push(`/wireframe/${doc.id}`)
				})
		})
	}
	return (
		<div style={{ textAlign: 'center' }}>
			<Dialog fullWidth onClose={() => setClicked(false)} open={clicked}>
				<DialogTitle id='simple-dialog-title'>
					New Wireframe
				</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						autoFocus
						margin='dense'
						id='outlined-basic'
						label='Name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleSubmit}
						color='primary'
						variant='outlined'
					>
						{loading ? (
							<CircularProgress size={30} />
						) : (
							<Typography>Submit</Typography>
						)}
					</Button>
				</DialogActions>
			</Dialog>
			<Button
				color='primary'
				variant='outlined'
				onClick={() => setClicked(true)}
			>
				New Wireframe
			</Button>
		</div>
	)
}
