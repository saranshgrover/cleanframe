import React from 'react'
import Button from './Button'
import Label from './Label'
import TextField from './TextField'
import Container from './Container'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	selected: {
		border: '10px solid black',
		borderImage:
			'url(http://www.nationalflags.shop/WebRoot/vilkasfi01/Shops/2014080403/53F0/F886/BB3A/522C/CB5B/0A28/100A/2578/blue_rectangle.jpg) 200%'
	}
}))

export default function Control({ control, selected }) {
	const classes = useStyles()
	return (
		<>
			{control.type === 'button' ? (
				<Button control={control} selected={selected} />
			) : control.type === 'label' ? (
				<Label control={control} selected={selected} />
			) : control.type === 'textfield' ? (
				<TextField control={control} selected={selected} />
			) : (
				<Container control={control} selected={selected} />
			)}
		</>
	)
}
