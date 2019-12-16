import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import { Rnd } from 'react-rnd'
import Control from './Wireframe/Control'
import { duplicateControl, deleteControl } from '../../logic/edit'

const useStyles = makeStyles(theme => ({
	content: {
		height: '92vh',
		width: '76vw',
		backgroundColor: grey[100],
		overflow: 'scroll',
		'&::-webkit-scrollbar': {
			width: '0.6em'
		},
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
			webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(0,0,0,.1)',
			outline: '1px solid slategrey'
		}
	},
	main: {
		margin: '0 auto',

		backgroundColor: 'white'
	},
	selected: {
		// 	border: '10px solid black',
		// 	borderImage:
		// 		'url(http://www.nationalflags.shop/WebRoot/vilkasfi01/Shops/2014080403/53F0/F886/BB3A/522C/CB5B/0A28/100A/2578/blue_rectangle.jpg) 200%'
	}
}))

export default function EditView({
	wireframe,
	setWireframe,
	selected,
	setSelected,
	scale
}) {
	const classes = useStyles()
	const handleDelete = e => {
		const newControls = deleteControl(wireframe.controls, selected)
		setSelected(-1)
		setWireframe({ ...wireframe, controls: newControls })
	}
	const handleDuplicate = e => {
		const newControls = duplicateControl(wireframe.controls, selected)
		setSelected(-1)
		setWireframe({ ...wireframe, controls: newControls })
	}
	const handleDrag = (data, key) => {
		console.log('drag')
		setWireframe({
			...wireframe,
			controls: wireframe.controls.map(control =>
				control.key === key
					? { ...control, xCoordinate: data.x, yCoordinate: data.y }
					: control
			)
		})
	}
	const handleResize = (ref, position, key) => {
		console.log('resize')
		setWireframe({
			...wireframe,
			controls: wireframe.controls.map(control =>
				control.key === key
					? {
							...control,
							xCoordinate: position.x,
							yCoordinate: position.y,
							height: parseInt(
								ref.style.height.substring(
									0,
									ref.style.height.length - 2
								)
							),
							width: parseInt(
								ref.style.width.substring(
									0,
									ref.style.width.length - 2
								)
							)
					  }
					: control
			)
		})
	}
	const upHandler = e => {
		const { ctrlKey, key } = e
		switch (key) {
			case 'Delete':
				handleDelete()
				break
			case 'd':
				if (ctrlKey) {
					e.preventDefault()
					handleDuplicate()
					break
				}

				break
			default:
				return
		}
	}
	useEffect(() => {
		window.addEventListener('keydown', upHandler)
		return () => {
			window.removeEventListener('keydown', upHandler)
		}
	})
	return (
		<div
			className={classes.content}
			onClick={e => {
				e.stopPropagation()
				setSelected(-1)
			}}
		>
			<div
				className={classes.main}
				onClick={e => {
					e.stopPropagation()
					setSelected(-1)
				}}
				style={{
					transform: `scale(${scale})`,
					height: wireframe.height,
					width: wireframe.width
				}}
			>
				{wireframe.controls.map(control => (
					<Rnd
						className={
							selected === control.key ? classes.selected : ''
						}
						bounds={'parent'}
						key={control.key}
						disableDragging={control.key !== selected}
						enableResizing={{
							top: false,
							right: false,
							bottom: false,
							left: false,
							topRight: control.key === selected,
							bottomRight: control.key === selected,
							bottomLeft: control.key === selected,
							topLeft: control.key === selected
						}}
						onClick={e => {
							e.cancelBubble = true
							if (e.stopPropagation) e.stopPropagation()
							if (selected !== control.key)
								setSelected(control.key)
						}}
						onResizeStop={(e, dir, ref, delta, position) =>
							handleResize(ref, position, control.key)
						}
						onDragStop={(e, data) => handleDrag(data, control.key)}
						default={{
							x: control.xCoordinate,
							y: control.yCoordinate,
							width: control.width,
							height: control.height
						}}
					>
						<Control
							control={control}
							selected={selected === control.key}
						/>
					</Rnd>
				))}
			</div>
		</div>
	)
}
