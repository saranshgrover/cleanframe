import React, { useState } from 'react'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { buildControl } from '../../logic/builders'
import containerImage from '../../images/Container.png'
import labelImage from '../../images/Container.png'
import buttonImage from '../../images/MF_Button.png'
import textareaImage from '../../images/MF_TextArea.png'

export default function ControlMain({ wireframe, setWireframe }) {
	const [localWireframe, setLocalWireframe] = useState(wireframe)
	const handleChange = e => {
		let { name, value } = e.target
		value = Math.max(0, Math.min(5000, value))
		setLocalWireframe({
			...localWireframe,
			[name]: value
		})
	}
	const addControl = type => {
		const newKey =
			localWireframe.controls.length > 0
				? localWireframe.controls[localWireframe.controls.length - 1]
						.key + 1
				: 0
		const control = buildControl(newKey, type)
		const controls = wireframe.controls
		setWireframe({ ...wireframe, controls: [...controls, control] })
		setLocalWireframe({ ...wireframe, controls: [...controls, control] })
	}
	return (
		<>
			<Grid item>
				<TextField
					name={'height'}
					value={localWireframe.height}
					label={'Height'}
					type={'number'}
					onChange={handleChange}
				/>
			</Grid>
			<Grid item>
				<TextField
					name={'width'}
					value={localWireframe.width}
					label={'Width'}
					onChange={handleChange}
				/>
			</Grid>
			<Grid item>
				<Button
					size='small'
					variant='outlined'
					color='primary'
					disabled={
						localWireframe.width === wireframe.width &&
						localWireframe.height === wireframe.height
					}
					onClick={e => setWireframe(localWireframe)}
				>
					Update Dimensions
				</Button>
			</Grid>
			{[
				{ name: 'container', image: containerImage },
				{ name: 'label', image: labelImage },
				{ name: 'button', image: buttonImage },
				{ name: 'textfield', image: textareaImage }
			].map(control => (
				<Grid item key={control.name}>
					<Button
						style={{ width: '20vw' }}
						variant='text'
						color='primary'
						onClick={() => addControl(control.name)}
					>
						<img
							style={{ width: '100px' }}
							src={control.image}
							alt={control.name}
						/>
						<Typography style={{ float: 'right' }}>
							{control.name}
						</Typography>
					</Button>
				</Grid>
			))}
		</>
	)
}
