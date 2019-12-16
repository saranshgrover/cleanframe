import React, { useState } from 'react'
import {
	Paper,
	Button,
	IconButton,
	Grid,
	TextField,
	InputBase,
	Slider,
	Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles(theme => ({
	paper: {
		width: '100vh-240px',
		height: '8vh',
		zoom: 1
	},
	button: {
		height: '8vh',
		right: 0
	},
	input: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400
	}
}))

export default function EditFooter({
	wireframe,
	setWireframe,
	scale,
	setScale,
	handleSave
}) {
	const classes = useStyles()
	const handleChange = e => {
		let { name, value } = e.target
		setWireframe({
			...wireframe,
			[name]: value
		})
	}
	return (
		<Paper className={classes.paper}>
			<Grid container justify='flex-start' alignItems='center'>
				<Grid item>
					<Paper
						elevation={2}
						className={classes.input}
						component='form'
					>
						<InputBase
							fullWidth
							name={'name'}
							value={wireframe.name}
							onChange={handleChange}
						/>
					</Paper>
				</Grid>
				<Grid item>
					<IconButton onClick={() => setScale(scale * 2)}>
						<ZoomInIcon
							disabled={scale === 8}
							color='primary'
							fontSize={'default'}
						/>
					</IconButton>
				</Grid>
				<Grid item>
					<Typography variant='subtitle1'>{`${scale}x`}</Typography>
				</Grid>
				<Grid item>
					<IconButton onClick={() => setScale(scale / 2)}>
						<ZoomOutIcon
							disabled={scale === 0.125}
							color='primary'
							fontSize={'default'}
						/>
					</IconButton>
				</Grid>
				<Button
					className={classes.button}
					size='large'
					variant='contained'
					color='primary'
					startIcon={<SaveIcon />}
					onClick={handleSave}
				>
					Save
				</Button>
			</Grid>
		</Paper>
	)
}
