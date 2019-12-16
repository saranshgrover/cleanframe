import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	control: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		border: '1px solid black',
		overflow: 'hidden'
	},
	text: {
		textAlign: 'center'
	}
}))

export default function Container({ control, selected }) {
	const classes = useStyles()
	return (
		<div
			style={{
				borderColor: control.border.color,
				borderRadius: control.border.radius,
				borderWidth: control.border.thickness,
				backgroundColor: control.color,
				fontSize: control.fontSize,
				color: control.fontColor
			}}
			className={classes.control}
		>
			{control.text}
		</div>
	)
}
