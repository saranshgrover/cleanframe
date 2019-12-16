import React, { useContext, useState } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { buildUser, buildWireframe, buildControl } from '../../logic/builders'
import { FirebaseContext } from '../../utils/firebase'
import { Snackbar } from '@material-ui/core'
import dataJson from '../../utils/dummyData.json'

export default function DatabaseTester() {
	const firebase = useContext(FirebaseContext)
	const [completed, setCompleted] = useState(false)
	const handleClear = () => {
		const fireStore = firebase.firestore()
		fireStore
			.collection('users')
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					console.warn('deleting ' + doc.id)
					fireStore
						.collection('users')
						.doc(doc.id)
						.delete()
				})
			})
		fireStore
			.collection('wireframes')
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					console.warn('deleting ' + doc.id)
					fireStore
						.collection('wireframes')
						.doc(doc.id)
						.delete()
				})
				setCompleted(true)
			})
	}
	const handleReset = () => {
		const users = dataJson.users
		const wireframes = dataJson.wireframes
		const firestore = firebase.firestore()
		for (const user of users) {
			firestore
				.collection('users')
				.doc(user.uid)
				.set(
					buildUser(
						user.first,
						user.last,
						user.email,
						user.wireframes,
						false,
						user.uid
					)
				)
				.then(console.log(`RESET ${user.email}`))
		}
		for (const wireframe of wireframes) {
			console.log(wireframe.id)
			firestore
				.collection('wireframes')
				.doc(wireframe.id)
				.set({
					...buildWireframe(
						wireframe.key,
						wireframe.ownerUid,
						wireframe.name
					),
					controls: wireframe.controls.map(control =>
						buildControl(
							control.key,
							control.type,
							control.xCoordinate
						)
					)
				})
				.then(() => console.log(`ADDED WIREFRAME ID ${wireframe.key}`))
		}
	}
	return (
		<>
			<Paper square style={{ margin: 'auto', padding: '100px' }}>
				<Button
					onClick={handleReset}
					variant='outlined'
					color='primary'
				>
					Reset Database
				</Button>
				<Button
					onClick={handleClear}
					variant='outlined'
					color='primary'
				>
					Clear Database
				</Button>
			</Paper>
			{completed && (
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
					autoHideDuration={3000}
					open={completed}
					onClose={() => setCompleted(false)}
					message={`Reset/Clear is completed.`}
				/>
			)}
		</>
	)
}
