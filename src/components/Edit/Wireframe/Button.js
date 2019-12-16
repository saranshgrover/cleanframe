import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
	control: props => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		border: '1px solid black',
		overflow: 'hidden',
		cursor: 'all-scroll'
	}),
	border: props => ({
		width: '100%',
		height: '100%',
		border: '8px solid transparent',
		borderImage: props.borderImage
	})
})

export default function Container({ control, selected }) {
	const classes = useStyles({
		borderImage: selected
			? 'url(http://www.nationalflags.shop/WebRoot/vilkasfi01/Shops/2014080403/53F0/F886/BB3A/522C/CB5B/0A28/100A/2578/blue_rectangle.jpg) 200%'
			: ''
	})
	return (
		<div className={classes.border}>
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
				{control.text.toUpperCase()}
			</div>
		</div>
	)
}
