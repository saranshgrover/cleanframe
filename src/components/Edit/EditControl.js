import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import {
	Grid,
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ControlMain from './ControlMain'
import ControlOptions from './ControlOptions'

const drawerWidth = '24vw'

const useStyles = makeStyles(theme => ({
	root: {},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		textAlign: 'center'
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3)
	},
	box: {
		minHeight: '7vh'
	}
}))

export default function EditControl({
	history,
	saved,
	wireframe,
	setWireframe,
	selected,
	handleSave
}) {
	const classes = useStyles()
	const [dialog, setDialog] = useState(false)
	const handleClose = isSaved => {
		if (isSaved) history.push('/')
		else setDialog(true)
	}

	return (
		<div className={classes.root}>
			{dialog && (
				<Dialog open={dialog}>
					<DialogTitle id='simple-dialog-title'>
						Confirm Save
					</DialogTitle>
					<DialogContent>
						The diagram isn't saved, would you like to save before
						going back?
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => {
								handleSave()
								history.push('/')
							}}
						>
							Yes
						</Button>
						<Button onClick={() => history.push('/')}>No</Button>
					</DialogActions>
				</Dialog>
			)}
			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper
				}}
				anchor='left'
			>
				<Box className={classes.box}>
					<Grid container direction='row' justify='space-between'>
						<Grid item>
							<Button
								onClick={() => handleClose(saved)}
								startIcon={<ArrowBackIcon />}
							>
								Close
							</Button>
						</Grid>
					</Grid>
				</Box>
				<Divider />
				<Divider />

				<Grid
					container
					direction='column'
					justify='center'
					alignItems='center'
					spacing={1}
					xs={11}
				>
					{selected === -1 ? (
						<ControlMain
							wireframe={wireframe}
							setWireframe={setWireframe}
						/>
					) : (
						<ControlOptions
							wireframe={wireframe}
							setWireframe={setWireframe}
							selected={selected}
						/>
					)}
				</Grid>
			</Drawer>
		</div>
	)
}
