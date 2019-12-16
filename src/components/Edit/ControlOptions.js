import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import { TwitterPicker } from 'react-color'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	main: {}
}))

export default function ControlOptions({ wireframe, setWireframe, selected }) {
	const [colorPickers, setColorPickers] = useState([
		false,
		false,
		false,
		false
	])
	const control = wireframe.controls.find(control => control.key === selected)
	const handleChange = e => {
		let { name, value } = e.target
		if (!isNaN(parseInt(value))) {
			value = parseInt(value)
		}
		setWireframe({
			...wireframe,
			controls: wireframe.controls.map(control =>
				control.key !== selected
					? control
					: { ...control, [name]: value }
			)
		})
		setColorPickers([false, false, false, false])
	}
	const handleBorderChange = e => {
		let { name, value } = e.target
		if (!isNaN(parseInt(value))) {
			value = parseInt(value)
		}
		setWireframe({
			...wireframe,
			controls: wireframe.controls.map(control =>
				control.key !== selected
					? control
					: {
							...control,
							border: {
								...control.border,
								[name]: value
							}
					  }
			)
		})
		setColorPickers([false, false, false, false])
	}
	const addColorPicker = index => {
		document.activeElement.blur()
		setColorPickers([
			...colorPickers.slice(0, index),
			!colorPickers[index],
			...colorPickers.slice(index + 1)
		])
	}
	return (
		<>
			<TextField
				value={control.color}
				label='Background Color'
				type='text'
				name='color'
				onFocus={() => addColorPicker(0)}
			/>
			{colorPickers[0] && (
				<TwitterPicker
					onChange={e =>
						handleChange({
							target: { name: 'color', value: e.hex }
						})
					}
					color={control.color}
					width='15vw'
					type='color'
				/>
			)}
			<TextField
				value={control.border.radius}
				type='number'
				label='Border Radius'
				name='radius'
				onChange={handleBorderChange}
			/>
			<TextField
				value={control.border.thickness}
				type='number'
				label='Border Width'
				name='thickness'
				onChange={handleBorderChange}
			/>
			<TextField
				value={control.border.color}
				label='Border Color'
				type='text'
				name='color'
				onFocus={() => addColorPicker(1)}
			/>
			{colorPickers[1] && (
				<TwitterPicker
					onChange={e =>
						handleBorderChange({
							target: { name: 'color', value: e.hex }
						})
					}
					color={control.border.color}
					width='15vw'
				/>
			)}
			{control.type !== 'container' && (
				<>
					<TextField
						value={control.text}
						label={'Text'}
						onChange={handleChange}
						name='text'
					/>
					<TextField
						value={control.fontSize}
						label='Font Size'
						type='number'
						onChange={handleChange}
						name='fontSize'
					/>
					<TextField
						value={control.fontColor}
						label='Font Color'
						name='fontSize'
						onFocus={() => addColorPicker(2)}
					/>
					{colorPickers[2] === true && (
						<TwitterPicker
							name='color'
							onChange={e =>
								handleChange({
									target: { name: 'fontColor', value: e.hex }
								})
							}
							color={control.fontColor}
							width='15vw'
						/>
					)}
				</>
			)}
		</>
	)
}
