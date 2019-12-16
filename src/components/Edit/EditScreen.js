import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../../utils/firebase'
import { LinearProgress } from '@material-ui/core'
import { isSame } from '../../logic/edit'
import EditControl from './EditControl'
import EditView from './EditView'
import EditFooter from './EditFooter'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	}
}))

export default function EditScreen({ match, history }) {
	const firebase = useContext(FirebaseContext)
	const [unsavedWireframe, saveWireframe] = useState({})
	const [wireframe, setWireframe] = useState({})
	const [same, setIsSame] = useState(isSame(unsavedWireframe, wireframe))
	useEffect(() => {
		if (isSame(unsavedWireframe, wireframe) !== same) {
			setIsSame(!same)
		}
	}, [wireframe, unsavedWireframe])
	const [selected, setSelected] = useState(-1)
	const [loading, setLoading] = useState(true)
	const [scale, setScale] = useState(1)
	const handleSave = () => {
		const firestore = firebase.firestore()
		const { wireframeId } = match.params
		firestore
			.collection('wireframes')
			.doc(wireframeId)
			.update(wireframe)
			.then(saveWireframe(wireframe))
	}
	useEffect(() => {
		const { wireframeId } = match.params
		const user = firebase.auth().currentUser
		const firestore = firebase.firestore()
		firestore
			.collection('users')
			.doc(user.uid)
			.get()
			.then(userInfo => {
				if (userInfo.data().wireframes.includes(wireframeId)) {
					firestore
						.collection('wireframes')
						.doc(wireframeId)
						.get()
						.then(resp => {
							setWireframe(resp.data())
							saveWireframe(resp.data())
							setLoading(false)
						})
				} else {
					history.push('/')
				}
			})
	}, [firebase, history, match.params])
	const classes = useStyles()
	return (
		<>
			{loading ? (
				<LinearProgress />
			) : (
				<>
					<div className={classes.root}>
						<EditControl
							saved={same}
							handleSave={handleSave}
							wireframe={wireframe}
							setWireframe={setWireframe}
							selected={selected}
							history={history}
						/>
						<Grid container direction='column'>
							<Grid item>
								<EditFooter
									handleSave={handleSave}
									scale={scale}
									setScale={setScale}
									wireframe={wireframe}
									setWireframe={setWireframe}
								/>
							</Grid>
							<Grid item>
								<EditView
									scale={scale}
									wireframe={wireframe}
									setWireframe={setWireframe}
									selected={selected}
									setSelected={setSelected}
								/>
							</Grid>
						</Grid>
					</div>
				</>
			)}
		</>
	)
}
